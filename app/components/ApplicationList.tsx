"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import ApplicationForm from "./ApplicationForm";
import ConfirmDialog from "./ConfirmDialog";

export interface Application {
  id: string;
  companyName: string;
  jobTitle: string;
  jobType: string;
  status: string;
  appliedDate: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationList() {
  const searchParams = useSearchParams();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const statusFilter = searchParams.get("status") || "";
  const searchText = searchParams.get("search") || "";

  const fetchApps = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (searchText) params.set("search", searchText);
      const res = await fetch(`/api/applications?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setApps(data);
    } catch (err) {
      console.error(err);
      setError("Could not load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/applications/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchApps();
    } catch (err) {
      console.error(err);
      setError("Failed to delete application.");
    }
  };

  const statusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-slate-100 text-slate-700 border border-slate-200";
    case "Interviewing":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "Offer":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Rejected":
      return "bg-rose-50 text-rose-700 border border-rose-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};
   
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <FilterBar />
        <button
          onClick={() => {
            setEditApp(null);
            setFormOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 whitespace-nowrap"
        >
          + Add Application
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && apps.length === 0 && !error && (
        <p className="text-gray-500">
          No applications found. Add your first one!
        </p>
      )}

      {!loading && apps.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-sm border border-gray-200 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Applied
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {app.companyName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {app.jobTitle}{" "}
                    <span className="text-xs text-gray-500">
                      ({app.jobType.replace("_", " ")})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-right space-x-3">
                    <button
                      onClick={() => {
                        setEditApp(app);
                        setFormOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(app.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <ApplicationForm
          existing={editApp}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            fetchApps();
          }}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this application? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}