import { UseDispatch, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../products/productSlice";


const SingleProduct = ({ item }) => {
    let dispatch = useDispatch()


    return (
        <Link to={`/product/${item.id}`} className='productList-arrivals'>
            <div className='cart-productList'>
                <img src={item.image} alt="" className='cart-productList-image' />
            </div>
            <p className='cart-productList-name'>{item.name}</p>
            <p className='cart-productList-price'>
                {item.price} ₽
            </p>
            <div className='cart-arrivals_more'>
                <div className='cart-productList-description'>
                    {item.description}
                </div>
                <div className='flex-button'>
                    <button className='cart-productList-button'>Add to Cart</button>
                    <button className='cart-productList-like'><img alt="" className='like' /></button>
                </div>
            </div>
        </Link>
    )

}

export default SingleProduct