const { loginAuth } = require("../middleware/auth");
const User = require("../model/User")
const bcrypt = require("bcryptjs")

const signup = async (req, res, next) => {
    const { email, password } = req.body;

    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email }) // caps 'User'
    } catch (err) {
        return console.log(err)
    }
    if (exsistingUser) {
        return res.status(400).json({ message: "user already exist! Login instead" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        email: email,
        password: hashedPassword
    })

    try {
        await user.save()
    } catch (err) {
        return console.log(err)
    }
    return res.status(201).json({ user })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email }) // caps 'User'
    } catch (err) {
        return console.log(err)
    }
    if (!exsistingUser) {
        return res.status(404).json({ message: "Cant find user" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, exsistingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "incorrect password" })
    }

    let userId = exsistingUser._id;
    let token = await loginAuth(exsistingUser)

    return res.status(200).json({ userId: userId, token })
}

module.exports = {
    signup,
    login
}