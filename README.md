# 🎓 SkillBridge Server

**SkillBridge** is a full-stack tutoring platform that connects students with skilled tutors. This repository contains the **backend API server** — built with **Express 5**, **TypeScript**, **Prisma 7**, and **PostgreSQL** — powering authentication, tutor discovery, session booking, and reviews.

---

## ✨ Features

- **Authentication** — Email/password and **Google OAuth** sign-in via [Better Auth](https://www.better-auth.com/), with session management and role-based access (`STUDENT` / `ADMIN`).
- **Tutor Profiles** — Tutors can create and manage detailed profiles including bio, subjects, hourly rate, qualifications, years of experience, and availability.
- **Category System** — Organize tutors into searchable categories.
- **Booking Management** — Students can book tutoring sessions with time slots and fee calculation. Bookings follow a status lifecycle: `PENDING → CONFIRMED → COMPLETED` (or `CANCELLED`).
- **Reviews & Ratings** — Students can leave ratings and comments for tutors, with aggregated scores on tutor profiles.
- **Admin Panel** — Admin endpoints for user management.
- **Global Error Handling** — Centralized error middleware with detailed Prisma error mapping.

---

## 🛠️ Tech Stack

| Layer            | Technology                                                    |
| ---------------- | ------------------------------------------------------------- |
| **Runtime**      | Node.js                                                       |
| **Framework**    | Express 5                                                     |
| **Language**     | TypeScript (ES2023 target, ESNext modules)                    |
| **ORM**          | Prisma 7 (with `@prisma/adapter-pg` driver adapter)           |
| **Database**     | PostgreSQL                                                    |
| **Auth**         | Better Auth (email/password + Google OAuth)                   |
| **Package Mgr**  | pnpm                                                          |
| **Deployment**   | Render (configured via `render.yaml`)                         |

---

## 📁 Project Structure

```
SkillBridge-server/
├── prisma/
│   ├── schema/              # Multi-file Prisma schema
│   │   ├── schema.prisma    # Generator & datasource config
│   │   ├── auth.prisma      # User, Session, Account, Verification
│   │   ├── TutorProfile.prisma
│   │   ├── Booking.prisma
│   │   ├── Review.prisma
│   │   └── category.prisma
│   └── migrations/          # Database migration history
├── src/
│   ├── server.ts            # Entry point — connects DB & starts server
│   ├── app.ts               # Express app setup, middleware & routes
│   ├── lib/
│   │   ├── auth.ts          # Better Auth configuration
│   │   └── prisma.ts        # Prisma client initialization
│   ├── middleware/
│   │   ├── Auth/             # Authentication middleware
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   ├── modules/
│   │   ├── booking/         # Booking routes, controller, service
│   │   ├── category/        # Category routes, controller, service
│   │   ├── reviews/         # Review routes, controller, service
│   │   ├── student/         # Student routes, controller, service
│   │   ├── tutor/           # Tutor routes, controller, service
│   │   └── user/            # User/admin routes, controller, service
│   ├── scripts/
│   │   └── seedAdmin.ts     # Seed an admin user
│   └── types/               # Shared TypeScript type definitions
├── prisma.config.ts         # Prisma CLI configuration
├── tsconfig.json
├── render.yaml              # Render deployment blueprint
└── package.json
```


## 🔌 API Routes

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| `ALL`  | `/api/auth/*`      | Better Auth authentication     |
| `*`    | `/api/admin`       | Admin user management          |
| `*`    | `/tutor`           | Tutor profile CRUD             |
| `*`    | `/category`        | Category management            |
| `*`    | `/booking`         | Session booking operations     |
| `*`    | `/student`         | Student-specific endpoints     |
| `*`    | `/review`          | Review & rating endpoints      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 10
- **PostgreSQL** database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/SkillBridge-server.git
cd SkillBridge-server
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillbridge"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:5000"
APP_URL="http://localhost:3000"
CLIENT_ID="your-google-oauth-client-id"
CLIENT_SECRET="your-google-oauth-client-secret"
```

### 4. Set up the database

```bash
# Generate Prisma client
pnpm run build

# Run database migrations
npx prisma migrate dev

# (Optional) Seed an admin user
pnpm run seedAdmin
```

### 5. Start the development server

```bash
pnpm run dev
```

The server will start on **http://localhost:5000** with hot-reload enabled via `tsx watch`.

---

## 📜 Available Scripts

| Script              | Command              | Description                          |
| ------------------- | -------------------- | ------------------------------------ |
| `pnpm run dev`      | `tsx watch src/server.ts` | Start dev server with hot-reload |
| `pnpm run start`    | `tsx src/server.ts`  | Start production server              |
| `pnpm run build`    | `npx prisma generate`| Generate Prisma client               |
| `pnpm run seedAdmin`| `tsx src/scripts/seedAdmin.ts` | Seed admin user          |

---

## 🌐 Deployment

The project includes a **`render.yaml`** blueprint for one-click deployment to [Render](https://render.com):

- **Build**: `pnpm install && pnpm run build`
- **Start**: `pnpm run start`
- **Required env vars**: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `APP_URL`, `CLIENT_ID`, `CLIENT_SECRET`, `NODE_ENV`

---
Live URL:https://skillbridge-6phn.onrender.com/

