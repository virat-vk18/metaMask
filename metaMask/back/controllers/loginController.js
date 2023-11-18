const UserModal = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {
    const invalidEmail = await UserModal.findOne({ email: req.body.email })
    if (!invalidEmail) {
        return res.status(401).json({ message: 'Email is Invalid' })
    }
    else {
        const password = await bcrypt.compare(req.body.password, invalidEmail.password)
        if (password) {
            const token = jwt.sign(
                { id: invalidEmail._id },
                process.env.ACCESS_TOKEN_SECERT,
                { expiresIn: "1h" }
            )
            return res.status(200).json({ message: 'Login SuccessFully', id: invalidEmail._id, token })

        }
        else {
            return res.status(401).json({ message: 'Password is Invalid' })
        }
    }

}

module.exports = { handleLogin }