const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Booking",
        "Booking Accepted",
        "Booking Rejected",
        "Booking Status",
        "Message",
        "Payment",
        "Review",
        "System",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification