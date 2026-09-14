import { NavLink } from "react-router-dom"

function Icon({ type }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }

  const icons = {
    dashboard: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    bookings: (
      <svg {...common}>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    ),
    active: (
      <svg {...common}>
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    history: (
      <svg {...common}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 5v5h5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    messages: (
      <svg {...common}>
        <path d="M4 5h16v11H8l-4 4z" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
      </svg>
    ),
    notifications: (
      <svg {...common}>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    ),
    profile: (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
    logout: (
      <svg {...common}>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </svg>
    ),
  }

  return icons[type]
}

function CustomerSidebar({ onNavigate }) {
  const menuItems = [
    { path: "/customer/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/customer/dashboard/bookings", label: "My Bookings", icon: "bookings" },
    { path: "/customer/dashboard/active-booking", label: "Active Booking", icon: "active" },
    { path: "/customer/dashboard/booking-history", label: "Booking History", icon: "history" },
    { path: "/customer/dashboard/messages", label: "Messages", icon: "messages" },
    { path: "/customer/dashboard/notifications", label: "Notifications", icon: "notifications" },
    { path: "/customer/dashboard/profile", label: "Profile", icon: "profile" },
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
            <Icon type={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-5 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 text-left transition">
          <Icon type="logout" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default CustomerSidebar