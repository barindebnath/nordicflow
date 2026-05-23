# NordicFlow — Complete Product Design System

# Design Philosophy

The design language should feel:

- Scandinavian
- Calm
- Structured
- Trustworthy
- Professional
- Minimal
- Intelligent

Inspirations:
- Linear
- Vercel
- GitHub
- Notion
- Stripe Dashboard

Avoid:
- Glassmorphism overload
- Neon cyberpunk UI
- Loud gradients
- Dribbble-style chaos

---

# Design Principles

## 1. Clarity First
Every screen should answer:
- What is happening?
- What matters most?
- What requires action?

---

## 2. Breathing Space
Use generous whitespace.

Never overcrowd dashboards.

---

## 3. Functional Beauty
Design should support understanding.

Not decoration.

---

## 4. Information Hierarchy
Primary metrics:
- Large
- High contrast

Secondary metrics:
- Smaller
- Muted

---

# Color System

## Base Background
#0B1020

Alternative:
#0F172A

---

## Surface Colors
#111827
#1F2937

---

## Borders
#243041

---

## Primary Text
#F9FAFB

---

## Secondary Text
#94A3B8

---

## Accent Colors

### Success
#22C55E

### Warning
#F59E0B

### Error
#EF4444

### Info
#3B82F6

---

# Typography

## Font

Use:
- Inter

Fallback:
- system-ui

---

# Font Scale

## Hero
text-6xl

## Section Titles
text-3xl

## Dashboard Numbers
text-4xl

## Card Titles
text-sm

## Body
text-base

---

# Spacing System

Use:
- 4
- 8
- 12
- 16
- 24
- 32

Avoid random spacing.

---

# Border Radius

Use:
rounded-2xl

Cards:
rounded-xl

Buttons:
rounded-lg

---

# Shadows

Use soft shadows only.

Never aggressive shadows.

---

# Layout System

# Max Width

Use:
max-w-7xl

---

# Dashboard Grid

Desktop:
12-column grid

Tablet:
6-column grid

Mobile:
1-column layout

---

# Main Layout

Sidebar:
240px

Content:
fluid width

Top navigation:
64px height

---

# Navigation Design

# Sidebar

Contains:
- Dashboard
- Repositories
- Analytics
- Team
- Settings

---

# Sidebar Behavior

Desktop:
fixed

Mobile:
drawer

---

# Active State

Use:
- subtle background
- left border accent

Avoid:
- glowing active states

---

# Landing Page Design

# Hero Section

Left:
- headline
- subheadline
- CTA buttons

Right:
- dashboard mockup

---

# Hero Headline

Recommended:

## “Engineering intelligence for modern frontend teams.”

Alternative:
## “See how your engineering team actually performs.”

---

# Hero CTA

Primary:
- Explore Demo

Secondary:
- View GitHub

---

# Feature Grid

3-column responsive cards.

Each card:
- Icon
- Title
- 2-line description

---

# Dashboard Design

# KPI Cards

Display:
- Metric
- Trend
- Delta
- Mini chart

Card height:
consistent

---

# Chart Guidelines

Use:
- clean line charts
- stacked bars
- activity heatmaps

Avoid:
- pie charts
- excessive gradients

---

# Data Density

Keep dashboards readable.

Never overwhelm users.

---

# Repository Details Page

Sections:
- PR health
- Build stability
- Deployment history
- Risk insights
- Test quality

---

# PR Risk Visualization

Risk badges:
- Low
- Medium
- High

Use:
- Green
- Amber
- Red

---

# Activity Feed

Design:
- compact timeline
- timestamp
- status icon
- concise action text

---

# Demo Mode Design

Must feel polished.

Add:
- seeded fake company
- realistic engineering data
- fake team members

Suggested company:
“Northwind Labs”

---

# Motion Design

Use Framer Motion carefully.

Animations:
- subtle fade
- slight slide
- hover elevation

Duration:
150ms–250ms

Avoid:
- bouncing
- spinning
- dramatic movement

---

# Loading States

Use:
- skeleton loaders

Avoid:
- generic spinners everywhere

---

# Empty States

Every empty state should:
- explain situation
- suggest next action

---

# Mobile Design

Important.

Most recruiters will check quickly on mobile.

Must support:
- responsive dashboards
- collapsible charts
- touch-friendly spacing

---

# Accessibility Design

Minimum:
- visible focus states
- keyboard navigation
- proper contrast
- semantic structure

---

# Icon System

Use:
- lucide-react

Recommended icons:
- Activity
- GitPullRequest
- BarChart
- AlertTriangle
- CheckCircle

---

# Table Design

Tables should:
- support sorting
- support filtering
- have sticky headers

---

# Search UX

Global search should:
- instantly filter repositories
- support fuzzy matching

---

# Notification Design

Notification types:
- build failures
- review delays
- deployment risks

Use:
- lightweight toast system

---

# Component Design Rules

# Buttons

Primary:
solid

Secondary:
outline

Danger:
red accent

---

# Inputs

Use:
- large click area
- subtle borders
- strong focus ring

---

# Cards

Cards should:
- have clear hierarchy
- avoid visual noise

---

# Chart Design Rules

Never use:
- more than 4 colors per chart

Prefer:
- monochrome palettes

---

# Branding

# Logo Concept

Simple symbol:
- wave
- flow line
- pulse
- graph

Wordmark:
NordicFlow

---

# Favicon

Minimal geometric symbol.

---

# Screenshot Strategy

Your README screenshots matter massively.

Capture:
- dashboard
- repo analytics
- mobile view
- risk analysis
- demo workspace

---

# Portfolio Presentation

When presenting:
- emphasize product thinking
- explain engineering tradeoffs
- discuss scalability
- discuss UX decisions

---

# Landing Page Sections

1. Hero
2. Trusted Metrics
3. Feature Grid
4. Product Screenshots
5. Engineering Philosophy
6. Architecture Overview
7. CTA Footer

---

# Footer

Include:
- GitHub
- LinkedIn
- Email
- Tech stack

---

# Dark Mode

Primary mode:
dark

Optional:
light mode later

---

# Theme Behavior

Use:
- CSS variables
- Tailwind theme extension

---

# UI Libraries

Recommended:
- shadcn/ui

Avoid:
- heavy component libraries

---

# Design System Folder Structure

/components/ui
/components/dashboard
/components/charts
/components/layout
/components/repository
/components/metrics

---

# Reusable Components

Create:
- MetricCard
- TrendBadge
- RiskIndicator
- EmptyState
- SectionHeader
- ChartContainer

---

# Engineering Dashboard Mood

Users should feel:
- informed
- calm
- in control

Never:
- stressed
- overloaded

---

# Visual Identity Keywords

- Nordic
- Product engineering
- Operational clarity
- Frontend intelligence
- Quiet confidence

---

# Final Visual Goal

The application should look like:

> “A real B2B SaaS platform built by an experienced product engineer.”

That is the target feeling.
