export type PickTask = {
  id: string;
  orderId: string;
  customer: string;
  priority: "High" | "Medium" | "Low";
  status: "New" | "Picking" | "Packed" | "Sent";
  requestedAt: string;
  shipTo: string;
  notes: string;
  items: Array<{
    sku: string;
    name: string;
    qty: number;
    location: string;
  }>;
};

export const initialTasks: PickTask[] = [
  {
    id: "TASK-1001",
    orderId: "#100481",
    customer: "Laura Magi",
    priority: "High",
    status: "New",
    requestedAt: "09:05",
    shipTo: "Tallinn warehouse",
    notes: "Customer order blocked until store sends stock.",
    items: [
      { sku: "MA-SKIN-104", name: "Hydrating Serum", qty: 1, location: "Shelf B-12" },
      { sku: "MA-MAKE-220", name: "Volume Mascara", qty: 1, location: "Shelf C-03" }
    ]
  },
  {
    id: "TASK-1002",
    orderId: "#100512",
    customer: "Kertu Saar",
    priority: "Medium",
    status: "Picking",
    requestedAt: "10:22",
    shipTo: "Tallinn warehouse",
    notes: "Need handoff before 14:00 courier pickup.",
    items: [
      { sku: "MA-HAIR-091", name: "Repair Mask", qty: 2, location: "Shelf A-05" }
    ]
  },
  {
    id: "TASK-1003",
    orderId: "#100530",
    customer: "Emma Virtanen",
    priority: "Low",
    status: "Packed",
    requestedAt: "11:10",
    shipTo: "Main warehouse",
    notes: "Waiting for courier bag scan.",
    items: [
      { sku: "MA-BODY-010", name: "Body Lotion", qty: 1, location: "Shelf D-02" }
    ]
  }
];
