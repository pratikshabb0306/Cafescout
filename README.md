# CafeScout

Find cafes nearby with filters for Wi-Fi, outlets, noise level, and seating. Save favorites and leave reviews.

**Stack:** Next.js 14 (App Router) · Google Maps JavaScript API · PostgreSQL + Prisma

## What's scaffolded

- **Database** — `prisma/schema.prisma`: `Cafe`, `Review`, `Favorite`, `User` models, plus a seed script with 3 sample cafes.
- **API routes** (`app/api/`):
  - `GET/POST /api/cafes` — list with filters (`wifi`, `outlets`, `noise`, `minSeats`, `search`), create a cafe
  - `GET/PATCH/DELETE /api/cafes/[id]` — single cafe detail, with reviews included on GET
  - `GET/POST /api/cafes/[id]/reviews` — reviews for a cafe
  - `GET/POST /api/favorites` and `DELETE /api/favorites/[cafeId]` — favorites per user
- **Frontend** (`app/page.tsx` + `components/`):
  - `FilterBar` — search + Wi-Fi/outlets/noise/seating toggles
  - `MapView` — Google Map with markers, click-to-select syncs with the list
  - `CafeList` / `CafeCard` — results list with favorite hearts and rating badges
  - `ReviewForm` — star rating + comment, ready to drop into a cafe detail page

## Not yet built (next steps)

1. **Auth** — everything currently runs as a stubbed `guest` user (see `GUEST_USER_ID` in `app/page.tsx`). Swap in NextAuth (or Clerk) and thread the real `userId` through the review/favorite calls.
2. **Cafe detail page** — `app/cafes/[id]/page.tsx` showing full info, photos, and the review list + `ReviewForm`.
3. **"Open now" filter** — `openTime`/`closeTime` are in the schema but not yet filtered on; needs a small time-comparison helper.
4. **Geolocation** — center the map on the user's actual location (`navigator.geolocation`) instead of the hardcoded Sangli default.
5. **Add-a-cafe form** — a UI for the existing `POST /api/cafes` endpoint.

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env
# - DATABASE_URL: your local/hosted Postgres connection string
# - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: from Google Cloud Console
#   (enable "Maps JavaScript API")

# 3. Push the schema to your database
npx prisma migrate dev --name init

# 4. Seed sample data
npm run seed

# 5. Run the dev server
npm run dev
```

Visit `http://localhost:3000` — you should see the map + list view with the 3 seeded cafes.

## Getting a Google Maps API key

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → create/select a project.
2. Enable **Maps JavaScript API** (and **Places API** if you plan to add address autocomplete later).
3. Create an API key under **Credentials**, restrict it to your domain(s) for production.
4. Paste it into `.env` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
