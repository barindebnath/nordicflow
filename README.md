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

Overall Progress: **~20% Completed**

NordicFlow is currently in the **initial scaffolding and routing phase**. The application structure, styling tokens, navigation shell, mock data architecture, and tests are established, but the advanced intelligence features and deep-dive analytics are still to be implemented.

### Page & Feature Progress

| Feature / Page | Status | Description |
| :--- | :---: | :--- |
| **Landing Page (`/`)** | 🟢 Done | Basic landing page with call-to-actions, styling, and navigation links. |
| **App Layout Shell (`AppShell`)** | 🟡 Partial | Sidebar navigation layout with routing links, but lacks mobile responsive behavior. |
| **Engineering Health Dashboard (`/dashboard`)** | 🟡 Partial | Initial layout with four static KPI cards (Lead Time, PR Size, etc.). Lacks charts, filters, alerts, and team breakdown components. |
| **Repository Directory (`/repos`)** | 🟡 Partial | Displays a list of repositories and basic stats from mock data. Lacks repo detail screens, sync controls, and build history. |
| **Demo Workspace (`/demo`)** | 🔴 Incomplete | Currently a placeholder landing. Needs fully interactive pre-seeded sandbox dashboard. |
| **GitHub OAuth / Connection (`/auth`)** | 🔴 Incomplete | Placeholder route. Requires full GitHub API sync integration and auth state flow. |
| **Settings Page (`/settings`)** | 🔴 Incomplete | Placeholder route. Requires integration toggles, team preferences, and notification setups. |
| **PR Risk Analysis Screen** | 🔴 Incomplete | Missing detailed view for file complexity, risk classification (Low/Med/High), and lines changed metrics. |
| **Frontend Quality & DX Score Engine** | 🔴 Incomplete | Lacks analytical UI/logic for component complexity, test coverage, and unused component detection. |
| **AI Sprint Summary Card** | 🔴 Incomplete | Missing UI cards and backend/mock logic for automated team bottleneck/sprint analytics. |
| **Activity Timeline** | 🔴 Incomplete | Missing real-time developer activity stream component. |
| **Team Analytics / Reviewer Load** | 🔴 Incomplete | Lacks charts for reviewer distribution and contributor metrics. |

