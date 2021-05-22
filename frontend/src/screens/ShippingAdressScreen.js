import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingAdressScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const cart = useSelector(state => state.cart);
    const { shippingAdress } = cart;
    const { userInfo } = userSignin;
    if(!userInfo){
        props.history.push("/signin");
    }

    const [fullname, setFullname] = useState(shippingAdress.fullname);
    const [adress, setAdress] = useState(shippingAdress.adress);
    const [city, setCity] = useState(shippingAdress.city);
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
    const [country, setCountry] = useState(shippingAdress.country);

    const dispatch = useDispatch();

    const SubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAdress({fullname,adress,city,postalCode,country}));

        props.history.push("/payment");
    }

    return (
        <div>
           <CheckoutSteps step1 step2></CheckoutSteps>
           <div >
               <form className="form" onSubmit={SubmitHandler}>
                   <div>
                    <label htmlFor="full-name">Full Name</label>
                    <input 
                    type="text" 
                    id="full-name"
                    placeholder="enter full name"
                    required
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}></input>
                   </div>
                   <div>
                    <label htmlFor="adress">Adress</label>
                    <input 
                    type="text" 
                    id="adress"
                    placeholder="enter adress"
                    required
                    value={adress}
                    onChange={e => setAdress(e.target.value)}></input>
                   </div>
                   <div>
                    <label htmlFor="city">City</label>
                    <input 
                    type="text" 
                    id="city"
                    placeholder="enter city"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}></input>
                   </div>
                   <div>
                    <label htmlFor="postal-code">Postal Code</label>
                    <input 
                    type="text" 
                    id="postal-code"
                    placeholder="enter postal code"
                    required
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}></input>
                   </div>
                   <div>
                    <label htmlFor="country">Country</label>
                    <input 
                    type="text" 
                    id="country"
                    placeholder="enter Country"
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}></input>
                   </div>
                   <div>
                       <button type="submit" className="primary">Continue</button>
                   </div>
               </form>
           </div> 
        </div>
    )
}

export default ShippingAdressScreen
