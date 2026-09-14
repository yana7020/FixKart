const express = require("express")
const protect = require("../middleware/authMiddleware")
const {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  getProviderBookingRequests,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
  initiatePayment,
  completePayment,
} = require("../controllers/bookingController")

const router = express.Router()

router.post("/", protect, createBooking)
router.get("/customer", protect, getCustomerBookings)
router.get("/provider", protect, getProviderBookings)
router.get("/provider/requests", protect, getProviderBookingRequests)
router.patch("/:id/accept", protect, acceptBooking)
router.patch("/:id/reject", protect, rejectBooking)
router.patch("/:id/status", protect, updateBookingStatus)
router.patch("/:id/payment/initiate", protect, initiatePayment)
router.patch("/:id/payment/complete", protect, completePayment)

module.exports = router