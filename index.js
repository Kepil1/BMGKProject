require('dotenv').config()
const path = require('path')
const { PORT, MONGO_CONNECTION } = process.env
const express = require('express')
const expressHBS = require('express-handlebars')
const mongoose = require('mongoose')

const app = express();

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// app.use(router eklenecek);

const start = async () => {
    try {
        const MongoConnection = MONGO_CONNECTION ?? "";
        await mongoose.connect(MongoConnection);

        app.listen(PORT, async () => {
            console.log(`Uygulama http://localhost:${PORT} üzerinde başladı!`);
        });
    } catch (error) {
        console.log("Veritabanı hatası", error);
    }
};

start();
