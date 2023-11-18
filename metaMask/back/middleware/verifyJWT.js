const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        // console.log(authHeader);
        if (!authHeader) return res.sendStatus(401)
        const token = authHeader.split(' ')[1]
        // console.log(token);
        if (!token) return res.sendStatus(404)
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECERT,
            (err, decoded) => {
                if (err) return res.sendStatus(404)
                req.id = decoded._id
                next()
            }
        )

    } catch (err) {
        res.sendStatus(404)
    }

}

// module.exports = verifyJWT