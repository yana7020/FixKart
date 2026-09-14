import { useEffect, useState } from "react"

function JobHistory() {
  const [jobs, setJobs] = useState([])

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobHistory
