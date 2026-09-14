import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  const loadBookings = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const activeBookings = savedBookings.filter(
      (booking) => booking.status !== "Completed"
    )

    setBookings(activeBookings)
  }

  useEffect(() => {
    loadBookings()

    window.addEventListener("storage", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
    }
  }, [])

  const handlePayment = (booking) => {
    navigate("/customer/dashboard/payment", {
      state: { booking },
    })
  }

  const handleViewDetails = (booking) => {
    if (booking.status === "Accepted") {
      navigate("/customer/dashboard/active-booking", {
        state: { booking },
      })
      return
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Bookings
          </h1>

          <p className="text-slate-600 mt-2">
            View and manage your service bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-slate-200 text-center">
            <div className="text-4xl mb-4">
              📋
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Active Bookings
            </h2>

            <p className="text-slate-500 mt-2">
              Your pending and accepted service bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl">
                        {booking.service?.icon}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {booking.service?.name}
                        </h2>

                        <span className="text-xs text-slate-500">
                          Booking ID: {booking.id}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600">
                      Service Provider:{" "}
                      {booking.provider || "Waiting for provider"}
                    </p>

                    <p className="text-sm text-slate-600 mt-1">
                      {booking.date} • {booking.time}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      📍 {booking.address}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      booking.status === "Accepted"
                        ? "bg-green-50 text-green-600"
                        : booking.status === "Rejected"
                        ? "bg-red-50 text-red-600"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {booking.status === "Pending"
                      ? "Pending Provider Approval"
                      : booking.status}
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
                  >
                    {booking.status === "Accepted"
                      ? "View Active Booking"
                      : "View Details"}
                  </button>

                  {booking.status === "Accepted" && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
