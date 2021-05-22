import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let search = new URLSearchParams(props.location.search);
    const redirect = search.get("redirect") ? search.get("redirect") : "/";

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo]);

    const dispatch  = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword)
        {
            alert("password and confirm password do not match.");
        } else {
            dispatch(register(name,email,password));
        }
        
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">User Name</label>
                    <input 
                    type="name" 
                    id="name" 
                    placeholder="enter username" 
                    required 
                    onChange={e => setName(e.target.value)}></input>
                </div>
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
                    <label htmlFor="confirm password">Confirm Password</label>
                    <input 
                    type="password" 
                    id="confirm password" 
                    placeholder="enter confirm password" 
                    required 
                    onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit" className="primary">Register</button>
                </div>
                <div>
                    <div>Already have an account ?{' '} 
                        <Link to={`/signin?redirect=${redirect}`}>signin here</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
