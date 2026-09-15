const express = require("express")
const protect = require("../middleware/authMiddleware")

const {
  getAllUsers,
} = require("../controllers/adminController")

const router = express.Router()

router.get("/users", protect, getAllUsers)

module.exports = router