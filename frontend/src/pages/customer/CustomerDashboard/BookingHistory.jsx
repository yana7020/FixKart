import { useEffect, useState } from "react"

function BookingHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const loadHistory = () => {
      const savedBookings =
        JSON.parse(localStorage.getItem("fixkartBookings")) || []

      const completedBookings = savedBookings.filter(
        (booking) => booking.status === "Completed"
      )

      setHistory(completedBookings)
    }

    loadHistory()

    window.addEventListener("storage", loadHistory)

    return () => {
      window.removeEventListener("storage", loadHistory)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Booking History
          </h1>

          <p className="text-slate-600 mt-2">
            View your previous service bookings.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-slate-200 text-center">
            <div className="text-4xl mb-4">
              📋
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Completed Bookings
            </h2>

            <p className="text-slate-500 mt-2">
              Your completed service bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {booking.service?.name}
                    </h2>

                    <p className="text-sm text-slate-600 mt-2">
                      Service Provider:{" "}
                      {booking.provider || "Service Provider"}
                    </p>

                    <p className="text-sm text-slate-600 mt-1">
                      Date: {booking.date}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Time: {booking.time}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Booking ID: {booking.id}
                    </p>
                  </div>

                  <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-200">
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistory

