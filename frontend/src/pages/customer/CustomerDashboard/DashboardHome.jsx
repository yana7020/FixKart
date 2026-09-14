import { useNavigate } from "react-router-dom"

function DashboardHome() {
  const navigate = useNavigate()

  const services = [
    {
      name: "Electrician",
      description: "Electrical repair and installation",
      icon: "⚡",
    },
    {
      name: "Plumbing",
      description: "Professional plumbing services",
      icon: "🔧",
    },
    {
      name: "Home Appliance Repair",
      description: "Repair your home appliances",
      icon: "🛠️",
    },
    {
      name: "Home Cleaning",
      description: "Reliable cleaning services",
      icon: "🧹",
    },
    {
      name: "Cook",
      description: "Professional cooking services",
      icon: "👨‍🍳",
    },
  ]

  const bookings = [
    {
      service: "Electrical Repair",
      provider: "Rajesh Kumar",
      date: "Today, 10:00 AM",
      status: "Confirmed",
    },
    {
      service: "Home Cleaning",
      provider: "Sunita Sharma",
      date: "Tomorrow, 2:00 PM",
      status: "Pending",
    },
  ]

  const handleServiceClick = (service) => {
    navigate("/customer/dashboard/book-service/details", {
      state: { service },
    })
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Hello, Yana 👋
            </h1>

            <p className="text-slate-600 mt-2">
              What service do you need today?
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-500">
              Your Location
            </p>

            <p className="text-sm font-semibold text-slate-900 mt-1">
              📍 Kolkata
            </p>
          </div>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Services
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Choose a service to get started
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {services.map((service) => (
              <button
                key={service.name}
                onClick={() => handleServiceClick(service)}
                className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md hover:border-blue-300 transition"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mb-4">
                  {service.icon}
                </div>

                <h3 className="font-semibold text-slate-900">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {service.description}
                </p>

                <p className="text-sm font-medium text-blue-600 mt-4">
                  Book Now →
                </p>
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
                onClick={() => navigate("/customer/dashboard/bookings")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={`${booking.service}-${booking.date}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {booking.service}
                      </h3>

                      <p className="text-sm text-slate-600 mt-2">
                        {booking.provider}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {booking.date}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    📍
                  </div>

                  <p className="font-medium text-slate-700">
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
                      Rajesh Kumar
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Electrical Repair
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    On the way
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate("/customer/dashboard/active-booking")
                  }
                  className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Track Service
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome