const {
    Router
} = require('express')

const app = Router()

app.get('/', async (req, res) => {
    res.render('recipes')
})

module.exports = app