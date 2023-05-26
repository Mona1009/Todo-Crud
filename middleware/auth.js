const jwt = require("jsonwebtoken")

exports.loginAuth = async (user) => {
    return await jwt.sign(
        { ...user },
        process.env.SECRET,
        {
            expiresIn: "2H"
        })

}


exports.verifyAuth = async (req, res, next) => {
    const token = req?.headers?.authorization.slice(7,)
    try {
        const isVerified = await jwt.verify(token, process.env.SECRET)
        if (isVerified) {
            next()
        }

    }
    catch (err) {
        res.json({ msg: "invalid token" })
    }


}