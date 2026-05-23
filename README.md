# NordicFlow

NordicFlow is a production-style Next.js SaaS demo for engineering intelligence across frontend teams.

## Features
- Engineering health dashboard (lead time, PR size, pass rate)
- Repository intelligence with DX score and throughput signals
- PR risk analysis model (low/medium/high)
- CI build health snapshots
- Demo workspace for instant exploration
- REST API scaffolding for GitHub auth and repository sync

## Tech Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- TanStack Query + Zustand (ready to wire in UI hooks)
- Recharts (ready for chart expansion)
- Vitest testing

## Setup
```bash
npm install
npm run dev
```

## Commands
```bash
npm run dev
npm run build
npm run test
npm run typecheck
```

## Demo
Open `http://localhost:3000/demo` for the seeded Northwind Labs workspace.
