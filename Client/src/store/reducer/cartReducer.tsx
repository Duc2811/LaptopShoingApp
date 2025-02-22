import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: { [userId: string]: CartItem[] }; // Thêm 'items' để rõ ràng hơn
}

const initialState: CartState = {
  items: {}, // Khởi tạo đúng kiểu cho items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ userId: string; item: CartItem }>) => {
      const { userId, item } = action.payload;
      
      // Kiểm tra xem state.items đã được khởi tạo chưa, nếu chưa thì khởi tạo nó
      if (!state.items) {
        state.items = {};
      }
    
      if (!state.items[userId]) {
        state.items[userId] = [];
      }
    
      const existingItem = state.items[userId].find(cartItem => cartItem.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items[userId].push({ ...item, quantity: item.quantity || 1 });
      }
    },
    
    removeFromCart: (state, action: PayloadAction<{ userId: string; productId: string }>) => {
      const { userId, productId } = action.payload;
      if (state.items[userId]) {
        state.items[userId] = state.items[userId].filter(item => item.productId !== productId);
      }
    },
    clearCart: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      if (state.items[userId]) {
        state.items[userId] = [];
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ userId: string; productId: string }>) => {
      const { userId, productId } = action.payload;
      const item = state.items[userId]?.find(item => item.productId === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ userId: string; productId: string }>) => {
      const { userId, productId } = action.payload;
      const item = state.items[userId]?.find(item => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
