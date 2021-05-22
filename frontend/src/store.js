
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productListReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducer';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducer';

const initialState = {
    userSignin : {
        userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart : {
        cartItems : localStorage.getItem('cartItems') 
                    ? JSON.parse(localStorage.getItem('cartItems')) 
                    : [],
        
        shippingAdress : localStorage.getItem('shippingAdress') 
                        ? JSON.parse(localStorage.getItem('shippingAdress')) 
                        : {},
        
        paymentMethod : "PayPal"
    },

};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composeEnhancer(applyMiddleware(thunk)));

export default store;