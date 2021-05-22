import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let search = new URLSearchParams(props.location.search);
    const redirect = search.get("redirect") ? search.get("redirect") : "/";

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo]);

    const dispatch  = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                    type="email" 
                    id="email" 
                    placeholder="enter email" 
                    required 
                    onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id="password" 
                    placeholder="enter password" 
                    required 
                    onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit" className="primary">Sign In</button>
                </div>
                <div>
                    <div>New Customer ?{' '} 
                        <Link to={`/register?redirect=${redirect}`}>Create account here</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
