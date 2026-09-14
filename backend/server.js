const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoutes")

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`FixKart server running on port ${PORT}`)
})