"use client";

import { Application } from "./ApplicationList";

interface ViewDialogProps {
  app: Application;
  onClose: () => void;
}

export default function ViewDialog({ app, onClose }: ViewDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {app.companyName}
        </h2>
        <dl className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Job Title</dt>
            <dd>{app.jobTitle}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Job Type</dt>
            <dd>{app.jobType.replace("_", " ")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Status</dt>
            <dd>{app.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Applied Date</dt>
            <dd>{new Date(app.appliedDate).toLocaleDateString()}</dd>
          </div>
          {app.notes && (
            <div>
              <dt className="font-medium text-gray-500 mb-1">Notes</dt>
              <dd className="whitespace-pre-wrap">{app.notes}</dd>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <dt className="font-medium text-gray-500">Created</dt>
            <dd>{new Date(app.createdAt).toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Updated</dt>
            <dd>{new Date(app.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}