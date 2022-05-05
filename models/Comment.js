const { Schema, model } = require('mongoose')

const Comment = Schema({
    name: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = model('Comment', Comment)