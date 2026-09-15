const express = require("express")
const protect = require("../middleware/authMiddleware")

const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = require("../controllers/notificationController")

const router = express.Router()

router.get("/", protect, getNotifications)

router.patch("/read-all", protect, markAllNotificationsAsRead)

router.patch("/:id/read", protect, markNotificationAsRead)

module.exports = router