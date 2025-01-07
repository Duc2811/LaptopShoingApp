const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name: { type: 'string', require: true },
    image: { type: 'string', require: true },
    description: { type: 'string', require: true },
},
    {
        timestamps: true
    })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category