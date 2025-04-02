# News App

## Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB (running locally or in the container)
- Docker & Docker compose (if running mongo in a container)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/news-app.git
   cd news-app

2. Run docker-compose to start MongoDB (runs on port 27018)
    ``` bash
    docker-compose up -d

3. Run the backend
    ```bash
    cd backend
    npm install
    npm run build
    npm start

3. Run the client
    ```bash
    cd client
    npm install
    npm run build
    npm start

---

## Design Decisions

### Backend

1. **Separation of Concerns**:
   - The backend handles all data fetching, normalization, and caching. This ensures that the frontend only displays data.
   - By separating functionalities into distinct modules (e.g., controllers, services, utilities), the codebase is easier to test, maintain, and extend.

2. **MongoDB**:
   - MongoDB was chosen for its flexible schema, which is great for handling data with varying fields like news articles. In addition, there are no complex relationships, in which case sql would probably be a better choce.

3. **Environment Variables**:
   - Environment variables are managed in a centralized `config.ts` file. This ensures that required variables are validated at startup, reducing runtime errors and improving maintainability.

5. **Authentication**:
   - Cookie-based JWT-based authentication is used to secure API endpoints, which is a more secure choice than using `localStorage` as the cookies cannot be accessed from js scripts.

### Client

1. **Typescript**
   - The client is built using Typescript to ensure typesafety, provide documentation and overall better dev exeprience.

2.  **State Management**:
   - Context API is used for managing global state, as the app is small enough so the external libraries add unnecessary overhead.

3.  **Styling**:
   - SCSS modules are used for styling components, ensuring styles are scoped locally to avoid potential conflicts.
   - I didn't use any of the styling libraries, as I was able to implement the design with css-grid and flex display.

---

## Notes

- Use gmail domain for registration email, I tried initially with .live but the emails were not delivered.