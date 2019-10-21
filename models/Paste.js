const mongoose = require('mongoose')

const pasteSchema = new mongoose.Schema({
    pasteData : String,
    createdAt : { type: Date, default: new Date() },
    expireDate : Date
})

module.exports = mongoose.model('Paste', pasteSchema)