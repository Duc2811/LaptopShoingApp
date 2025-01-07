const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: { require: true, type: String },
    price: { require: true, type: Number },
    image: { require: true, type: String },
    description: { require: true, type: String },
    category: { require: mongoose.Schema.Types.ObjectId, ref: "Category" },
    quantity: { require: true, type: Number },
    sold: { default: 0, type: Number },
    rating: { default: 0, type: Number },
    numReviews: { default: 0, type: Number },
    saleOf: { default: false, type: Boolean },
    deleted: { default: false, type: Boolean },
},
    {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product