# ODC Club Hybride Platform - Backend

This is the backend API for the ODC Club Hybride Platform, built with Node.js, Express, Sequelize, and PostgreSQL.

## Features
- User authentication (JWT, roles)
- CRUD for users, clubs, regions, countries, memberships, events, projects, competitions, registrations
- Role-based access control
- Pagination, filtering, and search
- Sequelize migrations and seeders

## Tech Stack
- Node.js, Express.js
- Sequelize ORM (PostgreSQL)
- JWT for authentication
- dotenv for config
- bcrypt for password hashing
- express-validator for input validation

## Getting Started

### 1. Clone the repository
```
git clone <repo-url>
cd odc-backend
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root with the following:
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

### 4. Run the server
```
npm run dev
```

The server will start on `http://localhost:4000` by default.

### 5. Database
- The schema is defined in `../odc_club_hybride_schema.sql`.
- Use Sequelize migrations for model sync and updates.

## Project Structure
```
odc-backend/
  src/
    config/
    models/
    routes/
    controllers/
    middlewares/
    utils/
    app.js
    server.js
  .env
  package.json
  README.md
```

## License
MIT 