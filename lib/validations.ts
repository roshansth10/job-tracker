import { z } from "zod";

export const applicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobType: z.enum(["Internship", "Full_time", "Part_time"]),
  status: z.enum(["Applied", "Interviewing", "Offer", "Rejected"]),
  appliedDate: z.coerce.date(),
  notes: z.string().nullable().optional(),
});

export const applicationUpdateSchema = applicationSchema.partial();
