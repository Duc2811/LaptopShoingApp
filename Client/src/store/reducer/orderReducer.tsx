import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  orderId: string;
  products: CartItem[];
  totalAmount: number;
  paymentStatus: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    checkout: (state, action: PayloadAction<{ orderId: string; products: CartItem[]; totalAmount: number }>) => {
      if (action.payload.products.length === 0) return;

      const newOrder: Order = {
        orderId: action.payload.orderId,
        products: action.payload.products,
        totalAmount: action.payload.totalAmount,
        paymentStatus: "Pending",
      };

      state.orders.push(newOrder);
    },

    updatePaymentStatus: (state, action: PayloadAction<{ orderId: string; status: string }>) => {
      const order = state.orders.find(o => o.orderId === action.payload.orderId);
      if (order) {
        order.paymentStatus = action.payload.status;
      }
    },
  },
});

export const { checkout, updatePaymentStatus } = orderSlice.actions;
export default orderSlice.reducer;
