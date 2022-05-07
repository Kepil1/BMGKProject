module.exports = function (req, res, next) {
    console.log(req.route)
    if (!req.route) {
        res.render('NotFound', {error: 'Aradığınız Sayfa Bulunamadı :('})
    }
}