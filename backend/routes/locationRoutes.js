const express = require("express")
const protect = require("../middleware/authMiddleware")

const {
  updateProviderLocation,
  getProviderLocation,
} = require("../controllers/locationController")

const router = express.Router()

router.put("/provider", protect, updateProviderLocation)
router.get("/provider/:bookingId", protect, getProviderLocation)

module.exports = router