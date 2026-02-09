# AGENTS.md

## Project Focus
- Stack: Next.js App Router + TypeScript + Tailwind + shadcn/ui + MongoDB.
- Theme direction: rounded cards, stone background, emerald accents.

## Admin Dashboard
- Admin routes are under `/admin/*`.
- `/admin/login` is public.
- Protected admin views use sidebar navigation:
  - `/admin/courses`
  - `/admin/placements`
- Prefer session-cookie auth from `/api/auth/login` instead of hardcoded bearer tokens.

## Course Data
- Course categories are centralized in `src/lib/course-categories.ts`.
- Keep enum/category values synced with:
  - `src/lib/models/Course.ts`
  - admin/public course UIs

## Placement Data
- Placement model: `src/lib/models/Placement.ts`.
- API endpoints:
  - `GET/POST /api/placements`
  - `DELETE /api/placements/[id]`

## UI Rules
- Reuse current design language (stone + emerald, high radius, strong spacing).
- Keep admin forms compact and list cards readable on mobile.
- Use `next/image` for image rendering where feasible.
