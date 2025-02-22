const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModel = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Delivering", "Shipped", "Completed", "Cancelled"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Wallet", "COD", "Bank Transfer"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },
        address: {
            type: String,
            required: function () {
                return this.paymentMethod === "COD";
            },
        },
        note: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderModel);
