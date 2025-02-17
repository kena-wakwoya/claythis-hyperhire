# Menu Management API

This is a **NestJS**-based **Menu Management API** that uses **Prisma** with **PostgreSQL** as the database. 
The application is **Dockerized** for easy deployment.

## Features ✨

- 📂 Retrieve all menus with hierarchical structure.
- 🔍 Get a specific menu along with its parent and children.
- ➕ Create new menu items (supports hierarchical relationships).
- ✏️ Update menu items.
- 🗑️ Delete menu items recursively.
- 📄 Pagination support for listing menus.
- ⚠️ Centralized exception handling.
- ⚠️ Centralized logger.
- 🌍 CORS enabled.
- ⚙️ Configurable via `.env` file.

## Technologies Used 🛠️

- **NestJS** - Backend Framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Docker** - Containerization
- **TypeScript** - Language
---

## Getting Started 🚀

### Prerequisites ✅

Ensure you have the following installed:

- **Node.js** (v18+)
- **Docker & Docker Compose**
- **Postman** (Optional, for API testing)

### Installation 📦

Clone the repository and install dependencies:

```sh
git clone <r>
cd claythis-hyperhire/backend
npm install
```

### Environment Configuration ⚙️

Create a `.env` file in the backend directory and configure:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname

```

---

## Running the Application ▶️

### 🐳 Run with Docker

```sh
docker-compose up --build
```

This will start the PostgreSQL database and NestJS API in containers.

### 💻 Run Locally (Without Docker)

```sh
npx prisma migrate dev --name init
npm run start:dev
```

---

## API Endpoints 🌐

### 📌 Get All Menus (Paginated)

```http
GET /menus?page=1&itemsPerPage=10
```

Response:

```json
{
  "payload": [ { "id": "1", "name": "Main Menu", "children": [] } ],
  "totalRecords": 10,
  "itemsPerPage": 1,
  "currentPage": 1,
  "totalPages": 10
}
```

### 📌 Get a Menu by ID

```http
GET /menus/:id
```

### 📌 Create a Menu Item

```http
POST /menus
Content-Type: application/json
```

Request Body:

```json
{
  "name": "Sub Menu 1",
  "parentId": "1"
}
```

### 📌 Update a Menu Item

```http
PATCH /menus/:id
```

Request Body:

```json
{
  "name": "Updated Menu Name"
}
```

### 📌 Delete a Menu Item

```http
DELETE /menus/:id
```

---

## Database Migrations 🗄️

Run the following command to apply migrations:

```sh
npx prisma migrate dev --name init
```

To generate Prisma client after schema changes:

```sh
npx prisma generate
```

---

## DTOs 📌

- **CRUD Response DTO**: Standard response format for create, update, and delete operations.
- **Paginated Response DTO**: Ensures paginated data is structured consistently.
- **Menu DTOs**: Defines the request and response structure for menu operations.

---

## Logger 📝

- The API includes a centralized **logger** to track system events and errors.
- Logs are structured for easy debugging and monitoring.

---
