# ODC Club Hybride Platform

A full-stack platform for managing and exploring Orange Digital Center (ODC) clubs, members, events, and more. This project includes a modern React frontend and a robust Node.js/Express/Sequelize/PostgreSQL backend.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Frontend Setup & Launch](#frontend-setup--launch)
- [Backend Setup & Launch](#backend-setup--launch)
- [Main Features](#main-features)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Project Overview

The ODC Club Hybride Platform enables:
- Club registration, onboarding, and management
- Role-based dashboards (student, coach, manager, admin, etc.)
- Event, project, and competition management
- User authentication and access control
- Network exploration and analytics

---

## Project Structure

### Arborescence
```
ODC Club Hybride Platform/
├── App.tsx
├── Attributions.md
├── README.md
├── constants/
│   └── orange-countries.ts
├── components/
│   ├── AuthSystem.tsx
│   ├── ClubRegistration.tsx
│   ├── LandingPage.tsx
│   ├── Navigation.tsx
│   ├── NetworkExplorer.tsx
│   ├── OnboardingFlow.tsx
│   ├── RoleSwitcher.tsx
│   ├── dashboards/
│   │   ├── ClubDashboard.tsx
│   │   ├── ClubManagerDashboard.tsx
│   │   ├── CoachDashboard.tsx
│   │   ├── ExpertDashboard.tsx
│   │   ├── NationalAdminDashboard.tsx
│   │   ├── RegionalAdminDashboard.tsx
│   │   ├── StudentDashboard.tsx
│   │   └── SuperAdminDashboard.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── ... (many UI components)
│       └── utils.ts
├── styles/
│   └── globals.css
├── odc-backend/
│   ├── package.json
│   ├── README.md
│   ├── .env (not committed)
│   ├── odc_club_hybride_schema.sql
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── database.js
│       ├── models/
│       │   ├── index.js
│       │   ├── user.js
│       │   ├── country.js
│       │   ├── region.js
│       │   ├── club.js
│       │   ├── clubMembership.js
│       │   ├── project.js
│       │   ├── competition.js
│       │   ├── event.js
│       │   ├── registration.js
│       │   ├── focusArea.js
│       │   └── clubFocusArea.js
│       ├── middlewares/
│       │   └── errorHandler.js
│       ├── routes/ (to be implemented)
│       ├── controllers/ (to be implemented)
│       └── utils/ (to be implemented)
└── ...
```

---

## Frontend Setup & Launch

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 2. Install dependencies
```
npm install
# or
yarn install
```

### 3. Start the development server
```
npm start
# or
yarn start
```
- The app will run at `http://localhost:3000` by default.

### 4. Environment variables
- If needed, create a `.env` file for frontend config (API URLs, etc.).

---

## Backend Setup & Launch

### 1. Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL (running, with a database created)

### 2. Setup
```
cd odc-backend
npm install
```

### 3. Configure environment variables
Create a `.env` file in `odc-backend/` with:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=odc_club_hybride
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d
PORT=4000
```

### 4. Set up the database
- Ensure PostgreSQL is running and the database exists.
- Run the schema SQL:
  ```
  psql -U postgres -d odc_club_hybride -f odc_club_hybride_schema.sql
  ```
- Or use Sequelize sync for development.

### 5. Start the backend server
```
npm run dev
```
- The API will be available at `http://localhost:4000`.
- Test with: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## Main Features
- **Role-based dashboards** for students, coaches, managers, admins, etc.
- **Club registration** and onboarding flows
- **User authentication** (JWT, roles)
- **Event, project, and competition management**
- **Network explorer** for clubs and members
- **Analytics and reporting**

---

## Technologies Used
- **Frontend:** React, TypeScript, CSS Modules
- **Backend:** Node.js, Express, Sequelize, PostgreSQL, JWT, bcrypt

---

## License
MIT

