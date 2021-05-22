import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { productDetails } from '../actions/productActions';
function ProductScreen(props) {
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1)
    const productdetails = useSelector(state => state.productDetails);
    const dispatch = useDispatch();

    const { loading,error,product } = productdetails;
    useEffect(()=>{
        dispatch(productDetails(productId));
    },[]);

    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    return (
        <div>
        {
          loading ? (
            <LoadingBox /> )  
            : error ? (
              <MessageBox variant="danger">{error}</MessageBox> 
            ) : (
                <div>
                <div><Link to="/">Back to result</Link></div>
                <div className="row top">
                    <div className="col-2">
                        <img clasName="large" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            />
                        </li>
                        <li>
                            price : ${product.price}
                        </li> 
                        <li>
                            description : {product.description}
                        </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                            <li>
                                <div className="row">
                                    <div>Price : </div>
                                    <div>${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status : </div>
                                    <div>
                                        {
                                            product.countInStock> 0 ? (<span className="success">In Stock</span>) :
                                            (<span className="danger"> Out of stock </span>) 
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button 
                                        onClick={addToCartHandler} 
                                        className="primary block"> 
                                        Add to Cart 
                                        </button>
                                    </li>
                                      
                                    </>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                )
            }
        </div>
        
    )
}

export default ProductScreen
