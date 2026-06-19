# Job Application Tracker

A full-stack web app to track job applications through different hiring stages — built for the InternSathi Full Stack Internship task.

## Overview

Lets a user record job applications with company name, job title, job type, status, applied date, and notes. Supports adding, editing, deleting, filtering by status, and searching applications.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (REST)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 7

## Features

- View all applications in a table
- Add a new application with form validation
- Edit an existing application
- Delete an application with a confirmation dialog
- Filter by status (Applied, Interviewing, Offer, Rejected)
- Search by company name or job title
- Loading and error states
- Fully typed with TypeScript

## Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

## Installation

1. Clone the repo

\`\`\`bash
git clone https://github.com/roshansth10/job-tracker.git
cd job-tracker
\`\`\`

2. Install dependencies

\`\`\`bash
npm install
\`\`\`

3. Set up environment variables

\`\`\`bash
cp .env.example .env
\`\`\`

\`.env.example\`:

\`\`\`env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
\`\`\`

4. Run migrations

\`\`\`bash
npx prisma migrate dev
npx prisma generate
\`\`\`

5. Start the dev server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Database Schema

\`prisma/schema.prisma\`:

\`\`\`prisma
model JobApplication {
  id          String   @id @default(cuid())
  company     String
  jobTitle    String
  jobType     String
  status      String
  appliedDate DateTime
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
\`\`\`

## API Endpoints
| Method | Endpoint                | Description           |
|--------|--------------------------|------------------------|
| GET    | \`/api/applications\`      | Get all applications   |
| POST   | \`/api/applications\`      | Create an application  |
| PATCH  | \`/api/applications/:id\`  | Update an application  |
| DELETE | \`/api/applications/:id\`  | Delete an application  |


## Author
Roshan Shrestha 
