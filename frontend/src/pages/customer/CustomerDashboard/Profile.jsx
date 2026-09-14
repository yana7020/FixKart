import { useEffect, useState } from "react"

function CustomerProfile() {
  const defaultProfile = {
    name: "Yana",
    email: "yana@example.com",
    location: "Kolkata",
    about:
      "FixKart customer using the platform to book reliable home services and connect with trusted service providers.",
  }

  const [bookings, setBookings] = useState([])
  const [profile, setProfile] = useState(defaultProfile)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(defaultProfile)

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const savedProfile =
      JSON.parse(localStorage.getItem("fixkartCustomerProfile")) ||
      defaultProfile

    setBookings(savedBookings)
    setProfile(savedProfile)
    setFormData(savedProfile)
  }, [])

  const customerBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  )

  const ratings = customerBookings.filter(
    (booking) =>
      booking.customerReviewSubmitted &&
      Number(booking.customerRating) > 0
  )

  const totalRating = ratings.reduce(
    (sum, booking) => sum + Number(booking.customerRating),
    0
  )

  const averageRating =
    ratings.length > 0
      ? (totalRating / ratings.length).toFixed(1)
      : "0.0"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    localStorage.setItem(
      "fixkartCustomerProfile",
      JSON.stringify(formData)
    )

    setProfile(formData)
    setEditMode(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-blue-600"></div>

          <div className="px-6 pb-6 md:px-8">
            <div className="-mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {profile.name}
                  </h1>

                  <p className="text-slate-500 mt-1">
                    FixKart Customer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  Customer
                </span>

                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {editMode ? (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Edit Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                About
              </label>

              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Overall Rating
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  ⭐ {averageRating}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Completed Bookings
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {customerBookings.length}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Member Since
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  2026
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    About
                  </h2>

                  <p className="text-slate-600 leading-7 mt-4">
                    {profile.about}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Personal Information
                  </h2>

                  <div className="space-y-4 mt-5">
                    <div>
                      <p className="text-xs text-slate-500">
                        Name
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {profile.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Email
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1 break-all">
                        {profile.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Location
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {profile.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Account Type
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        Customer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomerProfile
