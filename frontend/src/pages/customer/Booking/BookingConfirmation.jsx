import { useLocation, useNavigate } from "react-router-dom"

function BookingConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state?.booking

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Booking not found
          </h1>

          <p className="text-slate-600 mt-2">
            Please return to your dashboard.
          </p>

          <button
            onClick={() => navigate("/customer/dashboard")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-blue-600 px-6 py-10 text-center text-white">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-3xl text-blue-600">
              ✓
            </div>

            <h1 className="text-3xl font-bold mt-5">
              Booking Completed
            </h1>

            <p className="text-blue-100 mt-2">
              Your payment was successful and your service booking is confirmed.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
                {booking.service?.icon}
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Service
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {booking.service?.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">
                  Service Provider
                </p>

                <p className="font-semibold text-slate-900 mt-1">
                  {booking.provider || "Rajesh Kumar"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">
                  Booking Status
                </p>

                <p className="font-semibold text-green-600 mt-1">
                  Completed
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">
                  Scheduled Date
                </p>

                <p className="font-semibold text-slate-900 mt-1">
                  {booking.date}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">
                  Scheduled Time
                </p>

                <p className="font-semibold text-slate-900 mt-1">
                  {booking.time}
                </p>
              </div>
            </div>

            <div className="mt-6 p-5 border border-slate-200 rounded-xl">
              <p className="text-sm text-slate-500">
                Service Address
              </p>

              <p className="font-medium text-slate-900 mt-2">
                {booking.address}
              </p>
            </div>

            <div className="mt-6 p-5 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-sm font-semibold text-green-900">
                Payment Successful
              </p>

              <p className="text-sm text-green-700 mt-2">
                Your payment has been completed successfully. Your booking is now marked as completed.
              </p>

              <div className="flex justify-between mt-4 pt-4 border-t border-green-200">
                <span className="text-sm text-green-800">
                  Total Amount
                </span>

                <span className="font-bold text-green-900">
                  ₹{booking.totalAmount}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <button
                onClick={() => navigate("/customer/dashboard")}
                className="py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
              >
                Back to Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/customer/dashboard/booking-history")
                }
                className="py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Booking History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
