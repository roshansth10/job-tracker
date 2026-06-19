-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Internship', 'Full-time', 'Part-time');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "status" "Status" NOT NULL,
    "appliedDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
