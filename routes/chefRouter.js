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
        const duplicate = await (await Chef.find({name}).lean()).length
        if (duplicate) {
            return res.status(500).json({ok: false, message: 'Bu isimle bir şef zaten var!'})
        }

        await Chef.create({name})
        res.status(200).json({ok: true, message: 'Şef eklendi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Şef eklerken hata'})
    }
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    try {
        const data = await Chef.findById(id).lean()
        if (!data) {
            return res.status(500).json({ok: false, message: 'Böyle bir şef bulunamadı'})
        }

        await Chef.findByIdAndDelete(id)
        res.status(200).json({ok: true, message: 'Şef silindi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Şef silinirken hata oluştu'})
    }
})

app.put('/update/:id/:name', async (req, res) => {
    const {id,name} = req.params
    try {
        if (name == null || name == '') return res.status(500).json({ok:false, message: 'Lütfen ad giriniz!'})
        const data = await Chef.findById(id).lean()
        if (!data) {
            return res.status(500).json({ok: false, message: 'Böyle bir şef bulunamadı'})
        }
        data.name = name
        await Chef.findByIdAndUpdate(id, data, {new:true})
        res.status(200).json({ok: true, message: 'Şef güncellendi'})
    } catch (error) {
        res.status(500).json({ok: false, message: 'Şef güncellenirken hata oluştu'})
    }
})

module.exports = app