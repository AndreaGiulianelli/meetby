const User = require('../models/user')
const { asyncController } = require('./utils/asyncController')

exports.getUsers = asyncController(async (req, res) => {
    if (!req.query.startsWith) {
        return res.status(400).json({ message: "Provide the 'startsWith' query parameter to perform the request" })
    }

    const userRegex = new RegExp("^" + req.query.startsWith.toLowerCase(), "i")
    const pipeline = [
        {
            $match: {
                $or: [
                    { name: userRegex },
                    { surname: userRegex },
                    { username: userRegex }
                ]
            },
        },
        {
            $project: {
                name: 1,
                surname: 1,
                username: 1,
            }
        }
    ]
    const users = await User.aggregate(pipeline).sort({ username: 1 })

    if (users.length == 0) {
        return res.status(204).send()
    }

    return res.status(200).json(users)
})
