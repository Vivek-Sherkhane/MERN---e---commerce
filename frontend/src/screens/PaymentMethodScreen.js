import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAdress } = cart;
    if(!shippingAdress.adress){
        props.history.push("/shipping");
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push("/placeorder");
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="PayPal" 
                    checked 
                    required 
                    id="paypal"
                    onChange={e => setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div>
                    <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Stripe" 
                    required 
                    id="stripe"
                    onChange={e => setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button type="submit" className="primary">Proceed to pay</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodScreen
