
# Task-Management-System
A full-stack task management platform for small teams to create, assign, and manage tasks efficiently.

## 🌐 Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend), Render (backend)

## ✨ Features
- User registration & login (JWT + Cookies)
- Task CRUD
- Assign tasks to users
- Notifications for assigned tasks
- Dashboard for tracking
- Search and filter tasks
- Responsive and clean UI

## 🛠️ Setup Instructions
1. Clone frontend and backend repos
2. Run backend:
   ```bash
   cd server
   npm install
   npm start
3. Run fronted:
   ```bash
   cd client
   npm install
   npm run dev
4. Create .env for both:
   ```bash
   For server
   PORT=
   MONGO_URI=
   JWT_SECRET=
   NODE_ENV=
   CORS_ORIGIN=
   For client
   NEXT_PUBLIC_API_URL=
   PORT=

## 🧠 Approach & Architecture

### 🔧 Backend (Express.js + MongoDB)

- Built with **RESTful API architecture**
- **JWT-based authentication**
- MongoDB models for `User` and `Task`
- API Routes:
  - `/api/auth` – for user authentication (login, register)
  - `/api/tasks` – for task operations (CRUD)
- Middleware:
  - Authentication validation
  - Error handling

### 💻 Frontend (Next.js + Tailwind CSS)

- Pages-based routing (`/login`, `/dashboard`, `/tasks`)
- API calls made using **Axios** to interact with backend services
- State management using **React Hooks**
- **Responsive UI** developed using Tailwind CSS utility classes

## ⚖️ Assumptions & Trade-offs

### ✅ Assumptions

- Every user can create and assign tasks
- All users have the same role/permission level
- JWT token is stored securely in HTTP-only cookies

### ⚠️ Trade-offs

- ❌ No **Role-Based Access Control (RBAC)** implemented
- ❌ No **real-time notifications** (e.g., WebSocket-based updates)
- ❌ Basic search implementation (no full-text indexing)
- ✅ Focused on delivering a working MVP with simplicity in mind