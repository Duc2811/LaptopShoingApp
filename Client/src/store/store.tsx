import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import userReducer from './reducer/userReducer'
import cartReducer from './reducer/cartReducer'
import orderReducer from './reducer/orderReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart", "order"],
}


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    order: orderReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch