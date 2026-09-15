const Booking = require("../models/Booking")
const User = require("../models/User")

const createBooking = async (req, res) => {
  try {
    const {
      service,
      address,
      customerLocation,
      date,
      time,
      details,
      price,
    } = req.body

    if (
      !service ||
      !address ||
      !customerLocation ||
      !date ||
      !time ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All required booking fields must be provided",
      })
    }

    const booking = await Booking.create({
      customer: req.user.userId,
      service,
      address,
      customerLocation,
      date,
      time,
      details: details || "",
      price,
    })

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.userId,
    })
      .populate("provider", "name email location rating")
      .sort({ createdAt: -1 })

    res.status(200).json({
      bookings,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      provider: req.user.userId,
    })
      .populate("customer", "name email location rating")
      .sort({ createdAt: -1 })

    res.status(200).json({
      bookings,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const getProviderBookingRequests = async (req, res) => {
  try {
    const provider = await User.findById(req.user.userId)

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can access booking requests",
      })
    }

    const bookings = await Booking.find({
      status: "Pending",
      customerLocation: provider.location,
      service: { $in: provider.services },
      provider: null,
    })
      .populate("customer", "name email location")
      .sort({ createdAt: -1 })

    res.status(200).json({
      bookings,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const acceptBooking = async (req, res) => {
  try {
    const provider = await User.findById(req.user.userId)

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can accept bookings",
      })
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      status: "Pending",
      provider: null,
      customerLocation: provider.location,
      service: { $in: provider.services },
    })

    if (!booking) {
      return res.status(404).json({
        message: "Booking not available for acceptance",
      })
    }

    booking.provider = provider._id
    booking.status = "Accepted"

    await booking.save()

    await booking.populate("customer", "name email location")
    await booking.populate("provider", "name email location rating")

    res.status(200).json({
      message: "Booking accepted successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const rejectBooking = async (req, res) => {
  try {
    const provider = await User.findById(req.user.userId)

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can reject bookings",
      })
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      status: "Pending",
      provider: null,
      customerLocation: provider.location,
      service: { $in: provider.services },
    })

    if (!booking) {
      return res.status(404).json({
        message: "Booking not available for rejection",
      })
    }

    booking.status = "Rejected"

    await booking.save()

    res.status(200).json({
      message: "Booking rejected successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const updateBookingStatus = async (req, res) => {
  try {
    const provider = await User.findById(req.user.userId)

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can update booking status",
      })
    }

    const { status } = req.body

    const allowedTransitions = {
      Accepted: "On the Way",
      "On the Way": "Reached Destination",
      "Reached Destination": "Service Started",
      "Service Started": "Service Completed",
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: provider._id,
    })

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    if (allowedTransitions[booking.status] !== status) {
      return res.status(400).json({
        message: `Invalid status transition from ${booking.status} to ${status}`,
      })
    }

    booking.status = status

    await booking.save()

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const initiatePayment = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user.userId,
      status: "Service Completed",
    })

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or not ready for payment",
      })
    }

    booking.status = "Awaiting Payment"

    await booking.save()

    res.status(200).json({
      message: "Payment initiated successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const completePayment = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user.userId,
      status: "Awaiting Payment",
    })

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or payment is not pending",
      })
    }

    booking.status = "Completed"
    booking.paidAt = new Date()
    booking.completedAt = new Date()

    await booking.save()

    res.status(200).json({
      message: "Payment completed successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const rateProvider = async (req, res) => {
  try {
    const { rating, review } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      })
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user.userId,
      status: "Completed",
    })

    if (!booking) {
      return res.status(404).json({
        message: "Completed booking not found",
      })
    }

    if (!booking.provider) {
      return res.status(400).json({
        message: "This booking has no provider",
      })
    }

    if (booking.customerRating !== null) {
      return res.status(400).json({
        message: "You have already rated this provider",
      })
    }

    booking.customerRating = rating
    booking.customerReview = review || ""

    await booking.save()

    const providerBookings = await Booking.find({
      provider: booking.provider,
      customerRating: { $ne: null },
    })

    const totalRating = providerBookings.reduce(
      (sum, item) => sum + item.customerRating,
      0
    )

    const averageRating =
      providerBookings.length > 0
        ? Number((totalRating / providerBookings.length).toFixed(1))
        : 0

    await User.findByIdAndUpdate(booking.provider, {
      rating: averageRating,
    })

    res.status(200).json({
      message: "Provider rated successfully",
      rating: booking.customerRating,
      review: booking.customerReview,
      providerRating: averageRating,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const rateCustomer = async (req, res) => {
  try {
    const { rating, review } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      })
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: req.user.userId,
      status: "Completed",
    })

    if (!booking) {
      return res.status(404).json({
        message: "Completed booking not found",
      })
    }

    if (!booking.customer) {
      return res.status(400).json({
        message: "This booking has no customer",
      })
    }

    if (booking.providerRating !== null) {
      return res.status(400).json({
        message: "You have already rated this customer",
      })
    }

    booking.providerRating = rating
    booking.providerReview = review || ""

    await booking.save()

    const customerBookings = await Booking.find({
      customer: booking.customer,
      providerRating: { $ne: null },
    })

    const totalRating = customerBookings.reduce(
      (sum, item) => sum + item.providerRating,
      0
    )

    const averageRating =
      customerBookings.length > 0
        ? Number((totalRating / customerBookings.length).toFixed(1))
        : 0

    await User.findByIdAndUpdate(booking.customer, {
      rating: averageRating,
    })

    res.status(200).json({
      message: "Customer rated successfully",
      rating: booking.providerRating,
      review: booking.providerReview,
      customerRating: averageRating,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  getProviderBookingRequests,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
  initiatePayment,
  completePayment,
  rateProvider,
  rateCustomer,
}