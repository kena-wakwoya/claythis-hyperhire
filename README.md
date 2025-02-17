# Menu Management

# API
This is a **NestJS**-based **Menu Management API** that uses **Prisma ORM** with **PostgreSQL** as the database. The application is **Dockerized** for easy deployment.

## Features

- 📂 healthy check.
- 📂 Retrieve all menus with hierarchical structure.
- 🔍 Get a specific menu along with its root and children.
- ➕ Create new menu items (supports hierarchical relationships).
- ✏️ Update menu items.
- 🗑️ Delete menu items recursively.
- 📄 Pagination support for listing menus.
- ⚡ Centralized exception handling.
- 🌐 CORS enabled.
- ⚙️ Configurable via `.env` file.

## Technologies Used

- 🚀 **NestJS** - Backend Framework
- 🛠️ **Prisma** - ORM for PostgreSQL
- 🗄️ **PostgreSQL** - Database
- 🐳 **Docker** - Containerization
- 💻 **TypeScript** - Language
---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- ✅ **Node.js** (v18+)
- ✅ **Docker & Docker Compose**
- ✅ **Postman** (Optional, for API testing)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://@github.com/kena-wakwoya/claythis-hyperhire.git 
cd claythis-hyperhire/backend
npm install
```

### Environment Configuration

Create a `.env` file in the root directory and configure:

```env
PORT=3000
DATABASE_URL=postgresql://uawe:password@postgres:5432/db
CORS_ORIGIN=http://localhost:3000
```

---

## Running the Application

### 🐳 Run with Docker

```sh
docker-compose up --build
```

This will start the PostgreSQL database and NestJS API in containers.

### 🚀 Run Locally (Without Docker)

```sh
npx prisma migrate dev --name init
npm run start:dev
```

---

## API Endpoints

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

## Database Migrations

Run the following command to apply migrations:

```sh
npx prisma migrate dev --name init
```

To generate Prisma client after schema changes:

```sh
npx prisma generate
```

---


## DTOs & Responses

### 📦 CRUD Response DTO

A standardized response structure is used for create, update, and delete operations:

```json
{
  "success": true,
  "message": "Menu item created successfully",
  "data": {
    "id": "123",
    "name": "New Menu Item",
    "parentId": "456",
    "depth": 2
  }
}
```

### 📑 Paginated Response DTO

All paginated endpoints return data in the following format:

```json
{
  "payload": [],
  "totalRecords": 50,
  "itemsPerPage": 10,
  "currentPage": 1,
  "totalPages": 5
}
```

---

## Logger

The application uses a centralized **Logger** for error tracking and debugging:

- Logs API requests and errors.
- Helps in debugging issues efficiently.

Enable logging in `main.ts`:

```ts
const logger = new Logger('Bootstrap');
app.useGlobalFilters(new HttpExceptionFilter());
```
---

## Frontend (Next.js 14)

The frontend is built using **Next.js 14** and interacts with this API. 

## Frontend Tech Stack 

- Next.js 14 - React framework
- App Router - For server-side rendering and routing
- API Routes - For handling backend logic
- Redux - For global state management
- Tailwind CSS - For styling
- The frontend interacts with this API to manage menus, fetch hierarchical structures, and handle user interactions efficiently.



### 🔗 API Integration

- This API is designed to work with a frontend built using Next.js 14 with the App Router, API Routes, Redux for state management, and Tailwind CSS for styling.
- Implements pagination for menu listings.
- Handles hierarchical menu structures dynamically.
- Displays error messages using toast notifications.




### Installation and Run

Clone the repository and install dependencies:

```sh
git clone https://@github.com/kena-wakwoya/claythis-hyperhire.git 
cd claythis-hyperhire/frontend
npm install
```

3. Configure `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:

```sh
npm run dev
```

---

