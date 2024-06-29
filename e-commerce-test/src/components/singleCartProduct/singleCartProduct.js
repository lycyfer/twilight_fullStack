import { useDispatch, useSelector } from "react-redux"
import { store } from "../../redux/store"
import './singleCartProduct.css'
import { decreaseCartProductCount, increaseCartProductCount, removeProductFromCart } from "../../products/productSlice";

const SingleCartProduct = ({ id, currentSize, index }) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((store) => store.productsState.cartProducts);
    const cartProduct = cartProducts[index];

    console.log(index)
    if (!cartProduct || !cartProduct.fields) {
        return <div>Product not found</div>;
    }
    console.log(currentSize)
    const { image, name, price } = cartProduct.fields
    const handleRemoveFromCart = () => {
        dispatch(removeProductFromCart(index));
    };
    const handleIncreaseCount = () => {
        dispatch(increaseCartProductCount(index));
    };

    const handleDecreaseCount = () => {
        if (cartProduct.count > 1) {
            dispatch(decreaseCartProductCount(index));
        }
    };
    return (
        <div className="singleCartProduct">
            <div className="singleCartProduct-item">
                <img src={image} alt="" className="singleCartProduct-item-img" />
            </div>
            <div className="singleCartProduct-cart-info">
                <div className="singleCartProduct-item-name">{name}</div>
                <p className="singleCartProduct-item-price">{price}</p>
                {currentSize ? (
                    <p>Size: {currentSize}</p>
                ) : (
                    <p></p>
                )}
                <button
                    onClick={handleRemoveFromCart}
                    className="singleCartProduct-item-btn">
                    Убрать
                </button>
            </div>
            <div>
                <button className="singleCartProduct-item-up" onClick={handleIncreaseCount}>
                    <i className="singleCartProduct-up arrow up"></i>
                </button>
                <p className="singleCartProduct-item-amount">{cartProduct.count}</p>
                <button className="singleCartProduct-item-down" onClick={handleDecreaseCount}>
                    <i className="singleCartProduct-down arrow down"></i>
                </button>
            </div>
        </div>
    )
}

export default SingleCartProduct