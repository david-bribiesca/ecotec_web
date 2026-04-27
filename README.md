# EcoTec Web

A smart plant monitoring web application that displays real-time sensor data, provides AI-powered plant care advice, and allows users to configure plant-specific environmental limits.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database & Auth | Supabase |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| AI | OpenAI (gpt-4o-mini) |

---

## Project Structure

```
ecotec_web/
├── app/
│   ├── globals.css              # Global styles + Tailwind + CSS variables
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   ├── (public)/                # Unauthenticated routes
│   │   ├── layout.tsx           # Navbar + Footer wrapper
│   │   ├── page.tsx             # Landing page
│   │   ├── about/page.tsx       # About page
│   │   └── login/page.tsx       # Auth page
│   └── (protected)/             # Authenticated routes
│       ├── layout.tsx           # Sidebar layout
│       └── dashboard/
│           ├── page.tsx         # Main dashboard
│           ├── chatbot/page.tsx
│           ├── notifications/page.tsx
│           └── settings/page.tsx
├── components/                  # UI components
├── hooks/                       # Custom React hooks
├── lib/
│   └── supabaseClient.ts        # Supabase client singleton
└── middleware.ts                # Session refresh for SSR auth
```

---

## Routes

| Route | Auth | Description |
|---|---|---|
| `/` | Public | Landing page — hero, features, stats, reviews |
| `/about` | Public | Mission, vision, values, and team |
| `/login` | Public | Email/password login and signup |
| `/dashboard` | Protected | Real-time sensor monitoring |
| `/dashboard/chatbot` | Protected | AI chatbot for plant care |
| `/dashboard/notifications` | Protected | Date-filtered alert notifications |
| `/dashboard/settings` | Protected | Plant limits configuration |

---

## Components

### Layout & Navigation

| Component | Description |
|---|---|
| `navbar.tsx` | Top navigation bar for public routes |
| `footer.tsx` | Site footer |
| `SideBar.tsx` | Expandable sidebar with links to dashboard sections and logout |

### Landing Page Sections

| Component | Description |
|---|---|
| `hero.tsx` | Hero section with headline and CTA |
| `features.tsx` | Product feature highlights |
| `Stats.jsx` | Key metrics/statistics display |
| `Reviews.tsx` | User testimonials |
| `MissionVisionValues.tsx` | Company mission and values |
| `TeamSection.tsx` | Team member cards |

### Sensor & Dashboard

| Component | Description |
|---|---|
| `SensorDashboard.tsx` | Four circular indicators for live temperature, humidity, water, and soil readings |
| `SensorChart.tsx` | Recharts line chart with date range selection |
| `SensorSection.tsx` | Wraps chart and sensor picker |
| `CircleProgress.tsx` | Reusable circular progress ring with icon and value |
| `AccommodationSection.tsx` | Sensor type selector panel |

### AI Chatbot

| Component | Description |
|---|---|
| `ChatSection.tsx` | Chat container — header, message list, and input area |
| `ChatInput.tsx` | Textarea with send button |
| `MessageBubble.tsx` | Renders user and assistant messages |
| `SmartActions.tsx` | Quick-action buttons (diagnose, tips, etc.) |

### Forms & Settings

| Component | Description |
|---|---|
| `auth-form.tsx` | Unified login/signup form with Supabase auth |
| `PlantLimitsForm.tsx` | Search a plant name, fetch AI-generated limits, and save to DB |
| `DateSelector.tsx` | Single date picker |
| `DateRangePicker.tsx` | Date range picker for chart filtering |
| `NotificationsDisplay.tsx` | Renders a list of alert notifications |

---

## Custom Hooks

| Hook | Description |
|---|---|
| `useAuth.ts` | Reads current Supabase session; redirects unauthenticated users |
| `useSensorData.ts` | Fetches historical sensor readings for a given sensor ID and date range |
| `useMultiSensorRealtime.ts` | Subscribes to real-time `INSERT` events on `lecturas_sensores` for multiple sensors |
| `useChatGPT.ts` | Manages conversation state and calls OpenAI `gpt-4o-mini` with a Spanish plant-expert system prompt |
| `usePlantLimitsAI.ts` | Sends a plant name to OpenAI and parses JSON response with optimal soil, temperature, and humidity ranges |
| `useSavePlantLimits.ts` | Saves parsed plant limits to the Supabase `limites` table |
| `useNotificationsByDate.ts` | Queries `notificaciones` filtered by a selected date |

---

## Database Schema (Supabase)

| Table | Key Columns | Purpose |
|---|---|---|
| `sensores` | `id`, `tipo_sensor` | Sensor registry (temperature, humidity, water, soil) |
| `lecturas_sensores` | `sensor_id`, `valor`, `recorded_at` | Time-series sensor readings |
| `notificaciones` | `id`, `mensaje`, `actuador_id`, `created_at` | System alerts linked to actuators |
| `actuadores` | `id`, `nombre` | Physical actuator/device definitions |
| `limites` | `soil_min`, `temp_max`, `humidity_min` | Per-user plant threshold configuration |

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

> All three variables use the `NEXT_PUBLIC_` prefix and are available client-side.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |



## Real-Time Monitoring

The dashboard subscribes to live sensor updates using Supabase Realtime. `useMultiSensorRealtime` opens a channel on the `lecturas_sensores` table and updates state on every new `INSERT`, allowing the circular indicators in `SensorDashboard` to reflect the latest readings without page refresh.

---

## AI Features

**Chatbot** — `useChatGPT` sends the conversation history to `gpt-4o-mini` with a system prompt that instructs the model to act as a Spanish-speaking SmartPot plant care expert.

**Plant Limits** — `usePlantLimitsAI` asks `gpt-4o-mini` for the optimal growing parameters (soil moisture %, max temperature, min humidity) for a given plant name and returns structured JSON that is then saved to the `limites` table via `useSavePlantLimits`.
