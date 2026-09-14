import { useState } from "react"
import { Outlet } from "react-router-dom"

import CustomerSidebar from "./CustomerSidebar"

function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden md:block">
        <CustomerSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-64">
            <CustomerSidebar
              onNavigate={() => setSidebarOpen(false)}
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-4 text-xl text-slate-600 hover:text-blue-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-slate-700 hover:text-blue-600 transition"
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <h1 className="text-xl font-bold text-blue-600 mx-auto">
            FixKart
          </h1>

          <div className="w-7"></div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default CustomerDashboard