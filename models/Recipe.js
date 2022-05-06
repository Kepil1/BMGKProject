const { Schema, model } = require('mongoose')

const Recipe = Schema({
    name: { type: String, required: true },
    portion: { type: Number, required: false, default: 1 },
    chefname: { type: String, required: true }
})

module.exports = model('Recipe', Recipe)