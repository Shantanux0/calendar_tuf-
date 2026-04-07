# Epoch Calendar (Frontend Challenge)

## Overview
A highly interactive, responsive, and cinematic React Calendar interface adhering to the provided design requirements. This component serves as a physical wall calendar translation—retaining a dedicated visual hero anchor while supporting full date-range selection and persistent integrated notes.

## Technical Execution & Architecture
This project focuses intensely on **frontend execution, state management, and aesthetics** without utilizing external persistence backends.

### 1. Component Architecture
- **CalendarShell:** The orchestration layer. Manages the responsive layout (flowing from side-by-side on Desktop to stacked on Mobile). Implements a 3D perspective page-turning wrapper using `framer-motion` to simulate a physical calendar mechanism.
- **HeroPanel:** The primary visual anchor at the top of the interface. Integrates CSS particles (AmbientParticles) driven by dynamic conditional rendering representing seasons, alongside a 'live tick' digital clock component. 
- **CalendarGrid & DayCell:** Implements the pure calendar mathematics without bulky date libraries. Supports full range selection logic (Start, End, In-between, Hovers).
- **IntegratedNotes:** A clean, minimal notes area aligned structurally exactly per the reference photo. Faded background layout markers allow intuitive typing.

### 2. State Management & Hooks
All application logic is meticulously decoupled into custom React hooks to avoid monolithic components:
- `useCalendar` – Generates the mathematical days data structure and calculates grid offsets.
- `useDateRange` – Manages the complex state-machine of multi-day range selection, retaining hover-states dynamically.
- `useNotes` – Handles text modification and automatically synchronizes to the browser's `localStorage` for complete client-side data persistence over refresh.

### 3. Styling & Responsive Design
- Built exclusively with **TailwindCSS** for atomic utility styling and flawless responsive breakpoints.
- The layout is intrinsically flexible: On an LG breakpoint, it operates horizontally. On Mobile, it utilizes `flex-col` with `order` manipulation to ensure the *Calendar Grid* gracefully drops above the *Notes Section*, keeping UX flawless for thumb navigation on tight viewports.

### 4. "Creative Liberties" Implemented
- **3D Hinge Physics Engine:** Navigating through time executes an authentic top-hinged ring-bound paper flip animation (`framer-motion`), accounting for forward and backward directions.
- **VFX Particle Mechanics:** The Hero Panel intelligently analyzes the active month (`monthIndex`) and renders customized CSS particle physics accordingly (e.g., drifting snow in December, falling autumn leaves in October).
- **Physical Wall Texture:** The underlying canvas simulates a tactile painted wall via SVG `fractalNoise` overlays and radial ambient light shading, bringing a hyper-realistic drop shadow off the main calendar element.

## How to Run Locally

This project runs on Vite.

1. Install Dependencies:
```bash
npm install
```

2. Start the Development Server:
```bash
npm run dev
```

The server will automatically launch on `localhost:5050` or the nearest available port. Open your browser to interact with the Epoch Calendar.
