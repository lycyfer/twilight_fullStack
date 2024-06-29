
import { useEffect, useState } from "react";
import "./adminPanel.css"
import { useLoaderData, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

const AdminReport = () => {

    const { ordersResponse } = useLoaderData()
    const [isChecked, setIsChecked] = useState(false);
    const [orderItems, setOrderItems] = useState(ordersResponse.data || []);
    console.log(orderItems)
    console.log(orderItems)
    const location = useLocation();
    const [selectedPeriod, setSelectedPeriod] = useState('день');
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        calculateTotalSales(selectedPeriod);
    }, [orderItems, selectedPeriod]);

    const calculateTotalSales = (period) => {
        let total = 0;
        orderItems.forEach(order => {
            if (period === 'день' && isSameDay(order.createdAt)) {
                total += order.totalPrice;
            } else if (period === 'месяц' && isSameMonth(order.createdAt)) {
                total += order.totalPrice;
            } else if (period === 'год' && isSameYear(order.createdAt)) {
                total += order.totalPrice;
            }
        });
        setTotalSales(total);
    };

    const downloadPNG = (order) => {
        console.log(order)
        const orderElement = document.getElementById(`order-to-pdf-${order.id}`);
        if (!orderElement) {
            console.error(`Элемент с идентификатором order-to-pdf-${order.id} не найден.`);
            return;
        }
        html2canvas(orderElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = `order_${order.id}.png`;
            link.click();
        });
    };

    const isSameDay = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSameMonth = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSameYear = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getFullYear() === today.getFullYear();
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <div className="adminReport">
            <div className="header-admin-panel">
                <div className="header-admin-panel-title">Отчеты</div>
                <svg
                    width="200"
                    height="75"
                    viewBox="0 0 996 398"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_341_25)">
                        <path
                            d="M716.328 107.881H722L587 44.5L552 108L716.328 107.881Z"
                            fill="black"
                        />
                        <path d="M407 110L478 390L549 110H407Z" fill="black" />
                        <path d="M548 108L477 45.5L407 108H548Z" fill="black" />
                        <path d="M549.5 107L585 44H478.5L549.5 107Z" fill="black" />
                        <path
                            d="M234 108.475L255.5 108.5L404 108L369.5 45L234 108.475Z"
                            fill="black"
                        />
                        <path d="M234 110L477 390L404.508 110H234Z" fill="black" />
                        <path d="M479 390L722.067 110H551.559L479 390Z" fill="black" />
                        <g filter="url(#filter0_d_341_25)">
                            <path d="M405.5 107L371 44H475.5L405.5 107Z" fill="black" />
                        </g>
                        <g filter="url(#filter1_d_341_25)">
                            <path
                                d="M457.091 212V118.909H476.773V195.773H516.682V212H457.091Z"
                                fill="white"
                            />
                        </g>
                        <g filter="url(#filter2_d_341_25)">
                            <path
                                d="M366.376 110.182V212H344.849V110.182H366.376Z"
                                fill="white"
                            />
                        </g>
                        <g filter="url(#filter3_d_341_25)">
                            <path
                                d="M611.376 110.182V212H589.849V110.182H611.376Z"
                                fill="white"
                            />
                        </g>
                        <g filter="url(#filter4_d_341_25)">
                            <path
                                d="M0.97168 127.93V110.182H84.5939V127.93H53.422V212H32.1436V127.93H0.97168Z"
                                fill="black"
                            />
                        </g>
                        <g filter="url(#filter5_d_341_25)">
                            <path
                                d="M121.768 212L92.6348 110.182H116.151L133.004 180.928H133.849L152.443 110.182H172.578L191.122 181.077H192.017L208.871 110.182H232.386L203.253 212H182.273L162.884 145.43H162.088L142.749 212H121.768Z"
                                fill="black"
                            />
                        </g>
                        <g filter="url(#filter6_d_341_25)">
                            <path
                                d="M789.364 137.094C788.668 134.674 787.69 132.536 786.43 130.68C785.171 128.791 783.63 127.2 781.807 125.908C780.017 124.582 777.962 123.571 775.642 122.875C773.355 122.179 770.82 121.831 768.036 121.831C762.832 121.831 758.258 123.124 754.314 125.709C750.403 128.294 747.354 132.056 745.166 136.994C742.979 141.9 741.885 147.899 741.885 154.991C741.885 162.084 742.962 168.116 745.116 173.088C747.271 178.06 750.32 181.855 754.264 184.473C758.208 187.058 762.865 188.351 768.234 188.351C773.107 188.351 777.266 187.489 780.713 185.766C784.193 184.009 786.845 181.54 788.668 178.358C790.524 175.176 791.452 171.414 791.452 167.072L795.827 167.719H769.577V151.511H812.183V164.338C812.183 173.287 810.294 180.976 806.516 187.406C802.737 193.803 797.534 198.741 790.905 202.222C784.276 205.669 776.686 207.392 768.135 207.392C758.589 207.392 750.204 205.287 742.979 201.078C735.753 196.836 730.119 190.82 726.075 183.031C722.065 175.209 720.06 165.929 720.06 155.19C720.06 146.937 721.253 139.58 723.639 133.116C726.059 126.62 729.439 121.118 733.781 116.611C738.123 112.103 743.178 108.673 748.945 106.32C754.712 103.966 760.959 102.79 767.688 102.79C773.455 102.79 778.824 103.635 783.795 105.325C788.767 106.982 793.175 109.336 797.02 112.385C800.898 115.434 804.063 119.063 806.516 123.273C808.968 127.449 810.543 132.056 811.239 137.094H789.364Z"
                                fill="black"
                            />
                        </g>
                        <g filter="url(#filter7_d_341_25)">
                            <path
                                d="M822.849 205V103.182H844.376V145.192H888.077V103.182H909.554V205H888.077V162.94H844.376V205H822.849Z"
                                fill="black"
                            />
                        </g>
                        <g filter="url(#filter8_d_341_25)">
                            <path
                                d="M923.972 120.93V103.182H1007.59V120.93H976.422V205H955.143V120.93H923.972Z"
                                fill="black"
                            />
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_341_25"
                            x="371"
                            y="44"
                            width="116.5"
                            height="76"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter1_d_341_25"
                            x="457.091"
                            y="118.909"
                            width="71.5908"
                            height="106.091"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter2_d_341_25"
                            x="344.849"
                            y="110.182"
                            width="33.5273"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter3_d_341_25"
                            x="589.849"
                            y="110.182"
                            width="33.5273"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter4_d_341_25"
                            x="0.97168"
                            y="110.182"
                            width="95.6221"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter5_d_341_25"
                            x="92.6348"
                            y="110.182"
                            width="151.751"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter6_d_341_25"
                            x="720.06"
                            y="102.79"
                            width="104.123"
                            height="117.602"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter7_d_341_25"
                            x="822.849"
                            y="103.182"
                            width="98.7051"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter8_d_341_25"
                            x="923.972"
                            y="103.182"
                            width="95.6221"
                            height="114.818"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="9" dy="10" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_341_25"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_341_25"
                                result="shape"
                            />
                        </filter>
                        <clipPath id="clip0_341_25">
                            <rect width="996" height="398" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <label className="menuButton">
                    <input
                        id="check"
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span className="top"></span>
                    <span className="mid"></span>
                    <span className="bot"></span>
                </label>
                {isChecked && (
                    <div className="menuLinks">
                        <a href="/admin/order" className={`menuLink ${location.pathname === '/admin/order' ? 'active' : ''}`}>Управление заказами</a>
                        <a href="/admin/report" className={`menuLink ${location.pathname === '/admin/report' ? 'active' : ''}`}>Отчеты</a>
                        <a href="/admin" className={`menuLink ${location.pathname === '/admin' ? 'active' : ''}`}>Админ панель</a>
                        <a href="/" className={`menuLink ${location.pathname === '/' ? 'active' : ''}`}>Вернуться на сайт</a>
                    </div>
                )}
            </div>
            <div className="adminReport-items">
                <div className="period-buttons">
                    <button onClick={() => setSelectedPeriod('день')}>День</button>
                    <button onClick={() => setSelectedPeriod('месяц')}>Месяц</button>
                    <button onClick={() => setSelectedPeriod('год')}>Год</button>
                </div>
                <h2>Общая сумма продаж за {selectedPeriod}: {totalSales} руб.</h2>
            </div>
            {/* <button onClick={() => orderItems.forEach(order => downloadPNG(order))}>Скачать</button> */}
            <div className="adminReport-block" >
                <table>
                    <thead>
                        <tr>
                            <th>Id товара</th>
                            <th>Стоимость</th>
                            <th>Количество</th>
                            <th>Общая стоимость</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((order) => (
                            order.orderItems.map((item) => (
                                <tr key={item.id} id={`order-to-pdf-${item.id}`}>
                                    <td>{item.id}</td>
                                    <td>{item.totalPrice} руб.</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalPrice * item.quantity} руб.</td>
                                    <td><button
                                        className="orderDownloadPdf"
                                        onClick={() => downloadPNG(item)}
                                    >
                                        Скачать
                                    </button></td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default AdminReport;