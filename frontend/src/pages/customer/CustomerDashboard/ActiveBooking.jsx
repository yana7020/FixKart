import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ActiveBooking() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)

  const loadBookings = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const activeBookings = savedBookings.filter(
      (booking) =>
        booking.status === "Accepted" &&
        booking.status !== "Completed"
    )

    setBookings(activeBookings)

    if (selectedBooking) {
      const updatedBooking = activeBookings.find(
        (booking) => booking.id === selectedBooking.id
      )

      if (updatedBooking) {
        setSelectedBooking(updatedBooking)
      } else {
        setSelectedBooking(null)
      }
    }
  }

  useEffect(() => {
    loadBookings()

    window.addEventListener("storage", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
    }
  }, [selectedBooking])

  if (selectedBooking) {
    const serviceStatus =
      selectedBooking.serviceStatus || "Accepted"

    const statusSteps = [
      {
        key: "Accepted",
        title: "Booking Accepted",
        description:
          "Your service provider has accepted the request.",
      },
      {
        key: "On the Way",
        title: "Provider is on the way",
        description:
          "Your service provider is travelling to your location.",
      },
      {
        key: "Reached Destination",
        title: "Provider reached destination",
        description:
          "Your service provider has reached your location.",
      },
      {
        key: "Service Started",
        title: "Service started",
        description:
          "Your service provider has started the service.",
      },
      {
        key: "Completed",
        title: "Service completed",
        description:
          "Your service has been completed. Payment is now required.",
      },
    ]

    const currentIndex = statusSteps.findIndex(
      (step) => step.key === serviceStatus
    )

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Active Bookings
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Active Booking
            </h1>

            <p className="text-slate-600 mt-2">
              Track your ongoing service booking.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-64 md:h-80 bg-slate-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">
                  📍
                </div>

                <h2 className="text-lg font-semibold text-slate-700">
                  Service Tracking
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {serviceStatus === "Completed"
                    ? "Service completed. Please complete your payment."
                    : serviceStatus === "On the Way"
                    ? "Your provider is on the way."
                    : serviceStatus === "Reached Destination"
                    ? "Your provider has reached your location."
                    : serviceStatus === "Service Started"
                    ? "Your service is currently in progress."
                    : "Your provider has accepted the booking."}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                      {selectedBooking.service?.icon}
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {selectedBooking.service?.name}
                      </h2>

                      <span
                        className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${
                          serviceStatus === "Completed"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {serviceStatus === "Completed"
                          ? "Awaiting Payment"
                          : serviceStatus}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500">
                    Booking ID: {selectedBooking.id}
                  </p>

                  <p className="text-slate-600 mt-3">
                    Service Provider:{" "}
                    {selectedBooking.provider ||
                      "Rajesh Kumar"}
                  </p>

                  <p className="text-slate-600 mt-2">
                    Date: {selectedBooking.date}
                  </p>

                  <p className="text-slate-600 mt-2">
                    Time: {selectedBooking.time}
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-lg min-w-full md:min-w-64">
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Service Provider
                  </h3>

                  <p className="text-sm text-slate-600">
                    {selectedBooking.provider ||
                      "Rajesh Kumar"}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedBooking.service?.name}
                  </p>

                  {serviceStatus !== "Completed" && (
                    <button
                      onClick={() =>
                        navigate(
                          "/customer/dashboard/messages"
                        )
                      }
                      className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Message Provider
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Service Progress
                </h3>

                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const isCompleted =
                      index <= currentIndex

                    const isCurrent =
                      index === currentIndex

                    return (
                      <div
                        key={step.key}
                        className="flex items-start gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              isCompleted
                                ? step.key === "Completed"
                                  ? "bg-green-600"
                                  : "bg-blue-600"
                                : "bg-slate-300"
                            }`}
                          ></div>

                          {index !==
                            statusSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-10 mt-1 ${
                                index < currentIndex
                                  ? "bg-blue-600"
                                  : "bg-slate-200"
                              }`}
                            ></div>
                          )}
                        </div>

                        <div className="-mt-1">
                          <p
                            className={`font-medium ${
                              isCompleted
                                ? step.key === "Completed"
                                  ? "text-green-600"
                                  : "text-slate-900"
                                : "text-slate-400"
                            }`}
                          >
                            {step.title}

                            {isCurrent &&
                              step.key !== "Completed" && (
                                <span className="ml-2 text-xs font-medium text-blue-600">
                                  Current
                                </span>
                              )}
                          </p>

                          <p
                            className={`text-sm mt-1 ${
                              isCompleted
                                ? "text-slate-500"
                                : "text-slate-400"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {serviceStatus === "Completed" && (
                <div className="mt-8 p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="font-semibold text-yellow-900">
                    Service Completed
                  </p>

                  <p className="text-sm text-yellow-800 mt-2">
                    Your service has been completed. Please
                    complete the payment to finish this booking.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/customer/dashboard/payment", {
                        state: {
                          booking: selectedBooking,
                        },
                      })
                    }
                    className="w-full mt-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Pay Now
                  </button>
                </div>
              )}

              <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-sm text-slate-500">
                  Service Address
                </p>

                <p className="font-medium text-slate-900 mt-2">
                  📍 {selectedBooking.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Active Bookings
          </h1>

          <p className="text-slate-600 mt-2">
            View and track all your ongoing service bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">
              📍
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              No Active Bookings
            </h2>

            <p className="text-slate-500 mt-2">
              Your accepted service bookings will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/customer/dashboard")
              }
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book a Service
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const serviceStatus =
                booking.serviceStatus || "Accepted"

              return (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="w-full text-left bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {booking.service?.icon}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {booking.service?.name}
                        </h2>

                        <p className="text-sm text-slate-600 mt-1">
                          Provider:{" "}
                          {booking.provider ||
                            "Rajesh Kumar"}
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                          {booking.date} • {booking.time}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          📍 {booking.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          serviceStatus === "Completed"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {serviceStatus === "Completed"
                          ? "Awaiting Payment"
                          : serviceStatus}
                      </span>

                      <span className="text-sm font-medium text-blue-600">
                        View Active Booking →
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ActiveBooking