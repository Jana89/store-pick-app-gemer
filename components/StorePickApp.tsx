"use client";

import { useMemo, useState } from "react";
import type { PickTask } from "@/lib/data";
import { initialTasks } from "@/lib/data";

const statusOrder: PickTask["status"][] = ["New", "Picking", "Packed", "Sent"];

function Badge({ children }: { children: string }) {
  const colors: Record<string, string> = {
    High: "#fee2e2",
    Medium: "#fef3c7",
    Low: "#dcfce7",
    New: "#dbeafe",
    Picking: "#ede9fe",
    Packed: "#fef3c7",
    Sent: "#dcfce7"
  };

  return (
    <span
      style={{ background: colors[children] || "#e2e8f0" }}
      className="badge"
    >
      {children}
    </span>
  );
}

export default function StorePickApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(initialTasks[0]?.id ?? "");
  const [filter, setFilter] = useState<"All" | PickTask["status"]>("All");

  const selectedTask = tasks.find((task) => task.id === selectedId) ?? tasks[0];

  const visibleTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  function updateStatus(taskId: string, nextStatus: PickTask["status"]) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task
      )
    );
  }

  function advanceTask(task: PickTask) {
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)];
    updateStatus(task.id, nextStatus);
  }

  const kpis = {
    total: tasks.length,
    urgent: tasks.filter((task) => task.priority === "High" && task.status !== "Sent").length,
    waiting: tasks.filter((task) => task.status !== "Sent").length,
    sent: tasks.filter((task) => task.status === "Sent").length
  };

  return (
    <main className="page-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Store-side operations</p>
          <h1>Macta Store Pick App</h1>
          <p className="subcopy">
            For retail employees to see what to pick, pack, and send to the warehouse.
          </p>
        </div>
        <div className="topbar-right">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "All" | PickTask["status"])}
            className="select"
          >
            <option value="All">All tasks</option>
            <option value="New">New</option>
            <option value="Picking">Picking</option>
            <option value="Packed">Packed</option>
            <option value="Sent">Sent</option>
          </select>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="card">
          <span className="kpi-label">Open tasks</span>
          <strong className="kpi-value">{kpis.waiting}</strong>
        </article>
        <article className="card">
          <span className="kpi-label">Urgent</span>
          <strong className="kpi-value">{kpis.urgent}</strong>
        </article>
        <article className="card">
          <span className="kpi-label">Sent today</span>
          <strong className="kpi-value">{kpis.sent}</strong>
        </article>
        <article className="card">
          <span className="kpi-label">All tasks</span>
          <strong className="kpi-value">{kpis.total}</strong>
        </article>
      </section>

      <section className="content-grid">
        <div className="card list-card">
          <div className="section-header">
            <h2>Pick requests</h2>
            <p>{visibleTasks.length} shown</p>
          </div>

          <div className="task-list">
            {visibleTasks.map((task) => (
              <button
                key={task.id}
                className={`task-row ${selectedTask?.id === task.id ? "task-row-active" : ""}`}
                onClick={() => setSelectedId(task.id)}
              >
                <div className="task-row-main">
                  <div>
                    <div className="task-title">{task.id}</div>
                    <div className="task-meta">{task.orderId} · {task.customer}</div>
                  </div>
                  <Badge>{task.priority}</Badge>
                </div>
                <div className="task-row-bottom">
                  <Badge>{task.status}</Badge>
                  <span>{task.requestedAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card detail-card">
          {selectedTask ? (
            <>
              <div className="section-header">
                <div>
                  <h2>{selectedTask.id}</h2>
                  <p>{selectedTask.orderId} · Send to {selectedTask.shipTo}</p>
                </div>
                <Badge>{selectedTask.status}</Badge>
              </div>

              <div className="detail-grid">
                <div className="detail-block">
                  <span className="detail-label">Customer</span>
                  <strong>{selectedTask.customer}</strong>
                </div>
                <div className="detail-block">
                  <span className="detail-label">Requested at</span>
                  <strong>{selectedTask.requestedAt}</strong>
                </div>
                <div className="detail-block">
                  <span className="detail-label">Priority</span>
                  <strong>{selectedTask.priority}</strong>
                </div>
                <div className="detail-block">
                  <span className="detail-label">Destination</span>
                  <strong>{selectedTask.shipTo}</strong>
                </div>
              </div>

              <div className="detail-section">
                <h3>Items to pick</h3>
                <div className="items-table">
                  <div className="items-head items-row">
                    <span>SKU</span>
                    <span>Item</span>
                    <span>Qty</span>
                    <span>Location</span>
                  </div>
                  {selectedTask.items.map((item) => (
                    <div key={item.sku} className="items-row">
                      <span>{item.sku}</span>
                      <span>{item.name}</span>
                      <span>{item.qty}</span>
                      <span>{item.location}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>Notes</h3>
                <p className="notes-box">{selectedTask.notes}</p>
              </div>

              <div className="button-row">
                <button className="primary-btn" onClick={() => advanceTask(selectedTask)}>
                  Mark next step
                </button>
                <button className="secondary-btn" onClick={() => updateStatus(selectedTask.id, "Picking")}>
                  Set Picking
                </button>
                <button className="secondary-btn" onClick={() => updateStatus(selectedTask.id, "Packed")}>
                  Set Packed
                </button>
                <button className="secondary-btn" onClick={() => updateStatus(selectedTask.id, "Sent")}>
                  Set Sent
                </button>
              </div>
            </>
          ) : (
            <p>No task selected.</p>
          )}
        </div>
      </section>
    </main>
  );
}
