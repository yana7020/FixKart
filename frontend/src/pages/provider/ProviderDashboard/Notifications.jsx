function Notifications() {
  const notifications = [
    {
      title: "New booking request",
      message: "You received a new electrical repair request.",
      time: "10 minutes ago",
    },
    {
      title: "Booking accepted",
      message: "Your booking with Amit Verma has been confirmed.",
      time: "1 hour ago",
    },
    {
      title: "Payment received",
      message: "Payment for your completed job has been received.",
      time: "Yesterday",
    },
  ]

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
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
            key={notification.title}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex gap-4"
          >
            <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl shrink-0">
              🔔
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-slate-900">
                {notification.title}
              </h2>

              <p className="text-sm text-slate-600 mt-1">
                {notification.message}
              </p>

              <p className="text-xs text-slate-400 mt-2">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications