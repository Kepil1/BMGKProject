const { Schema, model } = require('mongoose')

const Recipe = Schema({
    name: { type: String, required: true },
    portion: { type: Number, required: false, default: 1 },
    chefid: { type: Schema.Types.ObjectId, required: true }
})

module.exports = model('Recipe', Recipe)