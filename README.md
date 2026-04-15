# Macta Store Pick App

A small Next.js app for store employees to see pick requests, pick items, pack them, and mark them as sent to the warehouse.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo into Vercel.
3. Framework preset: **Next.js**.
4. No special environment variables are required.
5. Deploy.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## App structure

- `app/` - Next.js App Router files
- `components/StorePickApp.tsx` - main UI
- `lib/data.ts` - mock task data

## Notes

This prototype uses mock data and client-side state only. It is intended to be a clean Vercel-ready starting point for a store-facing workflow app.
