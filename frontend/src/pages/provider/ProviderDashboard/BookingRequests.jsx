import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function BookingRequests() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const loadBookings = () => {
      const savedBookings =
        JSON.parse(localStorage.getItem("fixkartBookings")) || []

      setRequests(savedBookings)
    }

    loadBookings()

    window.addEventListener("storage", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
    }
  }, [])

  const handleAccept = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? {
            ...request,
            status: "Accepted",
            provider: "Rajesh Kumar",
          }
        : request
    )

    setRequests(updatedRequests)

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedRequests)
    )
  }

  const handleReject = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? {
            ...request,
            status: "Rejected",
          }
        : request
    )

    setRequests(updatedRequests)

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedRequests)
    )
  }

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  )

  const processedRequests = requests.filter(
    (request) => request.status !== "Pending"
  )

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

        {pendingRequests.length === 0 ? (
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
            {pendingRequests.map((request) => (
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

        {processedRequests.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Processed Requests
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Requests you have already responded to.
              </p>
            </div>

            <div className="space-y-4">
              {processedRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {request.service?.name}
                      </h3>

                      <p className="text-sm text-slate-600 mt-1">
                        {request.customer}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {request.date} · {request.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === "Accepted"
                            ? "bg-green-50 text-green-600"
                            : request.status === "Completed"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {request.status}
                      </span>

                      {request.status === "Accepted" && (
                        <button
                          onClick={() =>
                            navigate("/provider/dashboard/active-job", {
                              state: { booking: request },
                            })
                          }
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Active Job →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BookingRequests

