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
        const duplicate = await (await Recipe.find({name}).lean()).length
        if (duplicate) {
            return res.status(500).json({ok: false, message: 'Bu tarif zaten var!'})
        }

        await Recipe.create({name, portion: Number(portion), chefname})
        res.status(200).json({ok: true, message: 'Tarifiniz eklendi'})
    } catch (error) {
        res.status(500).json({ok:false, message: 'Tarif eklerken hata'})
    }
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    try {
        const data = await Recipe.findById(id).lean()
        if (!data) {
            return res.status(500).json({ok: false, message: 'Böyle bir tarif bulunamadı'})
        }

        await Recipe.findByIdAndDelete(id)
        res.status(200).json({ok: true, message: 'Tarif silindi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Tarif silinirken hata oluştu'})
    }
})

app.put('/update/:id/:name/:portion/:chefname', async (req, res) => {
    const {id,name,portion,chefname} = req.params
    try {
        if (name == null || name == '') return res.status(500).json({ok:false, message: 'Lütfen tarif adı giriniz!'})
        if (portion == null || portion == '') return res.status(500).json({ok:false, message: 'Lütfen porsiyon giriniz!'})
        if (chefname == null || chefname == '') return res.status(500).json({ok:false, message: 'Lütfen chefname giriniz!'})

        const data = await Recipe.findById(id).lean()
        if (!data) {
            return res.status(500).json({ok: false, message: 'Böyle bir tarif bulunamadı'})
        }
        
        data.name = name
        data.portion = portion
        data.chefname = chefname
        
        await Recipe.findByIdAndUpdate(id, data, {new:true})
        res.status(200).json({ok: true, message: 'Tarif güncellendi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Tarif güncellenirken hata oluştu'})
    }
})

module.exports = app