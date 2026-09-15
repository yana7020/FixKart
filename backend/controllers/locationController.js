const User = require("../models/User")
const Booking = require("../models/Booking")

const updateProviderLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      })
    }

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        message: "Invalid latitude or longitude",
      })
    }

    const provider = await User.findOne({
      _id: req.user.userId,
      role: "provider",
    })

    if (!provider) {
      return res.status(403).json({
        message: "Only providers can update their location",
      })
    }

    provider.currentLocation = {
      latitude,
      longitude,
      updatedAt: new Date(),
    }

    await provider.save()

    res.status(200).json({
      message: "Provider location updated successfully",
      currentLocation: provider.currentLocation,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const getProviderLocation = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    if (!booking.provider) {
      return res.status(400).json({
        message: "No provider assigned to this booking",
      })
    }

    const isCustomer =
      booking.customer.toString() === req.user.userId

    const isProvider =
      booking.provider.toString() === req.user.userId

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        message: "You are not a participant in this booking",
      })
    }

    if (
      ![
        "Accepted",
        "On the Way",
        "Reached Destination",
        "Service Started",
      ].includes(booking.status)
    ) {
      return res.status(400).json({
        message: "Provider location is available only during an active booking",
      })
    }

    const provider = await User.findById(booking.provider).select(
      "name currentLocation"
    )

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      })
    }

    res.status(200).json({
      provider: {
        id: provider._id,
        name: provider.name,
        currentLocation: provider.currentLocation,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  updateProviderLocation,
  getProviderLocation,
}