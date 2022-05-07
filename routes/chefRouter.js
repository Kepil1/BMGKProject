const {
    Router
} = require('express')
const Chef = require('../models/Chef')

const app = Router()

app.get('/', async (req, res) => {
    try {
        const chefs = await Chef.find().lean()

        res.render('chefs', {
            chefs
        })
    } catch (error) {
        console.log(error)
        res.render('chefs')
    }
})

app.get('/add', async (req, res) => {
    res.render('AddChef')
})

app.post('/add', async (req, res) => {
    const {name} = req.body

    try {
        await Chef.create({name})
        res.status(200).json({ok: true, message: 'Şef eklendi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Şef eklerken hata'})
    }
})

module.exports = app