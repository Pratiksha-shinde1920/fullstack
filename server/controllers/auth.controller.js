const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body
        const data = await User.findOne({ email }) //check email is already exist or not in db
        if (data) {
            return res.status(409).json({ message: "email already exist", success: false }) // if yes send error
        }
        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({ ...req.body, password: hashPassword })
        res.status(201).json({ message: "user Register success" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // check if email exist in our db
        const data = await User.findOne({ email }) //if founf will return obj
        // if not present senf error
        if (!data) {
            return res.status(401).json({ message: "email not found", success: false })
        }
        // compare password
        const isValid = await bcrypt.compare(password, data.password)
        // if password do not match send error
        if (!isValid) {
            return res.status(401).json({ message: "invalid password", success: false })
        }
        // if isActive false senf error
        if (!data.isActive) {
            return res.status(401).json({ message: "account block by admin", success: false })
        }
        // jwt token
        const token = jwt.sign({ _id: data._id, name: data.name }, process.env.JWT_KEY, { expiresIn: "1d" })

        // send secure cookie                                                                 
        res.cookie("ADMIN",token,{
            maxAge:1000*60,
            httpOnly:true, //live = true local = false node_env
            secure:process.env.NODE_ENV === "production"}) //timelimit 1 min

        // if password matched then login success
        res.status(200).json({ message: "user Login success", data: { name: data.name, email: data.email } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("ADMIN")
        res.status(200).json({ message: "user Logout success", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}