const Product = require('../../models/product')
const PaginationHelper = require('../../../helper/pagination')
const User = require('../../models/user')
const Category = require('../../models/category')
const SubCategory = require('../../models/subCategory')

//[Post] api/products/addProducts
module.exports.addProduct = async (req, res) => {
    try {
        const { name, price, image, description, category, subcategory, quantity, sold, saleOf, salePrice } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const productManager = await User.findOne({ token });
        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to add product or User not found!!!' });
        }

        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            return res.status(400).json({ message: 'Category not found!' });
        }

        if (subcategory) {
            const subcategoryDoc = await SubCategory.findOne({
                name: subcategory,
                category: categoryDoc._id
            });
            if (!subcategoryDoc) {
                return res.status(400).json({
                    message: 'SubCategory not found or does not belong to the provided Category!'
                });
            }
        }
        const product = new Product({
            productManager: productManager._id,
            name,
            price,
            image,
            description,
            category: categoryDoc._id,
            quantity,
            sold,
            saleOf,
            salePrice
        });

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ message: err.message + ' add Product Error' });
    }
};


//[Put] api/products/updateProduct/:id
module.exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, image, description, category, subcategory, quantity, sold, saleOf, salePrice } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        let categoryId;
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });
            if (!categoryDoc) {
                return res.status(400).json({ message: 'Category not found!' });
            }
            categoryId = categoryDoc._id;
        }
        if (subcategory) {
            const subcategoryDoc = await SubCategory.findOne({
                name: subcategory,
                category: categoryId || product.category
            });
            if (!subcategoryDoc) {
                return res.status(400).json({
                    message: 'SubCategory not found or does not belong to the provided Category!'
                });
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                image,
                description,
                category: categoryId || product.category,
                quantity,
                sold,
                saleOf,
                salePrice
            },
            { new: true }
        );

        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message + ' update Product Error' });
    }
};


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
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ message: 'Please provide a valid name or description to search.' });
        }

        let productsQuery = {
            deleted: false
        };

        if (name) {
            productsQuery.name = { $regex: name, $options: "i" };
        }

        if (description) {
            productsQuery.description = { $regex: description, $options: "i" };
        }

        const totalProducts = await Product.countDocuments(productsQuery);

        if (totalProducts === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }

        const paginationData = await PaginationHelper(
            {
                currentPage: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 12
            },
            totalProducts,
            req.query
        );

        const products = await Product.find(productsQuery)
            .skip(paginationData.skip)
            .limit(paginationData.limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Products found',
            products,
            totalPage: paginationData.totalPage,
            currentPage: paginationData.currentPage
        });
    } catch (error) {
        res.status(500).json({ message: `Search product error: ${error.message}` });
    }
};


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
        );
        const product = await Product.findById(req.params).skip(paginationData.skip).limit(paginationData.limit).sort({ createdAt: -1 });

        res.status(200).json({
            product,
            totalPage: paginationData.totalPage
        })
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
        const totalProducts = await Product.countDocuments({
            category: categories._id,
            deleted: false
        })
        if (totalProducts === 0) {
            return res.status(404).json({ message: 'No products found.' })
        }
        const paginationData = await PaginationHelper({
            currentPage: 1,
            limit: 12,
        },
            totalProducts,
            req.query
        );

        const products = await Product.find({ category: categories._id })
            .skip(paginationData.skip)
            .limit(paginationData.limit)
            .sort({ createdAt: -1 });
        if (!products || products === null) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json({
            products,
            totalPage: paginationData.totalPage
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/products/getProductBySubCategory/subcategory
module.exports.listProductsBySubCategory = async (req, res) => {
    try {
        const { subcategoryName } = req.params;
        const subcategory = await SubCategory.findOne({ name: subcategoryName }).populate('category');
        if (!subcategory) {
            return res.status(404).json({ message: 'SubCategory not found!' });
        }
        const products = await Product.find({ category: subcategory.category._id }).lean();

        res.status(200).json({
            message: `Products under SubCategory: ${subcategoryName}`,
            products
        });
    } catch (err) {
        res.status(500).json({ message: err.message + ' list Products Error' });
    }
};

//[GET] api/products/search?category=?&subCategory=?
module.exports.searchProductByCategoryAndSubCategory = async (req, res) => {
    try {
        const { categoryName, subcategoryName } = req.query; 
        const filters = {}; 

        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required!' });
        }
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found!' });
        }
        filters.category = category._id;

        if (subcategoryName) {
            const subcategory = await SubCategory.findOne({ name: subcategoryName, category: category._id });
            if (!subcategory) {
                return res.status(404).json({ message: 'SubCategory not found or does not belong to the specified category!' });
            }
            filters.subcategory = subcategory._id;
        }

        const products = await Product.find(filters).lean();

        res.status(200).json({
            message: 'Filtered products fetched successfully!',
            products
        });
    } catch (err) {
        res.status(500).json({ message: err.message + ' filter Products Error' });
    }
}
