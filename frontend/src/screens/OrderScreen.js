import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import axios from 'axios';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder } from '../actions/orderActions';

function OrderScreen(props) {
    
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    //console.log(orderDetails);
    const { order,loading,error }  = orderDetails;
    //console.log(order);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(detailsOrder(orderId));
    },[orderId]);

    // return (
    //     <h1>This is order screen for displaying the details of placed order.</h1>
    // )

    return loading ? (<LoadingBox></LoadingBox>)  : 
    error ? (<MessageBox variant="danger">{error}</MessageBox> ) :
    (
        <div>
            <h1>Order : {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong>{order.shippingAdress.fullname}<br/>
                                    <strong>Adress : </strong>{order.shippingAdress.adress}, 
                                    {order.shippingAdress.city}, {order.shippingAdress.postalCode}, {order.shippingAdress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>payment method : </strong>{order.paymentMethod}<br/> 
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                {
                                    order.orderItems.map(item => {
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
                                <div>${order.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div>${order.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${order.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div><strong>Total Price</strong></div>
                                <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
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

export default OrderScreen
