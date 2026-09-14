import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
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
    window.addEventListener("fixkartBookingsUpdated", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
      window.removeEventListener(
        "fixkartBookingsUpdated",
        loadBookings
      )
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

    setSelectedBooking(booking)
  }

  const handleDelete = (id) => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.filter(
      (booking) => booking.id !== id
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    setSelectedBooking(null)
    loadBookings()

    window.dispatchEvent(new Event("fixkartBookingsUpdated"))
  }

  const getStatusStyle = (status) => {
    if (status === "Accepted") {
      return "bg-green-50 text-green-600"
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-600"
    }

    if (
      status === "On the Way" ||
      status === "Reached Destination" ||
      status === "Service Started"
    ) {
      return "bg-blue-50 text-blue-600"
    }

    return "bg-yellow-50 text-yellow-700"
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
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
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
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
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
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                      booking.status
                    )}`}
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

                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedBooking(null)}
          ></div>

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                    {selectedBooking.service?.icon}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedBooking.service?.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Booking ID: {selectedBooking.id}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Close details"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <span
                className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                  selectedBooking.status
                )}`}
              >
                {selectedBooking.status === "Pending"
                  ? "Pending Provider Approval"
                  : selectedBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Customer Name
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.customer}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Phone Number
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.phone}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Service Provider
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.provider || "Waiting for provider"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Service Price
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.price}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Preferred Date
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.date}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Preferred Time
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.time}
                </p>
              </div>

              <div className="md:col-span-2 bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Service Address
                </p>

                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedBooking.address}
                </p>
              </div>

              <div className="md:col-span-2 bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Additional Details
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  {selectedBooking.details || "No additional details provided."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 mt-7 pt-6 border-t border-slate-200">
              {selectedBooking.status === "Accepted" && (
                <button
                  onClick={() => handlePayment(selectedBooking)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Pay Now
                </button>
              )}

              <button
                onClick={() => handleDelete(selectedBooking.id)}
                className="px-5 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition"
              >
                Delete Booking
              </button>

              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings