const Notification = require("../models/Notification")

const createNotification = async ({
  user,
  type,
  title,
  message,
  booking = null,
}) => {
  try {
    const notification = await Notification.create({
      user,
      type,
      title,
      message,
      booking,
    })

    return notification
  } catch (error) {
    console.error("Notification creation error:", error.message)
    return null
  }
}

module.exports = createNotification