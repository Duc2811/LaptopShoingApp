const Product = require('../../models/product')
const PaginationHelper = require('../../../helper/pagination')
const User = require('../../models/user')
const Category = require('../../models/category')


//[Post] api/addProducts
module.exports.addProduct = async (req, res) => {
    try {
        const { name, price, image, description, category, quantity, sold, saleOf, salePrice } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const productManager = await User.findOne({ token: token });

        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to add product or User not found!!!' });
        }
        const categories = await Category.findOne({ name: category }).lean();
        if (!categories) {
            return res.status(400).json({ message: 'Category not found' });
        }

        const product = new Product({
            productManager: productManager._id,
            name,
            price,
            image,
            description,
            category: categories._id,
            quantity,
            sold,
            saleOf,
            salePrice
        });

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ message: err.message + " add Product Error" });
    }
}



//[Put] api/products/:id
module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, image, description, category, quantity, sold } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const productManager = await User.findOne({ token: token });
        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to update product or User not found!!!' });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let categoryDoc = null;
        if (category) {
            categoryDoc = await Category.findOne({ name: category }).lean();
            if (!categoryDoc) {
                return res.status(400).json({ message: 'Category not found' });
            }
        }
        const updateFields = {
            name: name || product.name,
            price: price || product.price,
            image: image || product.image,
            description: description || product.description,
            quantity: quantity || product.quantity,
            sold: sold || product.sold,
        };

        if (categoryDoc) {
            updateFields.category = categoryDoc._id;
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Failed to update product.' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        res.status(500).json({ message: error.message + ' update Product Error' });
    }
}



//[Delete] api/products/managerDelete/:id
module.exports.managerDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const productManager = await User.findOne({ token: token });
        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to delete product or User not found!!!' });
        }
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json({ message: 'Product deleted successfully.' })

    } catch (error) {
        res.status(500).json(`Delete product error: ` + error.message)
    }
}

//[Delete] api/products/adminDelete

module.exports.adminDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json({ message: 'Product deleted successfully.' })
    } catch (error) {
        res.status(500).json(`Delete product error: ` + error.message)
    }
}

// [GET] api/products/search?query=

module.exports.searchProducts = async (req, res) => {
    try {
        const query = req.body.query.trim();
        if (!query) {
            return res.status(400).json({ message: 'Please provide a query.' })
        }
        const products = await Product.find({
            $text: { $search: query },
            deleted: false
        })
        if (!products && !products.length) {
            return res.status(404).json({ message: 'No products found.' })
        }
        res.status(200).json(`Products found: ` + products)
    } catch (error) {
        res.status(500).json(`Search product error: ` + error.message)
    }
}


// [GET] api/products/getAllProducts
module.exports.getAllProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({ deleted: false })
        if (totalProducts === 0) {
            return res.status(404).json({ message: 'No products found.' })
        }
        const paginationData = await PaginationHelper({
            currentPage: 1,
            limit: 12,
        },
            totalProducts,
            req.query
        )
        const products = await Product.find({ deleted: false })
            .skip(paginationData.skip)
            .limit(paginationData.limit)
            .sort({ createdAt: -1 })

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

}

// [GET] api/products/getProductByCategory/category
module.exports.getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({ message: 'Please provide a category.' })
        }
        const categories = await Category.findOne({ name: category });
        if (!categories) {
            return res.status(404).json({ message: 'Category not found.' })
        }
        const products = (await Product.find({ category: categories._id }));
        if (!products || products === null) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}