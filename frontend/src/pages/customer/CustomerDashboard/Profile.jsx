function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="text-slate-600 mt-2">
            View and manage your account information.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

          <div className="max-w-2xl space-y-6">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value="Customer Name"
                readOnly
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value="customer@example.com"
                readOnly
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                value="+91 9876543210"
                readOnly
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address
              </label>

              <textarea
                value="Customer address"
                readOnly
                rows="3"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 resize-none"
              />
            </div>

            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile