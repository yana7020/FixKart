import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ServiceIcon({ service }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }

  if (service === "Electrician") {
    return (
      <svg {...common}>
        <path d="M13 2 4.5 13h6L10 22l9.5-13h-6z" />
      </svg>
    )
  }

  if (service === "Plumbing") {
    return (
      <svg {...common}>
        <path d="M7 3v6a5 5 0 0 0 10 0V3" />
        <path d="M7 6H4" />
        <path d="M20 6h-3" />
        <path d="M12 14v7" />
      </svg>
    )
  }

  if (service === "Home Appliance Repair") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M9 17h2" />
        <path d="M13 17h2" />
      </svg>
    )
  }

  if (service === "Home Cleaning") {
    return (
      <svg {...common}>
        <path d="m5 21 5-5" />
        <path d="m9 7 8 8" />
        <path d="m14 3 7 7" />
        <path d="M7 5 3 9l12 12 4-4z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M4 13h16" />
      <path d="M6 13a6 6 0 0 1 12 0" />
      <path d="M7 17h10" />
      <path d="M8 21h8" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function BookingIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  )
}

function TrackIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function DashboardHome() {
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])

  const [profile, setProfile] = useState({
    name: "Yana",
    location: "Kolkata",
  })

  const services = [
    {
      name: "Electrician",
      description: "Electrical repair and installation",
    },
    {
      name: "Plumbing",
      description: "Professional plumbing services",
    },
    {
      name: "Home Appliance Repair",
      description: "Repair your home appliances",
    },
    {
      name: "Home Cleaning",
      description: "Reliable cleaning services",
    },
    {
      name: "Cook",
      description: "Professional cooking services",
    },
  ]

  useEffect(() => {
    const loadData = () => {
      const savedBookings =
        JSON.parse(localStorage.getItem("fixkartBookings")) || []

      const savedProfile =
        JSON.parse(localStorage.getItem("fixkartCustomerProfile")) || {}

      setBookings(savedBookings)

      setProfile({
        name: savedProfile.name || "Yana",
        location: savedProfile.location || "Kolkata",
      })
    }

    loadData()

    window.addEventListener("storage", loadData)
    window.addEventListener("fixkartBookingsUpdated", loadData)
    window.addEventListener("fixkartProfileUpdated", loadData)

    return () => {
      window.removeEventListener("storage", loadData)
      window.removeEventListener("fixkartBookingsUpdated", loadData)
      window.removeEventListener("fixkartProfileUpdated", loadData)
    }
  }, [])

  const handleServiceClick = (service) => {
    navigate("/customer/dashboard/book-service/details", {
      state: { service },
    })
  }

  const recentBookings = bookings
    .filter((booking) => booking.status !== "Completed")
    .slice(-3)
    .reverse()

  const activeBooking = bookings.find(
    (booking) =>
      booking.status === "Accepted" ||
      booking.serviceStatus === "Accepted" ||
      booking.serviceStatus === "On the Way" ||
      booking.serviceStatus === "Reached Destination" ||
      booking.serviceStatus === "Service Started" ||
      booking.serviceStatus === "Service Completed"
  )

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Hello, {profile.name}!
            </h1>

            <p className="text-slate-600 mt-2">
              What service do you need today?
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 min-w-56 shadow-sm">
            <p className="text-xs text-slate-500">
              Your Location
            </p>

            <div className="flex items-center gap-2 text-slate-900 mt-2">
              <span className="text-blue-600">
                <LocationIcon />
              </span>

              <p className="text-sm font-semibold">
                {profile.location}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Services
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Choose a service to get started
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {services.map((service) => (
              <button
                key={service.name}
                onClick={() => handleServiceClick(service)}
                className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md hover:border-blue-300 transition"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <ServiceIcon service={service.name} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {service.description}
                </p>

                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 mt-4">
                  <span>Book Now</span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  My Bookings
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your recent service bookings
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/customer/dashboard/bookings")
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            {recentBookings.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <BookingIcon />
                </div>

                <h3 className="font-semibold text-slate-900">
                  No Active Bookings
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Your pending and accepted bookings will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                            <ServiceIcon
                              service={booking.service?.name}
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {booking.service?.name}
                            </h3>

                            <p className="text-sm text-slate-600 mt-1">
                              {booking.provider ||
                                "Waiting for provider"}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-500 mt-3">
                          {booking.date} • {booking.time}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Accepted"
                            ? "bg-green-50 text-green-600"
                            : booking.status === "Rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {booking.status === "Pending"
                          ? "Pending"
                          : booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Track Your Service
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Track your active service provider
              </p>
            </div>

            {!activeBooking ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <TrackIcon />
                </div>

                <h3 className="font-semibold text-slate-900">
                  No Active Service
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Your accepted service will appear here.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-slate-100 flex items-center justify-center">
                  <div className="text-center text-slate-600">
                    <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm mb-3">
                      <TrackIcon />
                    </div>

                    <p className="font-medium">
                      Service Location
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Live tracking will appear here
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Service Provider
                      </p>

                      <h3 className="font-semibold text-slate-900 mt-1">
                        {activeBooking.provider ||
                          "Rajesh Kumar"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {activeBooking.service?.name}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {activeBooking.date} • {activeBooking.time}
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      {activeBooking.serviceStatus ||
                        activeBooking.status}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        "/customer/dashboard/active-booking",
                        {
                          state: {
                            booking: activeBooking,
                          },
                        }
                      )
                    }
                    className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Track Service
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