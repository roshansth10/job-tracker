"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400";

  return (
    <div className="flex gap-3 flex-wrap">
      <select
        value={status}
        onChange={(e) => updateParams("status", e.target.value)}
        className={inputClass}
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="text"
        placeholder="Search company or title..."
        value={search}
        onChange={(e) => updateParams("search", e.target.value)}
        className={`${inputClass} w-56`}
      />
    </div>
  );
}