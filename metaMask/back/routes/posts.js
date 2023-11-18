const express = require('express')
const CkEditorModal = require('../models/posts')
const router = express.Router()
router.post('/', async (req, res) => {
    try {
        const { ckData } = req.body
        const ckEditorData = await CkEditorModal.create({ content: ckData })
        res.status(201).json({ message: "Data SuccessFully Added" })
    } catch (err) {
        res.status(404).json({ message: "Data Not Found" })
    }

})

module.exports = router