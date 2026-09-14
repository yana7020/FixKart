import { useLocation, useNavigate } from "react-router-dom"

function ServiceDetails() {
  const location = useLocation()
  const navigate = useNavigate()

  const service = location.state?.service

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const booking = {
      id: Date.now(),
      service,
      customer: formData.get("customer"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      date: formData.get("date"),
      time: formData.get("time"),
      details: formData.get("details"),
      price: "₹499",
      status: "Pending",
    }

    const existingBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify([...existingBookings, booking])
    )

    navigate("/customer/dashboard/bookings")
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Service Not Found
          </h1>

          <p className="text-slate-500 mt-2">
            Please select a service from the dashboard.
          </p>

          <button
            onClick={() => navigate("/customer/dashboard")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/customer/dashboard")}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
              {service.icon}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {service.name}
              </h1>

              <p className="text-slate-500 mt-1">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8"
        >
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Service Details
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Enter the details required for your service request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>

              <input
                type="text"
                name="customer"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service Address
              </label>

              <textarea
                name="address"
                required
                rows="3"
                placeholder="Enter the complete service address"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Date
              </label>

              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Time
              </label>

              <input
                type="time"
                name="time"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Details
              </label>

              <textarea
                name="details"
                rows="4"
                placeholder="Describe the problem or any additional requirements"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Estimated Service Price
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                ₹499
              </p>
            </div>

            <button
              type="submit"
              className="px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Request Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceDetails
