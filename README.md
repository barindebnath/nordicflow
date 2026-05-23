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

---

## Project Completion Status

Overall Progress: **100% Completed (MVP)**

NordicFlow is currently **fully implemented** as an interactive, production-grade frontend demo. All core layouts, data layers, page router views, DORA metrics calculation engines, real-time activity timelines, simulated OAuth flows, and setting controls are established and operational.

### Page & Feature Progress

| Feature / Page | Status | Description |
| :--- | :---: | :--- |
| **Landing Page (`/`)** | 🟢 Done | Premium landing page featuring Outfit/Inter typography, DX feature showcase, and mock interactive preview dashboard. |
| **App Layout Shell (`AppShell`)** | 🟢 Done | Sidebar navigation shell integrating page routing, active page state indicators, and authenticated user details. |
| **Engineering Health Dashboard (`/dashboard`)** | 🟢 Done | Comprehensive overview with responsive Recharts metrics, active workspace repository filtering, and dynamic AI-sprint summaries. |
| **Repository Directory (`/repos`)** | 🟢 Done | Listing of codebases with inline repository registration, search filtering, workspace delete actions, and sync controllers. |
| **Demo Workspace (`/demo`)** | 🟢 Done | Recruiter-friendly sandbox pre-seeding the store with a comprehensive dummy codebase dataset (Northwind Labs). |
| **GitHub OAuth / Connection (`/auth`)** | 🟢 Done | Simulated connection authorization flow, showing organization selection, avatar mapping, and progress bar synchronization. |
| **Settings Page (`/settings`)** | 🟢 Done | Workspace targets customization (Lead Time, PR Size), notification toggling for build failures, and demo sandbox factory resets. |
| **PR Risk Analysis Screen (`/repos/[id]`)** | 🟢 Done | Repository deep-dive detailing file complexity hotspots, PR review delays, and an interactive simulation sandbox (new PR/pipeline runs). |
| **Frontend Quality & DX Score Engine** | 🟢 Done | Computes repository-wide Developer Experience (DX) scores based on build stability, PR code sizes, and deployment cycles. |
| **AI Sprint Summary Card** | 🟢 Done | Dynamic sprint assistant summarizing repository stability and highlighting payment/checkout flow failures. |
| **Activity Timeline** | 🟢 Done | Live event timeline displaying merged pull requests, review allocations, and build outcomes in real time. |
| **Team Analytics / Reviewer Load** | 🟢 Done | Interactive tables detailing reviewer assignments, active PR author workloads, and collaborator bottlenecks. |

