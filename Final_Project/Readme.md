Here is the **professional, detailed execution of Step 1: Index Page** for your **Student Buddy** project.

This follows production-level standards: clean architecture, scalability, role-based foundation, modern tools, and resume-quality code structure.

### 1. Create Project Root & Git Setup
```bash
mkdir student-buddy
cd student-buddy
git init
```

Create two main folders:
- `client/` → Frontend (React + Vite)
- `server/` → Backend (Express + Node)

Add root files:
- `.gitignore` (ignore node_modules, .env, build, dist)
- `README.md` (project title, description, setup instructions, tech stack)
- `PROJECT_FLOW.md` (copy the full flow you provided)
- `AI_CONTEXT.md` (copy the entire system role + project overview you gave)

### 2. Backend Initial Setup (Recommended First)
Go inside server folder:

```bash
cd server
npm init -y
npm install express mongoose dotenv cors helmet morgan cookie-parser
npm install --save-dev nodemon
```

**Recommended Professional Folder Structure (Modular / Feature-based - Scalable for 2026):**
```
server/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── models/
│   │   └── User.js          # Will hold student, mentor, admin
│   ├── routes/
│   │   └── index.js         # Main router
│   ├── utils/
│   │   └── constants.js     # Roles: 'student', 'mentor', 'admin'
│   └── server.js
├── .env
├── package.json
```

**Key Configurations:**

1. **.env** (never commit):
   ```
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_secret_key_2026
   NODE_ENV=development
   ```

2. **src/config/db.js** – MongoDB connection with modern options.

3. **src/server.js** – Basic Express server with:
   - CORS (allow localhost:5173 for now)
   - Helmet for security headers
   - JSON parsing
   - Morgan logger (dev)
   - Global error handler
   - Route mounting

4. Create a simple health check route: `GET /api/health` → returns `{ status: "ok", message: "Student Buddy API is running" }`

Run backend:
```bash
npm run dev   # or nodemon src/server.js
```

### 3. Frontend Initial Setup (Vite + React - Modern Standard)
Go to root and create client:

```bash
cd ../client
npm create vite@latest . -- --template react
npm install
npm install tailwindcss@latest postcss autoprefixer
npm install react-router-dom axios lucide-react   # lucide for clean icons
npx tailwindcss init -p
```

**Frontend Folder Structure (Feature-based - Professional & Scalable):**
```
client/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/          # Navbar, Sidebar, Card, Button, Loader, EmptyState
│   │   └── ui/              # Reusable UI components
│   ├── features/
│   │   └── auth/            # Will expand later
│   ├── pages/
│   │   └── IndexPage.jsx    # ← This is what we build now
│   ├── context/
│   │   └── AuthContext.jsx  # For role-based later
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── tailwind.config.js
├── vite.config.js
└── package.json
```

**Configure Tailwind** (add content paths for src/**/*).

**vite.config.js** – Add proxy for development:
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

### 4. Build the Index Page (Landing Page) – Step 1 Deliverable

**Requirements for Professional Index Page:**
- Modern, clean, student-focused design (use soft blues, greens, minimalistic cards)
- Fully responsive (mobile-first)
- Hero section with catchy headline: “Your Academic Companion – Connect, Learn, Grow”
- Features highlight (Notes sharing, Mentor guidance, AI help)
- Call-to-action buttons: **Login** and **Register** (both open modals or navigate to auth pages – we will create auth next)
- Testimonials carousel (static for now)
- Footer with links
- No functionality yet – just beautiful static UI that looks production-ready

**Pages to create now:**
- `src/pages/IndexPage.jsx` (main landing)
- `src/components/common/Navbar.jsx` (simple version: Logo + Login + Register buttons)
- Reusable components: Hero, FeatureCard, Footer

Use Tailwind for styling. Make it look premium (good spacing, shadows, hover effects, gradients).

**Routing Setup in App.jsx:**
- Use `BrowserRouter`
- Route `/` → `IndexPage`

**Index Page Sections (Exact as per your spec):**
- Navbar
- Hero Banner (big image/background + tagline + buttons)
- Features Section (Notes, Mentors, AI)
- How it Works (simple steps)
- Call to Action
- Footer

Add nice empty-state ready components and loading placeholders (even if not used yet).

### 5. Git & Best Practices for Step 1
- Make meaningful commits:
  - "chore: initialize project structure"
  - "feat: setup backend server with Express"
  - "feat: setup frontend with Vite + Tailwind"
  - "feat: create responsive Index/Landing page"
- Use ESLint + Prettier (set up now)
- Add Husky + lint-staged (optional but professional)

### Next After Completing Step 1
Once the Index page is fully designed, responsive, and looks clean & modern, we move to **Step 2: Authentication** (Registration + Login with OTP email verification simulation, JWT, role handling, protected routes).

**What to do now:**
1. Execute the above setup commands.
2. Build the Index page with beautiful UI.
3. Test locally (backend running + frontend proxy working).
4. Push to GitHub (private repo recommended for portfolio).

After you finish Step 1 (or when you get stuck on any sub-part), reply with:
- “Step 1 completed” or
- “Help with Index page code” or
- “Show me folder structure again” or
- “Start Step 2”

I will then give you the **exact code files** for the Index page + any fixes needed.

Ready? Start implementing Step 1 now and let me know your progress or where you need detailed code. This foundation will make the entire project clean and scalable.
