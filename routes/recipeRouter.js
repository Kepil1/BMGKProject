const {
    Router
} = require('express')
const Recipe = require('../models/Recipe')

const app = Router()

app.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().lean()

        res.render('recipes', {
            recipes
        })
    } catch (error) {
        console.log(error)
        res.render('recipes')
    }
})

app.get('/add', (req, res) => {
    res.render('AddRecipe')
})

app.post('/add', async (req, res) => {
    const {name,portion,chefname} = req.body

    try {
        await Recipe.create({name, portion: Number(portion), chefname})
        res.status(200).json({ok: true, message: 'Tarifiniz eklendi'})
    } catch (error) {
        res.status(500).json({ok:false, message: 'Tarif eklerken hata'})
    }
})

module.exports = app