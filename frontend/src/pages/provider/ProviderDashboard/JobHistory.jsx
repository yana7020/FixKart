import { useEffect, useState } from "react"

function JobHistory() {
  const [jobs, setJobs] = useState([])
  const [ratings, setRatings] = useState({})
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    const loadJobs = () => {
      const savedBookings =
        JSON.parse(localStorage.getItem("fixkartBookings")) || []

      const completedJobs = savedBookings.filter(
        (booking) => booking.status === "Completed"
      )

      setJobs(completedJobs)
    }

    loadJobs()

    window.addEventListener("storage", loadJobs)

    return () => {
      window.removeEventListener("storage", loadJobs)
    }
  }, [])

  const handleRating = (jobId, rating) => {
    setRatings((previous) => ({
      ...previous,
      [jobId]: rating,
    }))
  }

  const handleReview = (jobId, review) => {
    setReviews((previous) => ({
      ...previous,
      [jobId]: review,
    }))
  }

  const handleSubmitReview = (job) => {
    const selectedRating = ratings[job.id]
    const selectedReview = reviews[job.id] || ""

    if (!selectedRating) {
      return
    }

    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((item) =>
      item.id === job.id
        ? {
            ...item,
            customerRating: selectedRating,
            customerReview: selectedReview,
            customerReviewSubmitted: true,
          }
        : item
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    setJobs(
      updatedBookings.filter(
        (item) => item.status === "Completed"
      )
    )

    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Job History
          </h1>

          <p className="text-slate-600 mt-2">
            View your previously completed service jobs.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <div className="text-4xl mb-4">
              📋
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Completed Jobs
            </h2>

            <p className="text-slate-500 mt-2">
              Your completed service jobs will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {job.service?.name}
                      </h2>

                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-2">
                      Customer: {job.customer}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {job.date} · {job.time}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      📍 {job.address}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-xs text-slate-500">
                      Amount Earned
                    </p>

                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {job.price}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-200">
                  {job.customerReviewSubmitted ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Your Review for {job.customer}
                      </p>

                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= job.customerRating
                                ? "text-yellow-400 text-xl"
                                : "text-slate-300 text-xl"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {job.customerReview && (
                        <p className="text-sm text-slate-600 mt-3">
                          {job.customerReview}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Rate Your Customer
                      </p>

                      <div className="flex gap-2 mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() =>
                              handleRating(job.id, star)
                            }
                            className={
                              star <= (ratings[job.id] || 0)
                                ? "text-yellow-400 text-2xl"
                                : "text-slate-300 text-2xl hover:text-yellow-300"
                            }
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={reviews[job.id] || ""}
                        onChange={(event) =>
                          handleReview(
                            job.id,
                            event.target.value
                          )
                        }
                        placeholder="Write a review about the customer..."
                        rows="4"
                        className="w-full mt-4 px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 resize-none"
                      />

                      <button
                        onClick={() =>
                          handleSubmitReview(job)
                        }
                        disabled={!ratings[job.id]}
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

export default JobHistory
