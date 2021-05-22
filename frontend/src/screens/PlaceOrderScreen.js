import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push("/payment");
    }

    
    const toPrice = (num) => Number(num);
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a,c) => a+(c.qty*c.price),0)
    )
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

    cart.totalPrice = cart.itemsPrice+cart.shippingPrice+cart.taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () =>{
         dispatch(createOrder({...cart, orderItems : cart.cartItems}));
        
    }

    const orderCreate = useSelector(state => state.orderCreate);

    const { loading,success,error,order} = orderCreate;

    // const modifiedOrder = JSON.parse(JSON.stringify(order));
    // console.log(modifiedOrder);
    

    // const {_id} = order;S
    // console.log(_id);

   // console.log(orderCreate.order._id);

    // console.log(order);
    // console.log(typeof(order));
    // console.log(orderCreate);
    // console.log(object.keys)

    useEffect(() =>{
        if(success){
        dispatch({type : ORDER_RESET});
        props.history.push(`/order/${order._id}`);
        }
    },[success,dispatch]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong>{cart.shippingAdress.fullname}<br/>
                                    <strong>Adress : </strong>{cart.shippingAdress.adress}, 
                                    {cart.shippingAdress.city}, {cart.shippingAdress.postalCode}, {cart.shippingAdress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>payment method : </strong>{cart.paymentMethod}<br/> 
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                {
                                    cart.cartItems.map(item => {
                                        return (<li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img  src={item.image} alt={item.name} className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                
                                                <div>{item.qty} x ${item.price} = ${item.qty*item.price}</div>
                                                
                                            </div>
                                        </li>)
                                    })
                                } 
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li>
                            <div>
                                <h2>Order Summary</h2>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                <div>${cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div>${cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div><strong>Total Price</strong></div>
                                <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <button 
                                type="button"
                                className="primary block" 
                                onClick={placeOrderHandler}
                                disabled={cart.cartItems.length === 0} >Place Order</button>
                            </div>
                        </li>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
