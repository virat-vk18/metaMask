const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerControllers')
const verifyJWT = require('../middleware/verifyJWT')
require('dotenv').config()

router.get('/getAllData', registerController.getAllData)

router.post('/', registerController.createData)

router.post('/editUser', verifyJWT.verifyJWT, registerController.getSingleUser)

router.post('/update/:id', verifyJWT.verifyJWT, registerController.updateUser)

router.delete('/delete', registerController.deleteUser)

module.exports = router