const User = require("../models/User")

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.status(200).json({
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, location, about, services } = req.body

    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    if (name !== undefined) {
      user.name = name
    }

    if (location !== undefined) {
      user.location = location
    }

    if (about !== undefined) {
      user.about = about
    }

    if (services !== undefined) {
      if (user.role !== "provider") {
        return res.status(400).json({
          message: "Only providers can update services",
        })
      }

      if (!Array.isArray(services)) {
        return res.status(400).json({
          message: "Services must be an array",
        })
      }

      user.services = services
    }

    await user.save()

    const updatedUser = await User.findById(user._id).select("-password")

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  getProfile,
  updateProfile,
}