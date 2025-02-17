const User = require('../../models/user')
const Cart = require('../../models/cart')
const Product = require('../../models/product')

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, instance } = req.body

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const userId = user._id
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const existingProductIndex = cart.product.findIndex((p) => p.productId.toString() === productId);
            if (existingProductIndex > -1) {
                cart.product[existingProductIndex].quantity += quantity;
            } else {
                cart.product.push({ productId, quantity });
            }
            await cart.save();
            return res.status(200).json({ message: "Cart updated successfully", cart });
        } else {
            const newCart = new Cart({
                userId,
                product: [{ productId, quantity }],
                instance,
            });
            await newCart.save()
            res.status(200).json({ message: 'Product added to cart' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getCartByUserID = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const userId = user._id

        const cart = await Cart.findOne({ userId }).populate("product.name");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const userId = user._id

        const cart = await Cart.findOneAndDelete({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

exports.updateCart = async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const userId = user._id
        
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.product.findIndex((p) => p.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.product[productIndex].quantity = quantity;
        await cart.save();

        return res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};