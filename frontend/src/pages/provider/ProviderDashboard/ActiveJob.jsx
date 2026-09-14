import { useEffect, useState } from "react"

function ActiveJob() {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)

  const loadActiveJobs = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const activeJobs = savedBookings.filter(
      (booking) => booking.status === "Accepted"
    )

    setBookings(activeJobs)

    if (selectedBooking) {
      const updatedBooking = activeJobs.find(
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
    loadActiveJobs()

    window.addEventListener("storage", loadActiveJobs)

    return () => {
      window.removeEventListener("storage", loadActiveJobs)
    }
  }, [selectedBooking])

  const updateServiceStatus = (serviceStatus) => {
    if (!selectedBooking) {
      return
    }

    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((booking) =>
      booking.id === selectedBooking.id
        ? {
            ...booking,
            serviceStatus,
          }
        : booking
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    const updatedBooking = updatedBookings.find(
      (booking) => booking.id === selectedBooking.id
    )

    setSelectedBooking(updatedBooking)

    setBookings(
      updatedBookings.filter(
        (booking) => booking.status === "Accepted"
      )
    )

    window.dispatchEvent(new Event("storage"))
  }

  const handleCompleteJob = () => {
    if (!selectedBooking) {
      return
    }

    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((booking) =>
      booking.id === selectedBooking.id
        ? {
            ...booking,
            status: "Accepted",
            serviceStatus: "Completed",
          }
        : booking
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    const updatedBooking = updatedBookings.find(
      (booking) => booking.id === selectedBooking.id
    )

    setSelectedBooking(updatedBooking)

    setBookings(
      updatedBookings.filter(
        (booking) => booking.status === "Accepted"
      )
    )

    window.dispatchEvent(new Event("storage"))
  }

  if (selectedBooking) {
    const currentStatus =
      selectedBooking.serviceStatus || "Accepted"

    return (
      <div className="p-6 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedBooking(null)}
            className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Active Jobs
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Active Job
            </h1>

            <p className="text-slate-600 mt-2">
              Manage your currently active service.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="h-72 bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">
                    📍
                  </div>

                  <h2 className="font-semibold text-slate-800">
                    Service Location
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedBooking.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Customer
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedBooking.customer}
                  </h2>

                  <p className="text-slate-600 mt-1">
                    {selectedBooking.service?.name}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentStatus === "Completed"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {currentStatus === "Completed"
                    ? "Awaiting Payment"
                    : currentStatus}
                </span>
              </div>

              <div className="space-y-4 mt-7">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {selectedBooking.address}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500">
                    Scheduled Time
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {selectedBooking.date} •{" "}
                    {selectedBooking.time}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500">
                    Estimated Amount
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {selectedBooking.price}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Service Progress
                </h3>

                <div className="space-y-4">
                  {[
                    "Accepted",
                    "On the Way",
                    "Reached Destination",
                    "Service Started",
                    "Completed",
                  ].map((status, index) => {
                    const statuses = [
                      "Accepted",
                      "On the Way",
                      "Reached Destination",
                      "Service Started",
                      "Completed",
                    ]

                    const currentIndex =
                      statuses.indexOf(currentStatus)

                    const isCompleted =
                      index <= currentIndex

                    return (
                      <div
                        key={status}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isCompleted
                              ? status === "Completed"
                                ? "bg-green-600"
                                : "bg-blue-600"
                              : "bg-slate-300"
                          }`}
                        ></div>

                        <span
                          className={`text-sm ${
                            isCompleted
                              ? status === "Completed"
                                ? "text-green-600"
                                : "text-slate-700"
                              : "text-slate-400"
                          }`}
                        >
                          {status === "Reached Destination"
                            ? "Reached Customer"
                            : status === "Service Started"
                            ? "Service Started"
                            : status === "On the Way"
                            ? "On the Way"
                            : status === "Accepted"
                            ? "Booking Accepted"
                            : "Service Completed"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {currentStatus !== "Completed" && (
                <div className="space-y-3 mt-7">
                  {currentStatus === "Accepted" && (
                    <button
                      onClick={() =>
                        updateServiceStatus("On the Way")
                      }
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Start Journey
                    </button>
                  )}

                  {currentStatus === "On the Way" && (
                    <button
                      onClick={() =>
                        updateServiceStatus(
                          "Reached Destination"
                        )
                      }
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Reached Customer
                    </button>
                  )}

                  {currentStatus === "Reached Destination" && (
                    <button
                      onClick={() =>
                        updateServiceStatus(
                          "Service Started"
                        )
                      }
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Start Service
                    </button>
                  )}

                  {currentStatus === "Service Started" && (
                    <button
                      onClick={handleCompleteJob}
                      className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                      Complete Job
                    </button>
                  )}
                </div>
              )}

              {currentStatus === "Completed" && (
                <div className="mt-7 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                  <p className="font-semibold text-yellow-900">
                    Service Completed
                  </p>

                  <p className="text-sm text-yellow-800 mt-2">
                    The customer needs to complete the payment
                    before this job moves to Job History.
                  </p>
                </div>
              )}

              <button
                onClick={() =>
                  window.location.href =
                    "/provider/dashboard/messages"
                }
                className="w-full mt-3 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
              >
                Message Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Active Jobs
          </h1>

          <p className="text-slate-600 mt-2">
            View and manage all your accepted service jobs.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">
              📋
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              No Active Jobs
            </h1>

            <p className="text-slate-600 mt-2">
              There are currently no accepted bookings assigned
              to you.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const currentStatus =
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
                          Customer: {booking.customer}
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
                          currentStatus === "Completed"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {currentStatus === "Completed"
                          ? "Awaiting Payment"
                          : currentStatus}
                      </span>

                      <span className="text-sm font-medium text-blue-600">
                        View Active Job →
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

export default ActiveJob