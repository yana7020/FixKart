import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

function Payment() {
  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state?.booking

  const [paymentMethod, setPaymentMethod] = useState("upi")

  const serviceCharge = 499
  const platformFee = 49
  const totalAmount = serviceCharge + platformFee

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Payment details not found
          </h1>

          <p className="text-slate-600 mt-2">
            Please select an accepted booking to continue.
          </p>

          <button
            onClick={() => navigate("/customer/dashboard/bookings")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    )
  }

  if (booking.status !== "Accepted") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Payment Not Available
          </h1>

          <p className="text-slate-600 mt-2">
            Payment is available after the provider accepts your booking.
          </p>

          <button
            onClick={() => navigate("/customer/dashboard/bookings")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    )
  }

  const handlePayment = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const updatedBookings = savedBookings.map((item) =>
      item.id === booking.id
        ? {
            ...item,
            status: "Completed",
            paymentMethod,
            totalAmount,
            paymentStatus:
              paymentMethod === "cash" ? "Pay After Service" : "Paid",
          }
        : item
    )

    localStorage.setItem(
      "fixkartBookings",
      JSON.stringify(updatedBookings)
    )

    const updatedBooking = updatedBookings.find(
      (item) => item.id === booking.id
    )

    navigate("/customer/dashboard/book-service/confirmation", {
      state: {
        booking: updatedBooking,
      },
    })
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/customer/dashboard/bookings")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to My Bookings
          </button>

          <h1 className="text-3xl font-bold text-slate-900 mt-5">
            Payment
          </h1>

          <p className="text-slate-600 mt-2">
            Complete your payment to confirm the service booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Select Payment Method
              </h2>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg text-left transition ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      UPI
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay using Google Pay, PhonePe or other UPI apps
                    </p>
                  </div>

                  <span className="text-xl">
                    📱
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg text-left transition ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      Credit / Debit Card
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay securely using your card
                    </p>
                  </div>

                  <span className="text-xl">
                    💳
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg text-left transition ${
                    paymentMethod === "netbanking"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      Net Banking
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay directly through your bank
                    </p>
                  </div>

                  <span className="text-xl">
                    🏦
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg text-left transition ${
                    paymentMethod === "cash"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      Cash on Service
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay the provider after the service
                    </p>
                  </div>

                  <span className="text-xl">
                    💵
                  </span>
                </button>
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="•••"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Bank
                  </label>

                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    <option>Select your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    You can pay the service provider in cash after the service
                    is completed.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="flex items-center gap-4 mt-6 pb-5 border-b border-slate-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                  {booking.service?.icon}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {booking.service?.name}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Service Provider: {booking.provider}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Service Charge
                  </span>

                  <span className="font-medium text-slate-900">
                    ₹{serviceCharge}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Platform Fee
                  </span>

                  <span className="font-medium text-slate-900">
                    ₹{platformFee}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-5 pt-5 flex justify-between">
                <span className="font-semibold text-slate-900">
                  Total
                </span>

                <span className="text-xl font-bold text-blue-600">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {paymentMethod === "cash"
                  ? "Confirm Booking"
                  : `Pay ₹${totalAmount}`}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Your payment information will be securely processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
