const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        require: true,
        type: String,
    },
    price: {
        require: true,
        type: Number
    },
    image: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    category: {
        type: Array,
        default: [],
    },
    quantity: {
        require: true,
        type: Number
    },
    sold: {
        default: 0,
        type: Number
    },
    rating: {
        default: 0,
        type: Number
    },
    numReviews: {
        default: 0,
        type: Number
    },
    saleOf: {
        default: false,
        type: Boolean
    },
    salePrice: {
        default: 0,
        type: Number
    },
    deleted: {
        default: false,
        type: Boolean
    },
},
    {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product