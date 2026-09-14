function Profile() {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Profile
        </h1>

        <p className="text-slate-600 mt-2">
          Manage your service provider profile.
        </p>
      </div>

      <div className="max-w-3xl bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-200">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
            R
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Rajesh Kumar
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Service Provider
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value="Rajesh Kumar"
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>

            <input
              type="text"
              value="+91 9876543210"
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="text"
              value="rajesh@example.com"
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location
            </label>

            <input
              type="text"
              value="Kolkata"
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Services
          </label>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              Electrical Repair
            </span>

            <span className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              AC Repair
            </span>
          </div>
        </div>

        <button className="mt-7 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile