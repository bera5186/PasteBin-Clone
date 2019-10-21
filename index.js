const express = require('express')
const connectDb = require('./config/db')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended : false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

console.log(path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {

})

app.get('/:code', (req, res) => {

})

app.listen(PORT, () => { console.log(`Server runnig at ${PORT} ⚡`) })