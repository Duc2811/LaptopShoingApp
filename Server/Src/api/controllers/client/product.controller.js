const Product = require('../../models/product')
const PaginationHelper = require('../../helper/pagination') //Pagination
const User = require('../../models/user')


module.exports.addProduct = async (req, res) => {
    try {
        const { name, price, image, description, category, quantity, saleOf } = req.body;
        const authHeader = require.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        let adminId
        if (token) {
            const admin = await User.findOne({ token: token })
        }
        if (!admin && !admin.role("admin")) {
            return res.status(401).json({ message: 'User not authorized to add product or User not found!!!' });
        }
        adminId = admin._id;
        const product = new Product({ name, price, image, description, category, quantity, saleOf });

    } catch (err) {
        res.status(500).json({ message: err.message + " add Product Error" });
    }
}

// [GET] api/products
module.exports.getAllProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({ deleted: false })
        const paginationData = await PaginationHelper({
            currentPage: 1,
            limit: 12,
        },
            totalProducts,
            req.query
        )
        if (!paginationData.length) {
            return res.status(404).json({ message: 'No products found.' })

        }
        const products = await Product.find({ delete: false })
            .skip(paginationData.skip)
            .limit(paginationData.limit)
            .sort({ createdAt: "desc" })

        res.status(200).json({
            products,
            totalPage: paginationData.totalPage
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/products/:id
module.exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }


    module.exports.getProductByCategory = async (req, res) => {
        try {
            const category = await req.query.category;
            const products = await Product.find({ category })
            if (products.length <= 0 && products === null) {
                return res.status(404).json({ message: 'Product not found.' })
            }
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
