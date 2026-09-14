import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function BookingRequests() {
  const [requests, setRequests] = useState([])
  const navigate = useNavigate()

  const loadBookings = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const pendingRequests = savedBookings.filter(
      (request) => request.status === "Pending"
    )

    setRequests(pendingRequests)
  }

  useEffect(() => {
    loadBookings()

    window.addEventListener("storage", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
    }
  }, [])

  const handleAccept = (id) => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const acceptedBooking = savedBookings.find(
      (booking) => booking.id === id
    )

    const updatedBookings = savedBookings.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            status: "Accepted",
            serviceStatus: "Accepted",
            provider: "Rajesh Kumar",
          }
        : booking
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    setRequests(
      updatedBookings.filter(
        (booking) => booking.status === "Pending"
      )
    )

    window.dispatchEvent(new Event("storage"))

    if (acceptedBooking) {
      navigate("/provider/dashboard/active-job", {
        state: {
          booking: {
            ...acceptedBooking,
            status: "Accepted",
            serviceStatus: "Accepted",
            provider: "Rajesh Kumar",
          },
        },
      })
    }
  }

  const handleReject = (id) => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            status: "Rejected",
          }
        : booking
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    setRequests(
      updatedBookings.filter(
        (booking) => booking.status === "Pending"
      )
    )

    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Booking Requests
          </h1>

          <p className="text-slate-600 mt-2">
            Review new service requests from customers.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <div className="text-4xl mb-4">
              📋
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Pending Requests
            </h2>

            <p className="text-slate-500 mt-2">
              New customer service requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {request.service?.name}
                      </h2>

                      <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>

                    <p className="text-slate-700 mt-3">
                      {request.customer}
                    </p>

                    <div className="flex flex-wrap gap-5 mt-2 text-sm text-slate-500">
                      <span>📍 {request.address}</span>
                      <span>📅 {request.date}</span>
                      <span>🕐 {request.time}</span>
                    </div>

                    <p className="text-sm text-slate-500 mt-3">
                      {request.details}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      Contact: {request.phone}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-500">
                        Estimated Amount
                      </p>

                      <p className="text-xl font-bold text-slate-900">
                        {request.price}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingRequests