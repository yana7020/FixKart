const User = require("../models/User")

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only",
      })
    }

    const users = await User.find().select("-password").sort({ createdAt: -1 })

    res.status(200).json({
      users,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  getAllUsers,
}