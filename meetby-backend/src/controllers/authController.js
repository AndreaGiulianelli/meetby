const bcrypt = require('bcrypt')

const User = require("../models/user")
const { asyncController } = require('./utils/asyncController')
const { generateToken } = require('../services/jwtService')

exports.signup = asyncController(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Provide the required fields to be able to signup" })
    }

    if (await User.findOne({ email: email })) {
        return res.status(409).json({ message: "User already registered" })
    }

    const generatedSalt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, generatedSalt)

    const newUser = new User({
        email: email,
        password: hashedPassword
    })

    await newUser.save()
    res.status(204).send()
})

exports.login = asyncController(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Provide the required fields to be able to login" })
    }

    const user = await User.findOne({ email: email })

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send()
    }

    const token = generateToken(user.id)
    res.status(200).json({ accessToken: token })
})