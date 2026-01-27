# Issue Tracker

> A lightweight project and issue tracking system

**Simple issue tracking application for managing projects, tasks, and team collaboration. Built with PostgreSQL, Sequelize, Express, and React.**

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- ✅ Create and manage projects
- ✅ Track issues with OPEN, IN_PROGRESS, and CLOSED statuses
- ✅ Assign issues to team members
- ✅ Add and manage team members
- ✅ Auto-seeded demo data for quick testing
- ✅ Clean dashboard interface

> **Note:** This is a lightweight alternative to complex project management tools. Perfect for small teams who want simplicity.

## Tech Stack

**Backend:** Node.js, Express, Sequelize  
**Database:** PostgreSQL  
**Frontend:** React, Vite, Tailwind CSS

## Project Structure

```
issue-tracker/
├── backend/
│   ├── models/              # Sequelize models
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── seeders/             # Demo data
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
│
└── screenshots/
```

## Quick Start

### Prerequisites

- Node.js 16+
- PostgreSQL 13+
- npm 7+

### Installation

**1. Clone & Install**

```bash
git clone https://github.com/NainaKothari-14/Issue_Tracker.git
cd Issue_Tracker

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

**2. Setup Database**

```sql
CREATE DATABASE issue_tracker;
```

Create `.env` in `backend/` folder:

```env
DB_NAME=issue_tracker
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=5000
```

**3. Initialize Database**

```bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all  # Optional: adds demo data
```

**4. Run the App**

```bash
# Backend (from backend directory)
node server.js
# Runs at http://localhost:5000

# Frontend (in new terminal, from frontend directory)
npm run dev
# Runs at http://localhost:5173
```

**5. Test It**

Open `http://localhost:5173` and explore:
- Dashboard with demo projects and issues
- Create new project
- Add team members
- Create and track issues

## Screenshots

### Dashboard
<img src="screenshots/IssueTrackerDashboard.png" width="600" alt="Dashboard"/>

*Main dashboard showing all projects and issues*

### Create Project
<img src="screenshots/CreateProject.png" width="600" alt="Create Project"/>

*Simple form to create new projects*

### Add Team Member
<img src="screenshots/AddNewTeamMember.png" width="600" alt="Add Team Member"/>

*Add team members with name, email, and role*

### Create Issue
<img src="screenshots/CreateIssue.png" width="600" alt="Create Issue"/>

*Create issues with title, description, priority, and assignee*

### Issue Tracking
<img src="screenshots/Tracking.png" width="600" alt="Tracking"/>

*Track issues through OPEN → IN_PROGRESS → CLOSED workflow*

### Overview
<img src="screenshots/IssueTracker.png" width="600" alt="Overview"/>

*Complete view of the issue tracking system*

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all projects |
| `POST` | `/api/projects` | Create new project |
| `GET` | `/api/issues` | Get all issues |
| `POST` | `/api/issues` | Create new issue |
| `PUT` | `/api/issues/:id` | Update issue |
| `GET` | `/api/team-members` | Get team members |
| `POST` | `/api/team-members` | Add team member |

## Database Schema

**Project:** id, name, description  
**Issue:** id, title, description, status, priority, projectId, assigneeId  
**TeamMember:** id, name, email, role

**Relationships:**
- Project has many Issues
- TeamMember has many Issues (as assignee)

## Troubleshooting

### Database Connection Fails

```bash
# Check PostgreSQL is running
sudo service postgresql status

# Test connection
psql -U your_username -d issue_tracker

# Verify .env credentials match your PostgreSQL user
```

### Tables Don't Exist

```bash
# Run migrations
cd backend
npx sequelize-cli db:migrate
```

### No Demo Data

```bash
# Seed the database
npx sequelize-cli db:seed:all
```

### CORS Errors

```javascript
// Ensure CORS is enabled in backend/server.js
app.use(cors({ origin: 'http://localhost:5173' }));
```

## Future Enhancements

- User authentication
- Comments on issues
- File attachments
- Due dates
- Email notifications
- Export reports

## Contributing

Contributions welcome! Fork the repo, create a feature branch, and submit a PR.

## License

MIT License © Naina Kothari

## Author

**Naina Kothari**  
GitHub: [@NainaKothari-14](https://github.com/NainaKothari-14)

---

⭐ Star this repo if you found it helpful!!
