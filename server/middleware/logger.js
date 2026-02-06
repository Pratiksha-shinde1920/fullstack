const logger = (req,res,next) => {
    console.log("request recived")
    next()
    
}
module.exports = logger