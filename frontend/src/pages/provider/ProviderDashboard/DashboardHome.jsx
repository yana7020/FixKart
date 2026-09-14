function DashboardHome() {
  const stats = [
    {
      title: "Today's Jobs",
      value: "3",
      icon: "📋",
    },
    {
      title: "Pending Requests",
      value: "5",
      icon: "🔔",
    },
    {
      title: "Completed Jobs",
      value: "28",
      icon: "✓",
    },
    {
      title: "This Month",
      value: "₹18,500",
      icon: "₹",
    },
  ]

  const requests = [
    {
      service: "Electrical Repair",
      customer: "Rahul Sharma",
      location: "Kolkata",
      time: "Today, 11:00 AM",
      price: "₹500",
    },
    {
      service: "AC Repair",
      customer: "Priya Singh",
      location: "Kolkata",
      time: "Today, 2:30 PM",
      price: "₹700",
    },
  ]

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Hello, Rajesh 👋
          </h1>

          <p className="text-slate-600 mt-2">
            Manage your services and bookings from here.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
          <p className="text-xs text-slate-500">
            Your Status
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

            <p className="text-sm font-semibold text-slate-900">
              Available
            </p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
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

              <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center text-xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Booking Requests
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                New service requests from customers
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={`${request.customer}-${request.time}`}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {request.service}
                      </h3>

                      <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-3">
                      {request.customer}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      📍 {request.location}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {request.time}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {request.price}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Estimated
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                    Accept
                  </button>

                  <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                  Customer location will appear here
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
                    Amit Verma
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Electrical Repair
                  </p>
                </div>

                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                  Accepted
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">
                    Scheduled
                  </p>

                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    10:00 AM
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    Kolkata
                  </p>
                </div>
              </div>

              <button className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                View Active Job
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardHome