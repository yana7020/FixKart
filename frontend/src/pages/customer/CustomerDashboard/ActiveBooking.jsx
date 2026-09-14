function ActiveBooking() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Active Booking
          </h1>

          <p className="text-slate-600 mt-2">
            Track your ongoing service booking.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Electrician Service
                </h2>

                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                  Accepted
                </span>
              </div>

              <p className="text-slate-600">
                Booking ID: BK001
              </p>

              <p className="text-slate-600 mt-2">
                Service Provider: Rajesh Kumar
              </p>

              <p className="text-slate-600 mt-2">
                Date: 15 September 2026
              </p>

              <p className="text-slate-600 mt-2">
                Time: 10:00 AM
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">
                Service Provider
              </h3>

              <p className="text-sm text-slate-600">
                Rajesh Kumar
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Electrician
              </p>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Message Provider
              </button>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">

            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Booking Status
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>

                <p className="text-slate-700">
                  Booking accepted by service provider
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>

                <p className="text-slate-500">
                  Provider is on the way
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>

                <p className="text-slate-500">
                  Service started
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>

                <p className="text-slate-500">
                  Service completed
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ActiveBooking