import { useState } from "react"
import { Outlet } from "react-router-dom"

import ProviderSidebar from "./ProviderSidebar"

function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden md:block">
        <ProviderSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-64">
            <ProviderSidebar
              onNavigate={() => setSidebarOpen(false)}
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:text-blue-600 shadow-sm transition"
              aria-label="Close sidebar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
            aria-label="Open sidebar"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          <h1 className="text-xl font-bold text-blue-600 mx-auto">
            FixKart
          </h1>

          <div className="w-9"></div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default ProviderDashboard