import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function DashboardHome() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    location: "",
  })

  const [services, setServices] = useState([])
  const [bookings, setBookings] = useState([])

  const loadDashboard = () => {
    const savedProfile =
      JSON.parse(localStorage.getItem("fixkartProviderProfile")) || {}

    const savedServices =
      JSON.parse(localStorage.getItem("fixkartProviderServices")) || []

    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    setProfile({
      name: savedProfile.name || "Rajesh Kumar",
      location: savedProfile.location || "",
    })

    setServices(savedServices)
    setBookings(savedBookings)
  }

  useEffect(() => {
    loadDashboard()

    window.addEventListener("storage", loadDashboard)
    window.addEventListener("fixkartBookingsUpdated", loadDashboard)
    window.addEventListener(
      "fixkartProviderServicesUpdated",
      loadDashboard
    )
    window.addEventListener("fixkartProfileUpdated", loadDashboard)

    return () => {
      window.removeEventListener("storage", loadDashboard)
      window.removeEventListener(
        "fixkartBookingsUpdated",
        loadDashboard
      )
      window.removeEventListener(
        "fixkartProviderServicesUpdated",
        loadDashboard
      )
      window.removeEventListener(
        "fixkartProfileUpdated",
        loadDashboard
      )
    }
  }, [])

  const normalize = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()

  const providerLocation = normalize(profile.location)

  const matchingBookings = bookings.filter((booking) => {
    const sameLocation =
      providerLocation &&
      normalize(booking.customerLocation) === providerLocation

    const serviceMatch = services.some(
      (service) =>
        normalize(service) === normalize(booking.service?.name)
    )

    return sameLocation && serviceMatch
  })

  const pendingRequests = matchingBookings.filter(
    (booking) => booking.status === "Pending"
  )

  const completedBookings = matchingBookings.filter(
    (booking) => booking.status === "Completed"
  )

  const activeBookings = matchingBookings.filter((booking) =>
    [
      "Accepted",
      "On the Way",
      "Reached Destination",
      "Service Started",
    ].includes(booking.status)
  )

  const getBookingDate = (booking) => {
    const date =
      booking.completedAt ||
      booking.paidAt ||
      booking.updatedAt ||
      booking.createdAt

    return date ? new Date(date) : null
  }

  const today = new Date()

  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const isThisMonth = (date) =>
    date &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const todaysJobs = completedBookings.filter((booking) =>
    isToday(getBookingDate(booking))
  ).length

  const overallEarnings = completedBookings.reduce(
    (total, booking) => {
      const amount = Number(
        String(booking.price || "0").replace(/[^\d.]/g, "")
      )

      return total + amount
    },
    0
  )

  const thisMonthEarnings = completedBookings
    .filter((booking) => isThisMonth(getBookingDate(booking)))
    .reduce((total, booking) => {
      const amount = Number(
        String(booking.price || "0").replace(/[^\d.]/g, "")
      )

      return total + amount
    }, 0)

  const activeJob = activeBookings[0]

  const stats = [
    {
      title: "Today's Jobs",
      value: todaysJobs,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <path d="m8 15 2 2 5-5" />
        </svg>
      ),
    },
    {
      title: "Pending Requests",
      value: pendingRequests.length,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      ),
    },
    {
      title: "Completed Jobs",
      value: completedBookings.length,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      title: "This Month",
      value: `₹${thisMonthEarnings.toLocaleString("en-IN")}`,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20" />
          <path d="M17 6.5c-.8-1-2.2-1.5-4-1.5-2.2 0-4 1.2-4 3s1.8 3 4 3 4 1.2 4 3-1.8 3-4 3c-1.8 0-3.2-.5-4-1.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Hello, {profile.name}
            </h1>

            <p className="text-slate-600 mt-2">
              Manage your services and bookings from here.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
            <p className="text-xs text-slate-500">
              Your Location
            </p>

            <div className="flex items-center gap-2 mt-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <p className="text-sm font-semibold text-slate-900">
                {profile.location || "Location not set"}
              </p>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Overall Earnings
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-2">
              ₹{overallEarnings.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Earnings from completed services
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              My Services
            </p>

            {services.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-slate-500">
                  No services selected yet.
                </p>

                <button
                  onClick={() => navigate("/provider/service-setup")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
                >
                  Set up services
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Booking Requests
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Matching requests from customers
                </p>
              </div>

              {pendingRequests.length > 0 && (
                <button
                  onClick={() =>
                    navigate("/provider/dashboard/booking-requests")
                  }
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              )}
            </div>

            {pendingRequests.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 6h13" />
                    <path d="M8 12h13" />
                    <path d="M8 18h13" />
                    <path d="M3 6h.01" />
                    <path d="M3 12h.01" />
                    <path d="M3 18h.01" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-4">
                  No Pending Requests
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Matching customer requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {request.service?.name}
                          </h3>

                          <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 mt-3">
                          {request.customer}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                          <span>{request.address}</span>
                          <span>{request.date}</span>
                          <span>{request.time}</span>
                        </div>
                      </div>

                      <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
                        {request.price}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/provider/dashboard/booking-requests")
                      }
                      className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      View Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Active Job
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your currently accepted service
              </p>
            </div>

            {!activeJob ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-4">
                  No Active Job
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Accepted services will appear here.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-40 bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>

                    <p className="font-medium text-slate-700 mt-2">
                      Service Location
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {activeJob.address}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Customer
                      </p>

                      <h3 className="font-semibold text-slate-900 mt-1">
                        {activeJob.customer}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {activeJob.service?.name}
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      {activeJob.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">
                        Scheduled
                      </p>

                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {activeJob.time}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">
                        Location
                      </p>

                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {activeJob.customerLocation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/provider/dashboard/active-job")
                    }
                    className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View Active Job
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome