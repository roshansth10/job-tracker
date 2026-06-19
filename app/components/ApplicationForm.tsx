"use client";

import { useState } from "react";
import { Application } from "./ApplicationList";

interface ApplicationFormProps {
  existing: Application | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormErrors {
  companyName?: string;
  jobTitle?: string;
  appliedDate?: string;
}

function toDateInputValue(isoDate: string): string {
  return new Date(isoDate).toISOString().split("T")[0];
}

export default function ApplicationForm({
  existing,
  onClose,
  onSaved,
}: ApplicationFormProps) {
  const [companyName, setCompanyName] = useState(existing?.companyName ?? "");
  const [jobTitle, setJobTitle] = useState(existing?.jobTitle ?? "");
  const [jobType, setJobType] = useState(existing?.jobType ?? "Internship");
  const [status, setStatus] = useState(existing?.status ?? "Applied");
  const [appliedDate, setAppliedDate] = useState(
    existing ? toDateInputValue(existing.appliedDate) : ""
  );
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 5 characters.";
    }
    if (jobTitle.trim().length === 0) {
      newErrors.jobTitle = "Job title is required.";
    }
    if (!appliedDate) {
      newErrors.appliedDate = "Applied date is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const url = existing
        ? `/api/applications/${existing.id}`
        : "/api/applications";
      const method = existing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          jobTitle: jobTitle.trim(),
          jobType,
          status,
          appliedDate,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Server rejected the request");
      }

      onSaved();
    } catch (err) {
      console.error("Save failed:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
  "mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {existing ? "Edit Application" : "Add Application"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none transition"
          >
            &times;
          </button>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputClass}
              placeholder="e.g. ARgen"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. Backend Developer Intern"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type *
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className={inputClass}
              >
                <option value="Internship">Internship</option>
                <option value="Full_time">Full-time</option>
                <option value="Part_time">Part-time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applied Date *
            </label>
            <input
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              className={inputClass}
            />
            {errors.appliedDate && (
              <p className="text-red-500 text-xs mt-1">{errors.appliedDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
             className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50 transition"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}