const Message = require("../models/Message")
const Booking = require("../models/Booking")

const sendMessage = async (req, res) => {
  try {
    const { receiver, booking, text } = req.body

    if (!receiver || !booking || !text) {
      return res.status(400).json({
        message: "Receiver, booking, and message text are required",
      })
    }

    const existingBooking = await Booking.findById(booking)

    if (!existingBooking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    const isParticipant =
        existingBooking.customer.toString() === req.user.userId ||
        (existingBooking.provider &&
            existingBooking.provider.toString() === req.user.userId)

        if (!isParticipant) {
        return res.status(403).json({
            message: "You are not a participant in this booking",
        })
        }

        if (!["Accepted", "On the Way", "Reached Destination", "Service Started"].includes(existingBooking.status)) {
        return res.status(400).json({
            message: "Chat is available only after the booking is accepted",
        })
    }

    const isReceiverParticipant =
      existingBooking.customer.toString() === receiver ||
      (existingBooking.provider &&
        existingBooking.provider.toString() === receiver)

    if (!isReceiverParticipant) {
      return res.status(403).json({
        message: "Receiver is not a participant in this booking",
      })
    }

    const message = await Message.create({
      sender: req.user.userId,
      receiver,
      booking,
      text,
    })

    await message.populate("sender", "name email")
    await message.populate("receiver", "name email")

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const getBookingMessages = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    const isParticipant =
      booking.customer.toString() === req.user.userId ||
      (booking.provider &&
        booking.provider.toString() === req.user.userId)

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not a participant in this booking",
      })
    }

    const messages = await Message.find({
      booking: req.params.bookingId,
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 })

    res.status(200).json({
      messages,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const markMessagesAsRead = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    const isParticipant =
      booking.customer.toString() === req.user.userId ||
      (booking.provider &&
        booking.provider.toString() === req.user.userId)

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not a participant in this booking",
      })
    }

    await Message.updateMany(
      {
        booking: req.params.bookingId,
        receiver: req.user.userId,
        read: false,
      },
      {
        $set: { read: true },
      }
    )

    res.status(200).json({
      message: "Messages marked as read",
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  sendMessage,
  getBookingMessages,
  markMessagesAsRead,
}