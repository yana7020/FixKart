function ActiveJob() {
  return (
    <div className="p-6 md:p-8 lg:p-10">
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
                Live map will appear here
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
                Amit Verma
              </h2>

              <p className="text-slate-600 mt-1">
                Electrical Repair
              </p>
            </div>

            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
              Accepted
            </span>
          </div>

          <div className="space-y-4 mt-7">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500">
                Location
              </p>

              <p className="font-medium text-slate-900 mt-1">
                Kolkata
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500">
                Scheduled Time
              </p>

              <p className="font-medium text-slate-900 mt-1">
                Today, 10:00 AM
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500">
                Estimated Amount
              </p>

              <p className="font-medium text-slate-900 mt-1">
                ₹500
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Start Job
            </button>

            <button className="py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveJob