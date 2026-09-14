import { useEffect, useState } from "react"

function BookingHistory() {
  const [history, setHistory] = useState([])
  const [ratings, setRatings] = useState({})
  const [reviews, setReviews] = useState({})

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

  const handleRating = (bookingId, rating) => {
    setRatings((previous) => ({
      ...previous,
      [bookingId]: rating,
    }))
  }

  const handleReview = (bookingId, review) => {
    setReviews((previous) => ({
      ...previous,
      [bookingId]: review,
    }))
  }

  const handleSubmitReview = (booking) => {
    const selectedRating = ratings[booking.id]
    const selectedReview = reviews[booking.id] || ""

    if (!selectedRating) {
      return
    }

    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((item) =>
      item.id === booking.id
        ? {
            ...item,
            providerRating: selectedRating,
            providerReview: selectedReview,
            providerReviewSubmitted: true,
          }
        : item
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    setHistory(
      updatedBookings.filter(
        (item) => item.status === "Completed"
      )
    )

    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Booking History
          </h1>

          <p className="text-slate-600 mt-2">
            View your previous service bookings and rate your service providers.
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
                  {booking.providerReviewSubmitted ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Your Review
                      </p>

                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= booking.providerRating
                                ? "text-yellow-400 text-xl"
                                : "text-slate-300 text-xl"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {booking.providerReview && (
                        <p className="text-sm text-slate-600 mt-3">
                          {booking.providerReview}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Rate Your Service Provider
                      </p>

                      <div className="flex gap-2 mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() =>
                              handleRating(booking.id, star)
                            }
                            className={
                              star <= (ratings[booking.id] || 0)
                                ? "text-yellow-400 text-2xl"
                                : "text-slate-300 text-2xl hover:text-yellow-300"
                            }
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={reviews[booking.id] || ""}
                        onChange={(event) =>
                          handleReview(
                            booking.id,
                            event.target.value
                          )
                        }
                        placeholder="Write a review about the service provider..."
                        rows="4"
                        className="w-full mt-4 px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 resize-none"
                      />

                      <button
                        onClick={() =>
                          handleSubmitReview(booking)
                        }
                        disabled={!ratings[booking.id]}
                        className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                      >
                        Submit Review
                      </button>
                    </div>
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

export default BookingHistory
