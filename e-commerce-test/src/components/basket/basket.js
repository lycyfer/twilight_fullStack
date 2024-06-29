import "./basket.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function Basket({ items }) {
    const [isRemoving, setIsRemoving] = useState(false);

    const map = {
        latitude: 0, longitude: 0, title: "Магазин Twilight", item: {

        }
    }

    const data = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const [basketItems, setBasketItems] = useState([]);
    const [totalPric, setTotalPrice] = useState(0)
    console.log(totalPric)
    console.log(items);
    const [quantity, setQuantity] = useState(items.items[0] ? items.items[0].quantity : []);
    console.log(quantity)

    useEffect(() => {
        if (items && items.items) {
            setBasketItems(items.items);
        } else {
            setBasketItems([]); // Устанавливаем пустой массив, если items не существует или не содержит items
        }
    }, [items]);
    const navigate = useNavigate()
    const handledPurchase = async () => {
        try {

            const totalPrice = basketItems.reduce((total, item) => total + item.totalPrice, 0);
            setTotalPrice(totalPrice)
            const response = await apiRequest.post('/basket/order', {
                userId: currentUser.id,
                items: basketItems,
                totalPrice,
                // storeId: selectedStoreId,
            });

            const updatedBasket = response.data;
            setBasketItems(updatedBasket.items);
            console.log(basketItems)
            navigate(`/basket/${currentUser.id}/buy`)
        } catch (err) {
            console.error('Error during fetch:', err);
        }
    };
    const increasePurchase = async (productId, size) => {
        console.log(productId)
        try {
            const response = await apiRequest.post("/basket/order/increase", {
                userId: currentUser.id,
                productId: productId,
                size: size,
                quantity: 1,
            });

            const updatedItem = response.data;

            setBasketItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: updatedItem.quantity }
                        : item
                )
            );
            setTotalPrice(basketItems.reduce((total, item) => total + item.totalPrice, 0));
            setQuantity(updatedItem.quantity);
            console.log(basketItems);
        } catch (err) {
            console.error("Error during fetch:", err);
        }
    };
    const decreasePurchase = async (productId, size) => {
        try {
            const response = await apiRequest.post("/basket/order/decrease", {
                userId: currentUser.id,
                productId: productId,
                size: size,
                quantity: 1,
            });

            const updatedItem = response.data;

            setBasketItems((prevItems) => {
                if (!Array.isArray(prevItems)) {
                    console.error('prevItems is not an array:', prevItems);
                    return prevItems; // Возвращаем неизмененный prevItems, если он не массив
                }

                return prevItems.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: updatedItem.quantity }
                        : item
                );
            });

            setTotalPrice((prevTotalPrice) => {
                const itemToUpdate = basketItems.find(
                    (item) => item.productId === productId && item.size === size
                );
                if (itemToUpdate) {
                    const updatedTotalPrice = prevTotalPrice - itemToUpdate.product.price;
                    return updatedTotalPrice;
                }
                return prevTotalPrice;
            });

            setQuantity(updatedItem.quantity);
            console.log(basketItems);
        } catch (err) {
            console.error("Error during fetch:", err);
        }
    };

    const handleRemove = async (itemId) => {
        try {
            await apiRequest.delete(`/basket/delete/${itemId}`);
            setBasketItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            setIsRemoving(true);
        } catch (err) {
            console.error("Error during fetch:", err);
        }
    };

    return (
        <div className="basket">
            <div className="flexBasketItem">
                {basketItems && basketItems.length > 0 ? (basketItems.map((item, index) => (
                    <div key={item.id} className="basket-item">
                        <div className="basket-title">
                            <div></div>
                            {/* <span>{item.quantity} изделие</span> */}
                        </div>
                        <div className="basket-item-block">
                            <div className="basket-item-img">
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="basketImg"
                                />
                            </div>

                            <div className="test-basket-block-flex">
                                <div className="basket-desc-block">
                                    <h3>{item.product.name}</h3>
                                    <span>Размер: {item.size}</span>

                                    <span>Цена: {item.product.price}</span>
                                </div>
                                <div className="changeFlexTest">
                                    <div className="changeQuantityBlock">
                                        <button
                                            onClick={() => increasePurchase(item.productId, item.size)}
                                            className="changeQuantity"
                                        >
                                            <svg
                                                width="15px"
                                                height="15px"
                                                viewBox="0 0 24 24"
                                                fill="#fff"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4 12H20M12 4V20"
                                                    stroke="#000"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <p className="quantity">{item.quantity}</p>
                                        <button
                                            onClick={() => decreasePurchase(item.productId, item.size)}
                                            className="changeQuantity"
                                        >
                                            <svg
                                                width="15px"
                                                height="15px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 12L18 12"
                                                    stroke="#000"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="deleteBlock">
                                        <svg
                                            width="30px"
                                            height="30px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 12V17"
                                                stroke="#fff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M14 12V17"
                                                stroke="#fff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M4 7H20"
                                                stroke="#fff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                                stroke="#fff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                stroke="#fff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <button
                                            className="delete"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : (<a href="/product" className="shopping">
                    За покупками
                </a>)}
            </div>
            <div className="basket-cart-totals-block">
                <div className="orderBlock-flex">
                    <span>
                        Корзина
                    </span>
                </div>
                <div className="orderBlockInfo-flex">
                    <h3>Адрес</h3>
                    <p>г. Москва, ул. Ленина, д. 12</p>
                    {basketItems && basketItems.length > 0 ? (
                        basketItems.map((item, index) => (
                            <div key={index} className="orderBlockInf-flex">
                                <span>{item.product.name}</span>
                                <span>Цена товара: {item.product.price}</span>
                                <span>Количество: {item.quantity}</span>
                            </div>
                        ))
                    ) : (<div>
                        {/* <h3>Адрес</h3>
                        <p>г. Москва, ул. Ленина, д. 12</p> */}
                    </div>)}
                </div>
                <div className="orderBuyButton" onClick={handledPurchase}>
                    Перейти к оформлению
                </div>
            </div>

        </div>
    );
}

export default Basket;
