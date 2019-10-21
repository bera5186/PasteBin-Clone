const express = require('express')
const connectDb = require('./config/db')
const path = require('path')
const hbs = require('hbs')
const shortId = require('shortid')
const config = require('config')
const model = require('./models/Paste')
require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ extended : false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(path.join(__dirname, 'views/partials'))

console.log(path.join(__dirname, 'views/partials'))
connectDb()
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    // console.log(req.body.data)
    // console.log(new Date())

    const data = req.body.data;
    const expirydate = req.body.expiryDate;
    let expDate;

    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }

    const urlCode = shortId.generate()
    const shortUrl = config.get("baseUrl") +'/'+ urlCode

    if (expirydate === "10 Minutes"){
        expDate = new Date().addHours(0.166667)
    } else if (expirydate === "1 Hours"){
        expDate = new Date().addHours(1)
    } else if (expirydate === "5 Hours"){
        expDate = new Date().addHours(5)
    } else if (expirydate === "1 Day"){
        expDate = new Date().addHours(24)
    } else if (expirydate === "2 Minutes"){
        expDate = new Date().addHours(0.0333333)
    }
    console.log(expirydate)
    console.log(expDate)
    console.log(shortUrl)

    const paste = await model.findOne({ 'shortLinkCode' : urlCode })
    console.log(paste)
    if(paste){
        return res.redirect(shortUrl)
    } else{
        console.log('in ekse')
        if(expirydate){
        dataToStore = new model({
            pasteData: data,
            createdAt: new Date(),
            expireAt: expDate,
            shortLink: shortUrl,
            shortLinkCode: urlCode
        })} else {
            dataToStore = new model({
                pasteData: data,
                createdAt: new Date(),
                shortLink: shortUrl,
                shortLinkCode: urlCode
            })
        }
        await dataToStore.save()
        return res.redirect(shortUrl)
    }

    

})

app.get('/:code', async (req, res) => {
    console.log(req.params.code)

    const data = await model.findOne({ "shortLinkCode" : req.params.code })
    console.log(data)
    if(! data) {
        return res.render('404')
    } else {
        return res.render('paste', { data: data.pasteData })
    }

})

app.listen(PORT, () => { console.log(`Server runnig at ${PORT} ⚡`) })