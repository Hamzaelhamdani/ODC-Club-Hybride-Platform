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

## Project Structure
```
odc-backend/
  src/
    config/           # Database config
    models/           # Sequelize models (all tables)
    routes/           # Express routers (to be implemented)
    controllers/      # Business logic (to be implemented)
    middlewares/      # Error handler, auth, etc.
    utils/            # Helpers, validators (to be implemented)
    app.js            # Express app setup
    server.js         # Entry point
  .env                # Environment variables (not committed)
  package.json        # Dependencies and scripts
  README.md           # This file
```

## Launching Procedure

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
Create a `.env` file in the root with the following content:
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
- Make sure PostgreSQL is running and a database named `odc_club_hybride` exists.
- You can create the schema using the provided `../odc_club_hybride_schema.sql` file:
  ```
  psql -U postgres -d odc_club_hybride -f ../odc_club_hybride_schema.sql
  ```
- Alternatively, you can use Sequelize's `sequelize.sync()` for development (not recommended for production).

### 5. Run the server
```
npm run dev
```
- The server will start on `http://localhost:4000` by default.
- Test the health check endpoint: [http://localhost:4000/api/health](http://localhost:4000/api/health)

### 6. Next Steps
- Implement authentication (register, login, JWT) in `routes/` and `controllers/`.
- Add CRUD endpoints for all entities.
- Add validation, role-based access, and error handling as needed.

## Main Backend Elements
- **Express app**: Handles HTTP requests and middleware.
- **Sequelize models**: All tables from the SQL schema are mapped to models in `src/models/`.
- **Database config**: Uses `.env` for PostgreSQL connection.
- **Error handler**: Centralized error middleware in `src/middlewares/`.
- **Health check**: `/api/health` endpoint for basic server status.

## License
MIT 