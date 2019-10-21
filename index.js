const express = require('express')
const connectDb = require('./config/db')
const path = require('path')
const hbs = require('hbs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ extended : false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(path.join(__dirname, 'views/partials'))

console.log(path.join(__dirname, 'views/partials'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    console.log(req.body.data)
    console.log(new Date())
})

app.get('/:code', (req, res) => {

})

app.listen(PORT, () => { console.log(`Server runnig at ${PORT} ⚡`) })