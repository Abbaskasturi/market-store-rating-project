# Store Rating Full-Stack Application 

This is a full-stack web application built for the Roxiler coding challenge. It allows users to rate stores, with role-based access control for administrators, normal users, and store owners. The backend is built with Node.js/Express.js and SQLite, and the frontend is built with React.js.

## App Link : https://market-store-rating-project-av7c.vercel.app/

## Default Admin Credentials 

The application is seeded with a default administrator account upon first launch. Use these credentials to log in and manage the platform.

* **Email:** `admin@example.com`
* **Password:** `Abbas@00000`

---

## Setup Instructions ⚙️

To run this project locally, you will need to set up both the backend and frontend services.

### Backend Setup (Port 5000)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a file named `.env` in the `backend` root directory and add the following:
    ```env
    PORT=5000
    JWT_SECRET=secrete_key
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The backend API will be running at `http://localhost:5000`.

### Frontend Setup (Port 3000)

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a file named `.env` in the `frontend` root directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5001 or render url 
    ```

4.  **Start the React application:**
    ```bash
    npm start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

---

## API Documentation (8 Key Endpoints)

The base URL for all API endpoints is `http://localhost:5001/api`.

**Authorization:** Endpoints marked as **Protected** require a JWT Bearer Token in the `Authorization` header.

### Authentication Routes

#### 1. User Signup
* **Endpoint:** `POST /auth/signup`
* **Description:** Registers a new user with the default `user` role.
* **Sample Request Body:**
    ```json
    {
        "name": "Sravanthi the Reviewer",
        "email": "sravanthi.reviewer@example.com",
        "address": "123 Reviewer Street, Warangal",
        "password": "Reviewer@123"
    }
    ```
* **Sample Success Response (201):**
    ```json
    {
        "success": true,
        "message": "User registered successfully!",
        "data": { "userId": 2 }
    }
    ```

#### 2. User Login
* **Endpoint:** `POST /auth/login`
* **Description:** Authenticates any user (admin, user, or owner) and returns a JWT token.
* **Sample Request Body (for Admin):**
    ```json
    {
        "email": "kasturiabbas.admin@gmail.com",
        "password": "Abbas@00000"
    }
    ```
* **Sample Success Response (200):**
    ```json
    {
        "success": true,
        "message": "Logged in successfully",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "user": { "id": 1, "name": "Kasturi Abbas Administrator", "role": "admin" }
        }
    }
    ```

### Admin Routes (Protected - `admin` role required)

#### 3. Get Admin Dashboard
* **Endpoint:** `GET /admin/dashboard`
* **Description:** Fetches platform-wide statistics (total users, stores, and ratings).
* **Sample Success Response (200):**
    ```json
    {
        "success": true,
        "message": "Dashboard data fetched",
        "data": {
            "totalUsers": 3,
            "totalStores": 1,
            "totalRatings": 1
        }
    }
    ```

#### 4. Add New User
* **Endpoint:** `POST /admin/users`
* **Description:** Creates a new user with any specified role (e.g., `'owner'`).
* **Sample Request Body:**
    ```json
    {
        "name": "Ramesh Kumar - Store Owner",
        "email": "ramesh.owner@example.com",
        "address": "456 Market Road, Hanamkonda",
        "password": "OwnerPass@123",
        "role": "owner"
    }
    ```
* **Sample Success Response (201):**
    ```json
    {
        "success": true,
        "message": "User added successfully",
        "data": { "userId": 2 }
    }
    ```

#### 5. Add New Store
* **Endpoint:** `POST /admin/stores`
* **Description:** Creates a new store and assigns it to an existing owner via their `owner_id`.
* **Sample Request Body:**
    ```json
    {
        "name": "Ramesh Kirana & General Store",
        "email": "contact@rameshstore.com",
        "address": "456 Market Road, Hanamkonda",
        "owner_id": 2
    }
    ```
* **Sample Success Response (201):**
    ```json
    {
        "success": true,
        "message": "Store added successfully",
        "data": { "storeId": 1 }
    }
    ```

### Normal User Routes (Protected - `user` role required)

#### 6. List & Search Stores
* **Endpoint:** `GET /user/stores`
* **Description:** Fetches a list of stores. Can be filtered with a query parameter (e.g., `?name=Ramesh`).
* **Sample Success Response (200):**
    ```json
    {
        "success": true,
        "message": "Stores fetched successfully",
        "data": [
            {
                "id": 1,
                "name": "Ramesh Kirana & General Store",
                "address": "456 Market Road, Hanamkonda",
                "overallRating": 5,
                "userSubmittedRating": 5
            }
        ]
    }
    ```

#### 7. Submit or Update a Rating
* **Endpoint:** `POST /user/ratings`
* **Description:** Submits a rating (1-5) for a store. If a rating already exists, it updates it.
* **Sample Request Body:**
    ```json
    {
        "store_id": 1,
        "rating": 5
    }
    ```
* **Sample Success Response (200):**
    ```json
    {
        "success": true,
        "message": "Rating processed successfully",
        "data": { "changes": 1, "id": 1 }
    }
    ```

### Store Owner Routes (Protected - `owner` role required)

#### 8. Get Store Owner Dashboard
* **Endpoint:** `GET /owner/dashboard`
* **Description:** Fetches the average rating and a list of all raters for the logged-in owner's store.
* **Sample Success Response (200):**
    ```json
    {
        "success": true,
        "message": "Owner dashboard fetched",
        "data": {
            "averageRating": 5,
            "raters": [
                {
                    "name": "Sravanthi the Reviewer",
                    "email": "sravanthi.reviewer@example.com",
                    "rating": 5
                }
            ]
        }
    }
    ```
<img width="1920" height="1080" alt="Screenshot (1152)" src="https://github.com/user-attachments/assets/45ef14b4-1af0-4445-b8f3-277ec1cc0a94" />
<img width="1920" height="1080" alt="Screenshot (1153)" src="https://github.com/user-attachments/assets/31c08060-8021-4080-b148-9087196ddfb3" />
<img width="1920" height="1080" alt="Screenshot (1154)" src="https://github.com/user-attachments/assets/4d77faa6-edcc-4a88-a450-1e87a61eaba1" />
<img width="1920" height="1080" alt="Screenshot (1155)" src="https://github.com/user-attachments/assets/3c88235d-5767-474f-82f9-163e1fcf5470" />
<img width="1920" height="1080" alt="Screenshot (1156)" src="https://github.com/user-attachments/assets/50cabbff-61af-408d-904c-0479e46a2e89" />






