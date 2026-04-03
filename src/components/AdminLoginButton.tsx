"use client";

import { useState } from "react";
import { useAdmin } from "./AdminProvider";

export function AdminLoginButton() {
  const { isAdmin, login, logout } = useAdmin();
  const [showInput, setShowInput] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-medium">
          Edit Mode
        </span>
        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-full bg-zinc-200 text-zinc-600 text-xs font-medium hover:bg-zinc-300 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="fixed bottom-4 right-4 z-50 w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 transition-colors flex items-center justify-center opacity-30 hover:opacity-100"
        title="Admin"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-zinc-200 p-3 flex items-center gap-2">
      <input
        type="password"
        value={pw}
        onChange={(e) => { setPw(e.target.value); setError(false); }}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            setLoading(true);
            const ok = await login(pw);
            setLoading(false);
            if (!ok) setError(true);
            else { setShowInput(false); setPw(""); }
          }
        }}
        placeholder="Password"
        className={`w-32 px-3 py-1.5 text-sm rounded-lg border ${error ? "border-red-400" : "border-zinc-200"} focus:outline-none focus:ring-2 focus:ring-blue-300`}
        autoFocus
        disabled={loading}
      />
      <button
        onClick={() => { setShowInput(false); setPw(""); setError(false); }}
        className="text-zinc-400 hover:text-zinc-600 text-sm"
      >
        &times;
      </button>
    </div>
  );
}
