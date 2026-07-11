# Eazychef

## Project overview

Eazychef is a chat-style meal-planning web app. It walks a user through a conversational
onboarding (diet, allergies, favorite dishes, goals, who cooks, time available), collects
what's currently in their pantry, recommends recipes drawn from a small static dataset,
flags which ingredients are missing for a chosen recipe, walks through numbered cooking
steps, collects a post-cook rating, shows a "trends" callback screen, and teases a roadmap
of future features.

This app was built from a **Claude Design prototype** the user imported (see
[`design/Eazychef.dc.html`](design/Eazychef.dc.html)). That file uses a custom prototype DSL
(`x-dc`, `sc-if`/`sc-for`, `{{}}` bindings, a `DCLogic` class) that only renders inside the
Claude Design tool — it is not a runnable web app. Everything under `src/` is a hand-ported,
real, working implementation of that design: same screens, same visual styling, same
interaction logic, running as an actual React app.

The `design/` folder (`Eazychef.dc.html`, `support.js`, `browser-window.jsx`, `ios-frame.jsx`,
`.thumbnail`) is kept only as reference/source-of-truth for the design — `support.js` and the
two `.jsx` files are just the design tool's preview chrome/runtime and are not used by the app.

## Tech stack

- **Vite + React + TypeScript** — chosen for a fast dev server and a component structure that
  maps cleanly onto the design's screen/state model.
- **No CSS framework.** Styling is inline `style` objects in JSX, translated 1:1 from the
  literal color/spacing values already present in the design source — this was chosen over
  Tailwind to guarantee pixel fidelity with the original design.
- **No backend.** All data (recipes, roadmap tiles, etc.) is static, defined in `src/data.ts`.
  There is no API, no auth, no real AI recommendation engine — recommendation cards are just a
  fixed 6-recipe dataset, matching the original prototype.
- **State**: a single custom hook (`useEazychefState` in `src/state.ts`) holding all app state
  and action methods — a direct TypeScript port of the prototype's `Component` class
  (state fields + methods) from `Eazychef.dc.html`.
- **Persistence**: app state is persisted to `localStorage` (key `eazychef-app-state-v1`,
  debounced write, hydrated on load) so a page refresh resumes wherever the user left off.
  This was a deliberate choice beyond the original prototype (which was stateless/in-memory).

## File structure

```
Eazychef/
  design/                      # Claude Design source (reference only, not used by the app)
    Eazychef.dc.html           # original prototype (custom DSL, not runnable standalone)
    support.js                 # design tool's preview runtime
    browser-window.jsx         # design tool's browser-chrome mockup frame
    ios-frame.jsx              # design tool's iOS mockup frame
    .thumbnail
  index.html                   # Vite entry; loads Google Fonts (Fredoka + Inter)
  package.json / vite.config.ts / tsconfig*.json
  .claude/launch.json          # preview_start config — runs `npm run dev` on port 5173
  src/
    main.tsx                   # ReactDOM root
    App.tsx                    # top-level layout: header + tab-nav + screen router
    state.ts                   # useEazychefState hook — all state + action methods, localStorage sync
    types.ts                   # AppState / Screen types
    data.ts                    # DIET/ALLERGY/GOAL/COOK_SKILL/WEEKDAY_T/WEEKEND_T/CARDS/ROADMAP_TILES constants
    theme.ts                   # color/font constants shared across components
    index.css                  # global reset (body bg, box-sizing, hidden scrollbars)
    components/
      Logo.tsx                 # repeated chef-hat SVG mark
      Chip.tsx                 # OptionChip / RemovableChip / QuickAddChip pill buttons
      ChatBubble.tsx            # BotBubble / UserBubble used in onboarding
    screens/
      Onboarding.tsx           # 6-step chat-bubble flow (diet, allergies, dishes, goal, cook+skill, time)
      Pantry.tsx                # textarea + quick-add chips + removable pantry chip list
      Cards.tsx                 # recipe recommendation cards + regenerate
      Missing.tsx                # missing-ingredients screen for the selected recipe
      Detail.tsx                 # full recipe steps + "I cooked this" CTA
      Rating.tsx                 # 5-emoji rating + optional note
      Trends.tsx                  # goal-callback text + 7-day bar chart
      Roadmap.tsx                 # 2x2 "coming soon" tile grid + restart
```

## What has been built

All 8 screens are implemented and wired into a single state machine
(`onboarding → pantry → cards → missing → detail → rating → trends → roadmap`, plus `restart`
back to onboarding). A top tab-nav (kept from the design, by user's choice) lets you jump
directly to any screen for testing/demo purposes.

Behavior ported faithfully from the original prototype (see `src/state.ts` for all of this):
- Diet and goal selection auto-advance the onboarding step after a 250ms delay.
- Allergies: multi-select chips, "None of these" is mutually exclusive with other selections
  and with custom-typed allergies; custom allergies are added via a text input + "+" button.
- Favorite dishes: free-text input, capped at 4 entries, removable chips.
- Cook-who options include a configurable default cook name (`DEFAULT_COOK_NAME = 'Radha'` in
  `src/data.ts`).
- Pantry: comma-separated text parsing, Enter-to-add, 5 quick-add chips, removable chips.
- Recipe cards: static 6-recipe dataset; "Regenerate" reshuffles 3 of 6 cards, biased away
  from repeating the exact current set; the intro line cycles through 4 fixed strings keyed
  off the regenerate count.
- Missing-ingredients screen branches on whether the selected recipe's `missing` list is empty.
- Recipe detail shows numbered steps and a "written for {cook} · {skill}" badge (falls back to
  "Comfortable cook" if skill isn't set).
- Rating: 5 emoji options, optional note, submitting goes to the Trends screen.
- Trends: callback text references the user's stated goal from onboarding.
- Full app state persists to `localStorage` and rehydrates on reload.

**Verified**: `npm run build` passes with zero TypeScript errors. Manually clicked through the
entire flow (all onboarding steps, pantry add/remove, card regenerate, card selection, both
missing/no-missing branches, rating, trends, roadmap, restart, tab-nav jumping) via the preview
tool at a 480px-wide mobile viewport, matching the design. Confirmed localStorage persistence
survives a full page reload mid-flow. No console errors/warnings, no failed network requests.

**Not built / out of scope** (matches the original prototype's scope): no backend/API, no real
AI recommendation engine, no real WhatsApp share action (icon renders, non-functional), no auth.

## Running the app

```
npm install   # first time only
npm run dev   # starts Vite dev server, default http://localhost:5173
npm run build # production build + TypeScript check
```
