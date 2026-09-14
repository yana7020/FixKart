function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message:
        "Your electrician booking has been confirmed by Rajesh Kumar.",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Provider Accepted Your Request",
      message:
        "Amit Sharma has accepted your home cleaning request.",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "Service Reminder",
      message:
        "Your home cleaning service is scheduled for tomorrow.",
      time: "Yesterday",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="text-slate-600 mt-2">
            Stay updated with your bookings and services.
          </p>
        </div>

        <div className="space-y-4">

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >

              <div className="flex items-start gap-4">

                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>

                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                    <h2 className="text-lg font-semibold text-slate-900">
                      {notification.title}
                    </h2>

                    <span className="text-xs text-slate-500">
                      {notification.time}
                    </span>

                  </div>

                  <p className="text-sm text-slate-600 mt-2">
                    {notification.message}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Notifications