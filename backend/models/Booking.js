const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    service: {
      type: String,
      enum: [
        "Electrician",
        "Plumbing",
        "Home Appliance Repair",
        "Home Cleaning",
        "Cook",
      ],
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    customerLocation: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "On the Way",
        "Reached Destination",
        "Service Started",
        "Service Completed",
        "Awaiting Payment",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    customerRating: {
      type: Number,
      default: null,
      min: 1,
      max: 5,
    },

    customerReview: {
      type: String,
      default: "",
      trim: true,
    },

    providerRating: {
      type: Number,
      default: null,
      min: 1,
      max: 5,
    },

    providerReview: {
      type: String,
      default: "",
      trim: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking