import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import "./profilePage.css"
// import CreditCard from "../creditCard/creditCard";
import twilightCard from "./Typo.png"
import noavatar from "./img/no-avatar.png"
import List from "../list/list";
import FavoriteProduct from "../favoriteProduct/favoriteProduct";
import example from "./img/Example_3.png"
import Time from 'react-time-format'

const ProfilePage = () => {

    const data = useLoaderData()
    console.log(data)
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creditCard, setCreditCard] = useState([])
    const [creditCardData, setCreditCardData] = useState(null);
    console.log(creditCard)
    console.log(currentUser)
    console.log(orders)
    let celebrateDay = new Date(`${currentUser.updatedAt}`);

    const statusTranslations = {
        'pending': 'Ожидание',
        'processing': 'Обработка',
        'shipped': 'Отправлено',
        'delivered': 'Доставлено',
        'cancelled': 'Отменено',
        // Add more status codes and translations as needed
    };
    function translateStatus(statusCode) {
        return statusTranslations[statusCode] || 'Неизвестный статус';
    }

    // console.log(creditCardData)
    console.log(celebrateDay)
    const handleLogout = async () => {
        try {
            await apiRequest.post("/logout")
            // updateUser(null);
            navigate("/");
            localStorage.removeItem("user")
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiRequest.get(`/basket/order/${currentUser.id}`);
                console.log(response)
                setOrders(response.data);

            } catch (error) {
                console.error(error);
            }
            try {
                const res = await apiRequest.get(`users/card/my/${currentUser.id}`)
                setCreditCard(res)
                setCreditCardData(new Date(res.data.createdAt));
                console.log(res)
            } catch (err) {

            }
        };

        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser]);

    const renderCreditCardInfo = () => {
        if (creditCardData) {
            return (
                <span>
                    Кредитная карта привязана:
                    <b>
                        <Time value={creditCardData} format="YYYY.MM.DD hh:mm" />
                    </b>
                </span>
            );
        }
        return null; // or a default message or component
    };


    return (
        <div className="profilePage_sigma-test">
            <div className="profile-title">Профиль</div>
            <div className="profilePage">
                <div className="profilePage-block">
                    <div className="profileInfoBlock">
                        <div>
                            <div className="infoUser">
                                <h1>Информация о пользователе</h1>
                                <div className="wrapper">
                                    <div className="title">

                                        <a href="/profile/update">
                                            <button className="updateProfile">Обновить профиль</button>
                                        </a>
                                    </div>
                                    <div className="info">
                                        <span>
                                            Аватар:
                                            <img
                                                src={currentUser.avatar || noavatar}
                                                alt=""
                                                className="profileAvatar"
                                            />
                                        </span>
                                        <span>
                                            Имя: <b>{currentUser.username}</b>
                                        </span>
                                        <span>
                                            Почта: <b>{currentUser.email}</b>
                                        </span>
                                        {creditCard ? renderCreditCardInfo() : <div>Нет информации о кредитной карте</div>}
                                        <span>
                                            Баланс: <b>{currentUser.balance}</b>
                                        </span>
                                        <span>Телефон: <b>{currentUser.phone || "8-928-810-05-75"}</b></span>
                                        <span>Обновлено:<b> <Time value={celebrateDay} format="YYYY.MM.DD  hh:mm" /></b></span>
                                        <button onClick={handleLogout} className="profileLogout" >Выход</button>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-product">
                                <a href={`basket/${currentUser.id}/buy`}>Продолжить покупки</a>
                                <div class="diamond-wrapper">
                                    <svg class="diamond" fill="#fff" width="150px" height="150px" viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <title>diamond</title>
                                        <path d="M20.4 13l-3.72-5.12c-0.16-0.2-0.4-0.36-0.68-0.36h-11.44c-0.28 0-0.52 0.12-0.68 0.36l-3.72 5.12c-0.24 0.32-0.2 0.76 0.080 1.040l9.44 10.16c0.16 0.16 0.36 0.28 0.6 0.28s0.44-0.080 0.6-0.28l9.44-10.16c0.28-0.28 0.32-0.72 0.080-1.040zM6.28 14.32l2 5.96-5.52-5.96h3.52zM11.040 9.2l1.4 3.48h-4.32l1.4-3.48h1.52zM12.52 14.32l-2.24 6.72-2.24-6.72h4.48zM14.28 14.32h3.52l-5.52 5.96 2-5.96zM18.080 12.64h-3.84l-1.4-3.44h2.72l2.52 3.44zM4.96 9.2h2.72l-1.4 3.48h-3.8l2.48-3.48z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="buy-product">
                                <a href={`basket/${currentUser.id}/buy`}>Пополнить баланс</a>
                                <div class="diamond-wrapper">
                                    <svg class="diamond" fill="#fff" width="150px" height="150px" viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <title>diamond</title>
                                        <path d="M20.4 13l-3.72-5.12c-0.16-0.2-0.4-0.36-0.68-0.36h-11.44c-0.28 0-0.52 0.12-0.68 0.36l-3.72 5.12c-0.24 0.32-0.2 0.76 0.080 1.040l9.44 10.16c0.16 0.16 0.36 0.28 0.6 0.28s0.44-0.080 0.6-0.28l9.44-10.16c0.28-0.28 0.32-0.72 0.080-1.040zM6.28 14.32l2 5.96-5.52-5.96h3.52zM11.040 9.2l1.4 3.48h-4.32l1.4-3.48h1.52zM12.52 14.32l-2.24 6.72-2.24-6.72h4.48zM14.28 14.32h3.52l-5.52 5.96 2-5.96zM18.080 12.64h-3.84l-1.4-3.44h2.72l2.52 3.44zM4.96 9.2h2.72l-1.4 3.48h-3.8l2.48-3.48z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="infoUserBuy">
                            <h1>Информация о покупках</h1>
                            <div className="wrapper-buy">
                                <div className="purchase-info">
                                    {orders.map((order) => (
                                        <div key={order.id} className="order">
                                            <span>Заказ {order.id}</span>
                                            <span>Статус: {translateStatus(order.status)}</span>
                                            <span>Общая стоимость: {order.totalPrice}</span>
                                            <div className="order-items">
                                                {order.orderItems.map((item) => (
                                                    <div key={item.id} className="order-item-test">
                                                        <p className="orderItem-name"> {item.productName}</p>
                                                        <p>Количество: {item.quantity}</p>
                                                        <p>Размер: {item.size}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardPay">
                        {/* <CreditCard /> */}
                        <div className="loyalty ">Система Лояльности</div>
                        <div className="loyalty-decs">Бонусная пластиковая карта ювелирного магазина <span>TWILIGHT</span> - это привилегированный инструмент для постоянных клиентов, открывающий доступ к ряду привилегий и бонусов в магазине.</div>
                        <div className="loyalty-card">
                            <div className="test-card-desc_flex">
                                <div className="test-card-desc"><span>Накопительная система бонусов:</span> Каждая покупка с использованием карты приносит клиенту бонусные баллы, которые накапливаются на его счету. Эти баллы можно обменивать на дополнительные скидки или подарки от магазина.</div>
                                <div className="test-card-desc"><span>Персонализированный сервис:</span>  Держатели карты TWILIGHT получают персонализированный сервис и предложения, а также получают информацию о новых коллекциях и акциях магазина.</div>

                            </div>
                            <img src={twilightCard} alt="" className="twilightCard" />
                        </div>
                    </div>
                    <img src={example} alt="" className="example" />

                </div>
            </div>
        </div >
    )
}

export default ProfilePage;