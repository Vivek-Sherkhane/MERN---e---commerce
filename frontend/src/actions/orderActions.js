import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) =>async(dispatch,getState) =>{
    
    dispatch({
        type : ORDER_CREATE_REQUEST,
        payload : order
    })
    try{
        const {userSignin : {userInfo}} = getState();
        const { data } = await axios.post('/api/order',order, {
            headers : {
                authorization : `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data.order
        });
        dispatch({
            type : CART_EMPTY,
        });
        localStorage.removeItem("cartItems");

    } catch(error) {
        dispatch({
            type : ORDER_CREATE_FAIL,
            payload : error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
};


export const  detailsOrder = (orderId) => async(dispatch,getState) =>{
    const {userSignin : {userInfo}} = getState();
    dispatch({
        type : ORDER_DETAILS_REQUEST,
        payload : orderId
    });
    try{ 
        const  {data}  = await axios.get(`/api/order/${orderId}`,{
            headers : {
                authorization : `Bearer ${userInfo.token}`
            }
        })
         console.log(data);
        dispatch({
            type : ORDER_DETAILS_SUCCESS,
            payload : data
        }) 

    } catch(error) {
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response && error.response.data.message 
                      ? error.response.data.message
                      : error.message
        });
    }

} 