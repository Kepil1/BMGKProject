const {
    Router
} = require('express')
const Recipe = require('../models/Recipe')

const app = Router()

app.get('/', async (req, res) => {
    const recipes = await Recipe.find().lean()

    res.render('recipes', {
        recipes
    })
})

app.get('/add', (req, res) => {
    res.render('AddRecipe')
})

app.post('/add', async (req, res) => {
    const {name,portion,chefid} = req.body

    try {
        await Recipe.create({name, portion, chefid})
        res.json({ok: true, message: 'Tarifiniz eklendi'})
    } catch (error) {
        res.json({ok:false, message: 'Hata'})
    }
})

module.exports = app