# SpendSmart - Budget Tracker

## Elevator Pitch
SpendSmart is a full-stack budget tracking web application built for students and young professionals who want a clear, real-time view of their finances — without spreadsheets or complicated setup. Users register an account, log in securely, and track their expenses by category with live charts, a budget progress bar, smart notifications, search and filter tools, and a personal profile page. All data is stored in a MySQL database and served through a RESTful Spring Boot API.

---

## Technologies Used

### Frontend
- React 18 (Vite)
- JavaScript (ES6+)
- HTML5 / CSS3
- Canvas API (donut and bar charts)

### Backend
- Java 21
- Spring Boot 4.1
- Spring Security (session-based authentication)
- Spring Data JPA / Hibernate
- Maven

### Database
- MySQL 8
- MySQL Workbench

### Tools & Resources
- IntelliJ IDEA
- VS Code
- Git / GitHub
- Postman
- Google Fonts
- FontAwesome Icons
- Unsplash
- MealDB API (food categories from external API)

---

## Features
- User registration and login with BCrypt password encryption
- Session-based authentication with Spring Security
- Remember Me — auto-fills username on login page
- Auto-login on page refresh using active session check
- Personalized greeting based on time of day (Good Morning / Afternoon / Evening)
- Add, edit, and delete expenses with confirmation dialog
- Transaction date display on each expense item
- Organize expenses by category (linked to database via foreign key)
- Categories fetched from MealDB public API + custom categories
- Donut and bar charts showing spending by category (Canvas API)
- Live budget progress bar with color-coded warnings (yellow at 70%, red at 90%)
- Smart notifications page — alerts for budget limit, category overspending, and high transaction volume
- Search expenses by name in real time
- Filter expenses by category
- Profile page showing username, email, last login time, spending stats (total spent, transaction count, top category)
- Change password from profile page with validation
- Dark mode support (auto-detects system preference)
- Fully persistent data saved to MySQL database
- RESTful API with full CRUD operations on transactions and categories
- Database SQL script for initial setup and sample data population

---

## Pages
| Page | Description |
|---|---|
| Login | Secure login with Remember Me checkbox |
| Register | Create a new account with username, email and password |
| Dashboard | Main page — add, view, edit, delete expenses, charts, budget bar |
| About | App description, features overview, tech stack |
| Notifications | Budget alerts and spending insights |
| Profile | Account info, spending stats, change password |
| Contact | Contact form with name, email and message |

---

## Installation & Setup

### Prerequisites
- Java 21
- Node.js & npm
- MySQL 8
- Maven

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Unit-2-final-project.git
cd Unit-2-final-project
```

### 2. Set up the database
Open **MySQL Workbench**, connect to your local instance, and run the included SQL script:
```
SpendSmart- Budget tracker back end/SpendSmart-Budget-tracker/database.sql
```
This creates the `budget_tracker` database, all tables, and sample data including two demo accounts:
- Username: `demo` — Password: `password123`
- Username: `testuser` — Password: `password123`

### 3. Configure the backend
Open the file:
```
SpendSmart- Budget tracker back end/SpendSmart-Budget-tracker/src/main/resources/application.properties
```
Update your MySQL password:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/budget_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.servlet.session.persistent=false
spring.application.name=budget-tracker
```

### 4. Run the backend
Open the project in IntelliJ and click the green **Run** button, or run in terminal:
```bash
cd "SpendSmart- Budget tracker back end/SpendSmart-Budget-tracker"
mvn spring-boot:run
```
Spring Boot will start on `http://localhost:8080`

### 5. Run the frontend
Open a second terminal and navigate to the frontend folder:
```bash
cd "spendsmart-budget-tracker front end/spendsmart"
npm install
npm run dev
```
Vite will start on `http://localhost:5173`

### 6. Open the app
Visit `http://localhost:5173` in your browser. Register a new account or log in with a demo account.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Log in | No |
| POST | /api/auth/logout | Log out | Yes |
| GET | /api/auth/me | Get current logged-in user | Yes |
| PUT | /api/auth/change-password | Change password | Yes |
| GET | /api/transactions | Get all transactions | Yes |
| POST | /api/transactions | Create a transaction | Yes |
| PUT | /api/transactions/{id} | Update a transaction | Yes |
| DELETE | /api/transactions/{id} | Delete a transaction | Yes |
| GET | /api/transactions/category/{id} | Get transactions by category | Yes |
| GET | /api/transactions/type/{type} | Get by INCOME or EXPENSE | Yes |
| GET | /api/categories | Get all categories | Yes |
| POST | /api/categories | Create a category | Yes |
| PUT | /api/categories/{id} | Update a category | Yes |
| DELETE | /api/categories/{id} | Delete a category | Yes |

---

## Project Structure

```
Unit-2-final-project/
├── SpendSmart- Budget tracker back end/
│   └── SpendSmart-Budget-tracker/
│       ├── src/main/java/.../
│       │   ├── config/         (SecurityConfig, WebConfig)
│       │   ├── controller/     (AuthController, CategoryController, TransactionController)
│       │   ├── model/          (User, Category, Transaction, TransactionType)
│       │   ├── repository/     (UserRepository, CategoryRepository, TransactionRepository)
│       │   └── service/        (UserService, CategoryService, TransactionService)
│       ├── src/main/resources/
│       │   └── application.properties
│       └── database.sql
│
└── spendsmart-budget-tracker front end/
    └── spendsmart/
        └── src/
            ├── api/
            │   └── api.js              (all fetch calls — transactions, categories, auth)
            ├── assets/
            │   └── spend_smart.jpg     (SpendSmart logo)
            ├── components/
            │   ├── Chart.jsx           (donut and bar charts using Canvas API)
            │   ├── ExpenseForm.jsx     (add expense form with MealDB categories)
            │   ├── ExpenseItem.jsx     (individual expense with edit and delete)
            │   ├── ExpenseList.jsx     (renders list of ExpenseItem components)
            │   └── Summary.jsx         (budget summary with progress bar)
            ├── pages/
            │   ├── Login.jsx           (login form with Remember Me)
            │   ├── Register.jsx        (registration form)
            │   ├── Profile.jsx         (user profile, stats, change password)
            │   └── Notifications.jsx   (budget alerts and spending insights)
            ├── App.jsx                 (main app, routing, state management)
            ├── index.css               (global styles, dark mode, responsive)
            └── main.jsx                (React entry point)
```

---

## Entity Relationship Diagram
[Add link to your ERD here]

## Wireframes
https://miro.com/welcomeonboard/WDYrcEd6R3NvWlNXdEhGMnFJT3A3S1VlM3UxSUJzamVwdGo2czNZWURoZzNsaGZieDVBZmV2Z21ua0JnYU1qUUdneUQwbzVVM2dsRmp1cE1GcG9uUFVoT2pPNHpRS1cxeVVEa0NwelN5ZXNVaHA5MWxsT1ZyZ2I3dHlCL2lXUURBd044SHFHaVlWYWk0d3NxeHNmeG9BPT0hdjE=?share_link_id=852386448290

---

## Unsolved Problems
- Transactions are shared across all users — not yet scoped per user account
- No income vs expense toggle in the UI (backend supports `TransactionType` enum)
- Budget goal is stored in localStorage rather than the database
- Contact form uses Netlify form handling which requires deployment to work
- Dark mode donut chart center still shows white (does not adapt to dark background)

## Future Features
- Scope transactions per logged-in user using Spring Security Principal
- Income tracking with net balance calculation
- Filter transactions by date range
- Monthly and yearly spending reports
- Export transactions as CSV or PDF
- Import expenses from a bank statement
- Analytics page with monthly spending trends
- Mobile-responsive redesign
- Fix dark mode donut chart center color