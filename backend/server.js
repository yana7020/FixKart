const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const messageRoutes = require("./routes/messageRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
const locationRoutes = require("./routes/locationRoutes")
const profileRoutes = require("./routes/profileRoutes")

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "FixKart backend is running",
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/location", locationRoutes)
app.use("/api/profile", profileRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`FixKart server running on port ${PORT}`)
})