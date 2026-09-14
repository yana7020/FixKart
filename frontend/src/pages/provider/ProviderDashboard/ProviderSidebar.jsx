import { NavLink } from "react-router-dom"

function ProviderSidebar({ onNavigate }) {
  const menuItems = [
    {
      path: "/provider/dashboard",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      path: "/provider/dashboard/booking-requests",
      label: "Booking Requests",
      icon: "📋",
    },
    {
      path: "/provider/dashboard/active-job",
      label: "Active Job",
      icon: "📍",
    },
    {
      path: "/provider/dashboard/job-history",
      label: "Job History",
      icon: "🕘",
    },
    {
      path: "/provider/dashboard/messages",
      label: "Messages",
      icon: "💬",
    },
    {
      path: "/provider/dashboard/notifications",
      label: "Notifications",
      icon: "🔔",
    },
    {
      path: "/provider/dashboard/profile",
      label: "Profile",
      icon: "👤",
    },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-blue-600">
          FixKart
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Home services made easy
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-5 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 text-left transition">
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  )
}

export default ProviderSidebar