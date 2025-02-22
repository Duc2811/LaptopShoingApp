const Order = require('../../models/order');
const Product = require('../../models/product');
const User = require('../../models/user');
const pagination = require('../../../helper/pagination');


module.exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount, paymentMethod, address, note } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }

        const order = new Order({
            userId: user._id,
            products: products,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            address: address,
            note: note,
        });
        await order.save();
        res.status(200).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        order.orderStatus = status;
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus, paymentMethod } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        order.paymentMethod = paymentMethod;
        order.paymentStatus = paymentStatus;
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }

        const orders = await Order.find({ userId: user._id })
            .populate('products.productId')
            .sort({ createdAt: -1 });

        const paginatedOrders = pagination(orders, page, limit);

        res.status(200).json({
            message: 'Orders fetched successfully',
            orders: paginatedOrders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.getOrdersDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const order = await Order.findById(id).populate('products.product').populate('user').exec();
        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        res.status(200).json({ message: 'Order details fetched successfully', order });
    } catch (error) {
        console.error('Error fetching order details:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.userCancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        order.orderStatus = "Cancelled";
        await order.save();
        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error('Error cancelling order:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}