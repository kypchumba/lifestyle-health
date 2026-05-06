# Wellness Wave Centre

A wellness e-commerce site built with Next.js on the frontend and FastAPI + PostgreSQL on the backend. The public site has a one-page Home/About/Services/Contact flow, a separate Shop page, product detail pages, a cart drawer, and an admin product manager.

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Database: PostgreSQL
- Admin storage: PostgreSQL through the FastAPI API, with browser localStorage fallback when the backend is offline

## Main Features

- Smooth one-page navigation for Home, About, Services, and Contact
- Separate Shop page with 10, 20, 50, and 100 row controls
- Two-column mobile product grids
- Product detail pages with a floating Back button
- Floating Shop shortcut on main pages
- Cart drawer with click-away close and browser-back close
- Admin login for product management
- Admin can add, edit, upload product images, reorder new arrivals, reset, and delete products
- Deleted products are removed from PostgreSQL through a protected backend endpoint. Uploaded product images are saved under `public/uploads` and the product stores the returned `/uploads/...` path.

## Project Structure

```text
backend/                 FastAPI backend application
backend/app/             API, database, models, schemas, seed data
components/              Shared React components and contexts
data/                    Frontend fallback seed data
pages/                   Next.js routes
public/                  Static images and icons
styles/                  Global styles
README.md                Whole-project documentation
```

## Environment Files

Create these local files from the examples:

```powershell
copy backend\.env.example backend\.env
copy .env.local.example .env.local
```

`backend/.env` is ignored by git and should contain your PostgreSQL connection string and admin credentials:

```env
DATABASE_URL=postgresql+psycopg://postgres:<your-url-encoded-password>@localhost:5432/wellness
ADMIN_USERNAME=admin
ADMIN_PASSWORD=wellness2026
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Because special characters in database passwords must be URL encoded, `@` becomes `%40` inside `DATABASE_URL`.

`.env.local` should point the frontend to the API:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## PostgreSQL Setup

Make sure PostgreSQL is running, then create the database if it does not already exist:

```powershell
$env:PGPASSWORD='<your-postgres-password>'
psql -h localhost -U postgres -d postgres -c "CREATE DATABASE wellness"
```

The FastAPI backend creates the required tables and seeds the starter products automatically on startup when the database is empty.

If you use Docker instead of a local PostgreSQL service, a `docker-compose.yml` file is included:

```powershell
docker compose up -d postgres
```

## Install Dependencies

Frontend dependencies:

```powershell
npm.cmd install
```

Backend dependencies:

```powershell
npm.cmd run backend:install
```

This creates `backend/.venv` and installs FastAPI, Uvicorn, SQLAlchemy, and Psycopg.

## Run The App

Start the backend API:

```powershell
npm.cmd run dev:backend
```

Start the frontend in another terminal:

```powershell
npm.cmd run dev
```

Open:

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- Backend health: http://localhost:8000/health
- Backend docs: http://localhost:8000/docs

## Admin Login

Default local credentials:

```text
Username: admin
Password: wellness2026
```

Change `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env` before using outside local development.

## Admin Product Management

From `/admin`, the admin can:

- Add a product
- Choose and upload a product image
- Edit product name, id, category, image path, price, old price, and description
- Mark or unmark a product as New Arrival
- Move New Arrival products up or down
- Delete products
- Reset the catalog to the original seed data

Product deletion uses the protected backend route:

```http
DELETE /api/products/{product_id}
```

The API requires the admin login token for write operations.

## API Summary

Public routes:

```text
GET /health
GET /api/catalog
GET /api/products
GET /api/products/{product_id}
POST /api/auth/login
```

Admin routes:

```text
POST /api/auth/logout
PUT /api/catalog
POST /api/catalog/reset
PUT /api/products/{product_id}
DELETE /api/products/{product_id}
POST /api/uploads/products
PUT /api/new-arrivals
```

## Verification

Run the frontend build:

```powershell
npm.cmd run build
```

Verify the backend imports:

```powershell
cd backend
.\.venv\Scripts\python.exe -c "from app.main import app; print(app.title)"
```