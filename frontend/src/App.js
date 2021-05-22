import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route,Link } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';
import SigninScreen from './screens/SigninScreen';


function App() {
  const cart = useSelector(state => state.cart);
  const  cartItems  = cart.cartItems;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signOutHandler = () =>{
    dispatch(signout());
    //console.log(cartItems);
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div>
            <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {
                  cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )
                }

                </Link>
                {
                  userInfo 
                  ? 
                  <div className="dropdown">
                    <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}</Link>
                    <ul className="dropdown-content">
                      <Link to="/" onClick={signOutHandler}>Sign Out</Link>
                    </ul>
                  </div>
                  : 
                  <Link to="/signin">Sign-in</Link>
                }
                
            </div>
        </header>
        <main>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/product/:id"  component={ProductScreen}></Route>
        <Route path="/shipping" component={ShippingAdressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
         
        </main>
        <footer className="row center">
            All rights reserved
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
