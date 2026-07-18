# Project Overview: AI Study Planner

This document provides a comprehensive overview of the architecture, folder structure, entry points, APIs, models, and services of the **AI Study Planner** application, along with an analysis of its current implementation state and critical issues.

---

## 1. System Architecture

The AI Study Planner is built as a decoupled **Client-Server web application** utilizing the **MERN (MongoDB, Express, React, Node.js)** stack:

*   **Frontend (Client)**: A single-page application built with **React** using **Vite** as the build tool. It communicates with the backend via HTTP/HTTPS requests using `axios`. It uses client-side routing (`react-router-dom`) and local storage for maintaining session tokens.
*   **Backend (Server)**: A RESTful API built on **Node.js** and **Express.js**. It connects to **MongoDB** (via **Mongoose**) for persistence, handles authentication using **JSON Web Tokens (JWT)**, and parses request payloads.
*   **Database**: **MongoDB** is used to store user profiles and study plan documents.

### Architectural Flow
1. The user interacts with the React frontend.
2. The frontend triggers calls to local services (`services/planService.js`, etc.) using `axios`.
3. Requests sent to the backend require authorization headers containing the JWT token (for protected routes).
4. The backend server verifies the JWT token via middleware (`authMiddleware.js`), routes the request to the appropriate controller, performs database operations via Mongoose models, and returns JSON responses.

---

## 2. Folder Structure

Below is the directory tree of the workspace:

```
AI study planner/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Handles registration and login logic
│   │   └── studyPlanController.js  # CRUD operations for study plans
│   ├── middleware/
│   │   └── authMiddleware.js       # Protects routes via JWT verification
│   ├── models/
│   │   ├── StudyPlan.js            # Study plan schema (contains syntax errors)
│   │   └── User.js                 # User mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js           # Express router mapping /api/auth routes
│   │   └── studyPlannerRoutes.js   # Router for study plan CRUD operations
│   ├── .env                        # Local environment configuration
│   ├── server.js                   # Backend entry point
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top navigation header
│   │   │   ├── ProtectedRoute.jsx  # Auth guard component
│   │   │   └── Sidebar.jsx         # Sidebar navigation links
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth context (currently empty)
│   │   ├── pages/
│   │   │   ├── CreatePlan.css
│   │   │   ├── CreatePlan.jsx      # Page to create a study plan
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.jsx       # User dashboard landing page
│   │   │   ├── EditPlan.jsx        # Edit study plan page (currently empty)
│   │   │   ├── GeneratePlan.jsx    # AI generate plan page (currently empty)
│   │   │   ├── Home.jsx            # Simple Home component
│   │   │   ├── Login.jsx           # Login interface & localstorage token handler
│   │   │   ├── MyPlans.jsx         # Fetches and lists plans for current user
│   │   │   └── Register.jsx        # Registration form
│   │   ├── services/
│   │   │   ├── aiService.js        # AI functions (currently empty)
│   │   │   ├── api.js              # Base Axios instance configuration
│   │   │   ├── authService.js      # Auth API wrappers (currently empty)
│   │   │   └── planService.js      # Study plan API wrappers (missing getPlans export)
│   │   ├── App.css
│   │   ├── App.jsx                 # Frontend routing configuration
│   │   ├── index.css               # Main styling rules
│   │   └── main.jsx                # Frontend entry point
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── package.json                    # Workspace dependencies config
```

---

## 3. Entry Points

### Backend Entry Point
*   **File**: [backend/server.js](file:///c:/CEG/projects/AI%20study%20planner/backend/server.js)
*   **Responsibility**: 
    *   Loads environment variables from `backend/.env`.
    *   Connects to the MongoDB instance using `mongoose.connect()`.
    *   Registers core middleware (`cors`, `express.json`).
    *   Mounts authorization routes (`/api/auth`) and basic test routes.
    *   Listens on a configuration port (default `5000`).

### Frontend Entry Point
*   **File**: [frontend/src/main.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/main.jsx)
*   **Responsibility**: 
    *   Imports global styling sheets (`index.css`).
    *   Renders the core `<App />` component in the HTML DOM element with ID `root`.
    *   Wraps application inside `<StrictMode>` for warning detection.

---

## 4. API Endpoints

### Auth API Route Prefix: `/api/auth`
Mapped from `backend/routes/authRoutes.js`:

| Method | Endpoint | Controller Action | Access | Request Body | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | `registerUser` | Public | `{ name, email, password }` | Hashes password with bcrypt and registers a new User in MongoDB. |
| **POST** | `/login` | `loginUser` | Public | `{ email, password }` | Verifies credentials and generates a 1-day JWT token. |

### Development/Mock APIs in Server.js
Directly defined in `backend/server.js`:

| Method | Endpoint | Middleware | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | None | Public | Returns status "Backend running". |
| **GET** | `/profile` | `protect` | Private (JWT) | Returns mock authenticated user token data. |
| **GET** | `/my-plans` | `protect` | Private (JWT) | Returns hardcoded plans: `["DSA", "ML", "React"]`. |

### Study Plan API Route Prefix: `/api` (Not fully hooked up)
Mapped in `backend/routes/studyPlannerRoutes.js`:

| Method | Endpoint | Middleware | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/plans` | `protect` | Private (JWT) | Creates and saves a new study plan. |
| **PUT** | `/plans/:id` | `protect` | Private (JWT) | Updates a plan by ID (if owned by requesting user). |

*(Note: There is also a `deletePlan` controller and a `getPlans` controller, but they are not fully mapped in the routes. See Section 7 for details.)*

---

## 5. Models (Database Schema)

### User Model
*   **File**: [backend/models/User.js](file:///c:/CEG/projects/AI%20study%20planner/backend/models/User.js)
*   **Fields**:
    *   `name` (String, Required)
    *   `email` (String, Required, Unique)
    *   `password` (String, Required - stored as bcrypt hash)
    *   `createdAt` & `updatedAt` (Timestamps automatically generated)

### Study Plan Model (Current Draft State)
*   **File**: [backend/models/StudyPlan.js](file:///c:/CEG/projects/AI%20study%20planner/backend/models/StudyPlan.js)
*   **Fields**: Currently written syntactically incorrectly, but outlines:
    *   `userId`
    *   `subject`
    *   `plannedHours`
    *   `deadline`

---

## 6. Services (Frontend Component-to-API Layer)

*   **API Configuration** ([api.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/api.js)):
    *   Configures an Axios client instance targeting the backend `http://localhost:5000/api`.
*   **Study Plan Services** ([planService.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/planService.js)):
    *   `createPlan(planData)`: POSTs to `/plans` with authorization token.
    *   `updatePlan(id, planData)`: PUTs to `/plans/:id` with authorization token.
    *   `getPlanById(id)`: GETs `/plans/:id` with authorization token.
    *   `deletePlan(id)`: DELETEs `/plans/:id` with authorization token.
*   **AI Services** ([aiService.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/aiService.js)): Empty stub file.
*   **Auth Services** ([authService.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/authService.js)): Empty stub file.

---

## 7. Discrepancies and Critical Bugs Identified

During the analysis of the codebase, several issues and bugs were identified that prevent the application from running correctly:

### Backend Issues
1.  **Study Plan Router is Unmounted**: In [backend/server.js](file:///c:/CEG/projects/AI%20study%20planner/backend/server.js), `studyPlannerRoutes` is never imported or registered using `app.use()`. Only `authRoutes` is mounted. As a result, requests to `/api/plans` return a `404 Not Found`.
2.  **Mongoose StudyPlan Model contains Syntax Error**: The file [backend/models/StudyPlan.js](file:///c:/CEG/projects/AI%20study%20planner/backend/models/StudyPlan.js) is not structured as a Mongoose model. It directly instantiates a nonexistent `StudyPlan` class using undefined variables (`req.user.userId`, `subject`, etc.) instead of calling `new mongoose.Schema(...)`.
3.  **Missing Controller Exports & Router Imports**:
    *   In [backend/controllers/studyPlanController.js](file:///c:/CEG/projects/AI%20study%20planner/backend/controllers/studyPlanController.js), the function `deletePlan` is defined but **not exported** in `module.exports`.
    *   In [backend/routes/studyPlannerRoutes.js](file:///c:/CEG/projects/AI%20study%20planner/backend/routes/studyPlannerRoutes.js), `updatePlan` is used on line 9 but **not imported** from the controllers.
4.  **Backend Controller Typo**: In [backend/controllers/studyPlanController.js](file:///c:/CEG/projects/AI%20study%20planner/backend/controllers/studyPlanController.js) (line 108), `res.status(500).jason({...})` is used instead of `.json(...)`. This will cause the server to crash when handling a delete operation failure.
5.  **Auth Middleware Error Handling**: In [backend/middleware/authMiddleware.js](file:///c:/CEG/projects/AI%20study%20planner/backend/middleware/authMiddleware.js) (line 8), the expression `res.json.status(401)` is used. Since `res.json` does not have a `status` function, this will crash the server when a request is made without an authorization token.

### Frontend Issues
1.  **Missing Routing Imports in App.jsx**: In [frontend/src/App.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/App.jsx), components `<MyPlans />`, `<GeneratePlan />`, and `<CreatePlan />` are referenced in routes but **never imported** at the top of the file. This results in a React runtime compilation crash.
2.  **Missing API Method in Service Layer**:
    *   The page [MyPlans.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/pages/MyPlans.jsx) imports `getPlans` from `planService.js`.
    *   However, `planService.js` **does not define or export** `getPlans`. It only exports `createPlan`, `updatePlan`, `getPlanById`, and `deletePlan`.
3.  **Incorrect field mapping**:
    *   In [MyPlans.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/pages/MyPlans.jsx) (line 47), the code reads `{plan.hours}`, while the model/database represents hours as `plannedHours`.
4.  **Empty Files**:
    *   [AuthContext.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/context/AuthContext.jsx) (0 bytes)
    *   [EditPlan.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/pages/EditPlan.jsx) (0 bytes)
    *   [GeneratePlan.jsx](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/pages/GeneratePlan.jsx) (0 bytes)
    *   [aiService.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/aiService.js) (0 bytes)
    *   [authService.js](file:///c:/CEG/projects/AI%20study%20planner/frontend/src/services/authService.js) (0 bytes)
