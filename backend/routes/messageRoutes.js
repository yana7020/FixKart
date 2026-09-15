const express = require("express")
const protect = require("../middleware/authMiddleware")

const {
  sendMessage,
  getBookingMessages,
  markMessagesAsRead,
} = require("../controllers/messageController")

const router = express.Router()

router.post("/", protect, sendMessage)

router.get("/:bookingId", protect, getBookingMessages)

router.patch("/:bookingId/read", protect, markMessagesAsRead)

module.exports = router