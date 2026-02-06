const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const protect = require("./middleware/protect.js")
const rateLimit = require("express-rate-limit")
mongoose.connect(process.env.MONGO_URL)


const app = express()

// const limiter = rateLimit({
//     window: 1000 * 60,
//     max: 5
// })
// app.use(limiter)

app.use(cors({ origin: "http://localhost:3000", credentials: true })) // middleware

app.use(express.json()) //for req.body
app.use(cookieParser()) //for req.cookie


app.use("/api/todo", protect, require("./routes/todo.routes.js"))
app.use("/api/auth", require("./routes/auth.route.js"))

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, console.log("server running.."))

})
module.exports = app