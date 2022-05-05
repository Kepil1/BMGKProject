const { Schema, model } = require('mongoose')

const Chef = Schema({
    name: { type: String, required: true }
})

module.exports = model('Chef', Chef)