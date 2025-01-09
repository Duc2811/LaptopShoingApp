const Category = require('../../models/category')
const PaginationHelper = require('../../../helper/pagination')
const User = require('../../models/user')

//[GET] api/category/getAllCategory
module.exports.getAllCategory = async (req, res) => {
    try {
        const totalCategory = await Category.countDocuments({ deleted: false });

        if (totalCategory === 0) {
            return res.status(404).json({ message: 'No categories found.' });
        }

        const paginationData = await PaginationHelper(
            {
                currentPage: 1,
                limit: 12,
            },
            totalCategory,
            req.query
        );

        const categories = await Category.find({ deleted: false })
            .skip(paginationData.skip)
            .limit(paginationData.limit)
            .sort({ createdAt: 'desc' });

        return res.status(200).json({
            categories,
            totalPage: paginationData.totalPage,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Server error.', error });
    }
};



//[POST] api/category/addCategory
module.exports.addCategory = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const productManager = await User.findOne({ token: token });

        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to add product or User not found!!!' });
        }
        const { name, description, image } = req.body;

        const checkCategory =  await Category.findOne({ name: name })
        if (checkCategory) return res.status(400).json({ message: 'Category already exists' })
        const category = new Category({ name, description, image, productManager: productManager._id });
        await category.save();
        res.status(200).json({ message: 'Category added successfully', category });

    } catch (error) {
        res.status(500).json({ error: error.message + ': add category error' });
    }
}

//[PUT] api/category/updateCategory/:id
module.exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const productManager = await User.findOne({ token: token });
        if (!productManager || productManager.role !== 'productManager') {
            return res.status(401).json({ message: 'User not authorized to update category or User not found!!!' });
        }
        const category = await Category.findByIdAndUpdate(id, { name, description, image }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message + ': update category error' });
    }
}

//[DELETE] api/category/managerDeleteCategory/:id
module.exports.managerDeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const productManager = await User.findOne({ token });
        if (!productManager || productManager.role !== 'productManager') {
            return res.status(403).json({ message: 'User not authorized to delete category or User not found!' });
        }

        const deletedCategory = await Category.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true },
            { new: true }
        );

        if (!deletedCategory) {
            console.error('Category deletion failed:', deletedCategory);
            return res.status(404).json({ message: 'Category not found.' });
        }

        return res.status(200).json({
            message: 'Category deleted successfully.',
            category: deletedCategory,
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({
            error: `${error.message}: delete category error`,
            stack: error.stack,
        });
    }
};


//[DELETE] api/category/adminDeleteCategory/:id

module.exports.adminDeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json({ message: 'Category deleted successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message + ': delete category error' });
    }
}