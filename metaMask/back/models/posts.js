const mongoose = require('mongoose')

const CkEditorSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    ckId: {
        type: String,
        required: true
    }

})

module.exports = CkEditorModal = mongoose.model('CkEditor', CkEditorSchema)