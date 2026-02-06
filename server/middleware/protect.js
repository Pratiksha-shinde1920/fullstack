const jwt = require("jsonwebtoken")
const protect = (req, res, next) => {
    // check for cookie
    const ADMIN = req.cookies.ADMIN
    // if not availablr send error
    if (!ADMIN) {
        return res.status(401).json({ message: "no cookie found", success: false })
    }
    // check token

    // if not available send error
    //                                        form  auth.controller login function payload of jwt.sign
    jwt.verify(ADMIN, process.env.JWT_KEY, (jwtdata, decode) => {
        if (!decode) {
            return res.status(401).json({ message: "invalid token", success: false })
        }
        next()
    })
    // if all is available call next() fun
}
module.exports = protect