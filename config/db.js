const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoDbUri')

const connectDb = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log('DB connected ...')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

module.exports = connectDb