import { useLoaderData } from "react-router-dom";
import CreditCard from "../creditCard/creditCard";
import { useContext, useEffect, useState } from "react";
import { Icon } from "leaflet";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./basketPay.css"
import {
    MapContainer,
    TileLayer,
    useMapEvent,
    Marker,
    useMapEvents,
} from "react-leaflet";
import MainScreen from "../screens";

const customMarkerIcon = new Icon({
    iconUrl: 'https://www.saloikumkm.malutprov.go.id/assets/img/location.png',
    iconSize: [31, 41],
    iconAnchor: [31, 41],
});
const svgMarkup = `<svg width="25px" height="41px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 14.2864C3.14864 15.1031 2 16.2412 2 17.5C2 19.9853 6.47715 22 12 22C17.5228 22 22 19.9853 22 17.5C22 16.2412 20.8514 15.1031 19 14.2864M18 8C18 12.0637 13.5 14 12 17C10.5 14 6 12.0637 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`


function LocationMarker({ setLatitude, setLongitude, setAddress }) {
    const map = useMapEvents({
        click(e) {
            setLatitude(e.latlng.lat);
            setLongitude(e.latlng.lng);
            map.flyTo(e.latlng, map.getZoom());
            getAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
        },
    });

    const getAddressFromCoordinates = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            setAddress(data.display_name);
        } catch (error) {
            console.error('Ошибка при получении адреса:', error);
            setAddress('Не удалось получить адрес');
        }
    };

    return null;
}

function Map({ latitude, longitude, setLatitude, setLongitude, setAddress }) {
    const position = [latitude, longitude];
    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className='map_pay'
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setAddress={setAddress}
            />
            <Marker position={position} icon={customMarkerIcon} />
        </MapContainer>
    );
}


const BasketPay = () => {

    const data = useLoaderData()
    const { currentUser } = useContext(AuthContext)
    console.log(data)
    const [orders, setOrders] = useState([])
    const [latitude, setLatitude] = useState(45.04476164910104); // Пример начальной широты
    const [longitude, setLongitude] = useState(38.9779547380371);
    const [address, setAddress] = useState('');
    const [timer, setTimer] = useState(null);

    console.log(orders)
    const statusMap = {
        waitingForPayment: 'Ожидает оплаты',
    };

    const updateTimer = (order) => {
        const createdAt = new Date(order.createdAt);
        const now = new Date();
        const diff = now - createdAt;
        const remainingTime = 10 * 60 * 1000 - diff; // 10 минут в миллисекундах

        if (remainingTime <= 0) {
            // Если время вышло, очищаем таймер
            clearInterval(timer);
            setTimer(null);
        } else {
            // Обновляем оставшееся время
            setTimer(remainingTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    useEffect(() => {
        if (orders.length > 0) {
            // Filter the orders to only include 'waitingForPayment' status
            const filteredOrders = orders.filter(order => order.status === 'waitingForPayment');

            const newTimers = filteredOrders.map((order) => {
                return setInterval(() => updateTimer(order), 1000);
            });

            timer && clearInterval(timer);
            setTimer(newTimers);
        }

        // Очищаем таймеры при размонтировании компонента
        return () => {
            timer && timer.forEach((t) => t && clearInterval(t));
        };
    }, [orders]);

    const getAddressFromCoordinates = async (lat, lng) => {
        try {

            return 'Неизвестный адрес'; // Заглушка для примера
        } catch (error) {
            console.error(error);
            return 'Не удалось получить адрес';
        }
    };

    const handleBuyClick = async (orderId) => {
        try {

            console.log(`Заказ ${orderId} оплачен с адресом: ${address}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiRequest.get(`/basket/order/${currentUser.id}`);
                console.log(response);
                // Filter the orders to only include 'waitingForPayment' status
                const filteredOrders = response.data.filter(order => order.status === 'waitingForPayment');
                setOrders(filteredOrders);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser]);

    useEffect(() => {
        const updateAddress = async () => {
            const newAddress = await getAddressFromCoordinates(latitude, longitude);
            setAddress(newAddress);
        };

        updateAddress();
    }, [latitude, longitude]);

    return (
        <div className="basketPay">
            <div className="basketPay-block">
                {orders.map((order) => (
                    <div key={order.id} className="orderBuy">
                        <div className="footer-order">
                            <span>Заказ {order.id}</span>
                            <span>Статус: {statusMap[order.status] || 'Неизвестный статус'}</span>
                            <span>Общая стоимость: {order.totalPrice}</span>
                            <span>Осталось времени: {timer ? formatTime(timer) : 'Неизвестно'}</span>
                        </div>
                        <div className="order-items-buy">
                            {order.orderItems.map((item) => (
                                <div key={item.id} className="order-item-test-buy">
                                    <p className="orderItem-name-buy"> {item.productName}</p>
                                    <p>Количество: {item.quantity}</p>
                                    <p>Размер: {item.size}</p>
                                </div>
                            ))}
                        </div>
                        <iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=1342M36F1OU.240602&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
                        {/* <a href="https://yoomoney.ru/bill/pay/1342LP5TJUH.240602" onClick={() => handleBuyClick(order.id)}>Оплатить</a> */}
                        <form method="POST" className="yMoneyForm" action="https://yoomoney.ru/quickpay/confirm">
                            <input type="hidden" name="receiver" value="41001xxxxxxxxxxxx" />
                            <input type="hidden" name="label" value="$order_id" />
                            <input type="hidden" name="quickpay-form" value="button" />
                            <input type="hidden" name="sum" value="4568.25" data-type="number" />
                            <label><input type="radio" name="paymentType" value="PC" />ЮMoney</label>
                            <label><input type="radio" name="paymentType" value="AC" />Банковской картой</label>
                            <input className="send_value" type="submit" value="Оплатить" />
                        </form>
                    </div>
                ))}
            </div>
            <div className="map_delivery">
                <h2>Адрес доставки: </h2>
                <div className="address_delivery">{address || 'Не выбран'}</div>
                <Map
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    setAddress={setAddress}
                />
                <div>
                    <div className="latitudeLongitude">
                        <div>Широта: {latitude}</div>
                        <div> Долгота: {longitude}</div>
                    </div>
                    <div className="deliveryUnit_flex">
                        <div className="deliveryUnit">
                            <div class="checkbox-wrapper">
                                <input id="_checkbox-26" type="checkbox" />
                                <label for="_checkbox-26">
                                    <div class="tick_mark"></div>
                                </label>
                            </div>
                            <p>Доставка (+500 рублей)</p>
                        </div>
                        <div className="deliveryUnit">
                            <div class="checkbox-wrapper">
                                <input id="_checkbox-27" type="checkbox" />
                                <label for="_checkbox-27">
                                    <div class="tick_mark"></div>
                                </label>
                            </div>
                            <p>Самовызвов</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BasketPay;