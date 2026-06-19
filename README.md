# Job Application Tracker

This is a mini full-stack web app I built for the InternSathi Full Stack Internship task. It basically helps you keep track of all the jobs/internships you've applied to — you can add them, see them in a list, edit details, delete them if needed, and filter by status (like Applied, Interviewing, Offer, Rejected).

I used Next.js for both frontend and backend (API routes), PostgreSQL as the database with Prisma as ORM, and Zod for validation.

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS for styling
- PostgreSQL (using Neon)
- Prisma ORM
- Zod for form/API validation

## Features

- See all applications in a table — company name, job title, status, applied date
- Click "View" to see full details of an application (notes, when it was created/updated etc.)
- Add a new application using a form
- Edit any existing application
- Delete an application (asks for confirmation first so you don't delete by mistake)
- Filter the list by status
- Search by company name or job title

## Prerequisites

- Node.js 18 or above installed
- A PostgreSQL database — I used Neon (free tier works fine)

## How to set it up

1. Clone this repo
```bash
   git clone <your-repo-url>
   cd job-tracker
```

2. Install all dependencies
```bash
   npm install
```

3. Create your `.env` file (copy from `.env.example`) and add your database URL
```bash
   cp .env.example .env
```

4. Run the migrations to set up the database tables
```bash
   npx prisma migrate dev
```

## Running it locally

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Environment Variables

- `DATABASE_URL` — your PostgreSQL connection string (check `.env.example` for the format)

## API Routes

| Method | Route | What it does |
|--------|-------|---------------|
| GET | `/api/applications` | Get all applications (can filter using `?status=` or search using `?search=`) |
| GET | `/api/applications/:id` | Get one application by its id |
| POST | `/api/applications` | Add a new application |
| PATCH | `/api/applications/:id` | Update an existing application |
| DELETE | `/api/applications/:id` | Delete an application |

## Database Schema (basically)

- id — auto generated
- companyName — required
- jobTitle — required
- jobType — Internship / Full_time / Part_time
- status — Applied / Interviewing / Offer / Rejected
- appliedDate — required
- notes — optional
- createdAt / updatedAt — handled automatically by Prisma



## Live Demo

