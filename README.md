# complete-backend

A REST API backend for a movie watchlist app, built as part of a backend course. It covers auth, database modelling with Prisma, and CRUD operations against a PostgreSQL database.

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **ORM:** Prisma 7 with `@prisma/adapter-pg` driver adapter
- **Database:** PostgreSQL
- **Auth:** JWT stored in HTTP-only cookies
- **Password hashing:** bcryptjs

## Features

| Area | Status |
|---|---|
| User registration & login | ✅ Done |
| JWT auth (HTTP-only cookie) | ✅ Done |
| Logout | ✅ Done |
| Movie listing | ✅ Done |
| Movie seed data (6 films) | ✅ Done |
| Watchlist CRUD | 🚧 In progress |

## Data Models

```
User
  id, email (unique), name, password
  → has many WatchlistItem, Movie (as creator)

Movie
  id, title, description, overview?, genre[], runtime?, posterUrl?, releaseDate, createdBy (→ User)
  → has many WatchlistItem

WatchlistItem
  id, userId (→ User), movieId (→ Movie)
  status: PLANNED | WATCHING | COMPLETED | DROPPED
  rating?, notes?
```

## API Endpoints

### Auth — `/auth`

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create a new user account |
| POST | `/auth/login` | Login and receive a JWT cookie |
| POST | `/auth/logout` | Clear the JWT cookie |

### Movies — `/movies`

| Method | Path | Description |
|---|---|---|
| GET | `/movies` | Returns a welcome message (placeholder) |

### Watchlist — `/watchlist` *(in progress)*

| Method | Path | Description |
|---|---|---|
| POST | `/watchlist` | Add a movie to the watchlist |
| GET | `/watchlist` | Get the user's watchlist |
| DELETE | `/watchlist/:movieId` | Remove a movie from the watchlist |

## Project Structure

```
├── prisma/
│   ├── schema.prisma       # DB models: User, Movie, WatchlistItem
│   ├── seed.js             # Seeds 6 sample movies
│   └── migrations/
├── src/
│   ├── server.js           # Express app entry point
│   ├── config/
│   │   └── db.js           # Prisma client + connect/disconnect helpers
│   ├── controllers/
│   │   ├── authController.js
│   │   └── watchlistController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoute.js
│   │   └── watchlistRoutes.js
│   └── utils/
│       └── generateToken.js  # Signs JWT and sets HTTP-only cookie
├── prisma7.config.ts         # Prisma config (schema path, migrations, DB URL)
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=5d
PORT=5001
NODE_ENV=development
```

### 3. Run migrations

```bash
npx prisma migrate dev
```

### 4. Seed the database

Requires a user with the hardcoded UUID in `prisma/seed.js` to exist first (the seed assigns movie ownership to that user).

```bash
npm run seed.movies
```

### 5. Start the server

```bash
# production
npm start

# development (with auto-reload)
npm run dev
```

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `node src/server.js` | Run the server |
| `dev` | `nodemon src/server.js` | Run with auto-reload |
| `seed.movies` | `node prisma/seed.js` | Seed 6 sample movies into the DB |
