import { useLoaderData, useLocation } from "react-router-dom";
import "./adminPanel.css";
import apiRequest from "../../lib/apiRequest";
import { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
    const [pdfData, setPdfData] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [priceSortOrder, setPriceSortOrder] = useState("asc");
    const { currentUser } = useContext(AuthContext);
    const [creditCard, setCreditCard] = useState([]);
    const [sortByStatus, setSortByStatus] = useState("");
    const [userOrderId, setUserOrderIt] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const location = useLocation();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    console.log(userOrderId);
    const statusMap = {
        waitingForPayment: "Ожидает оплаты",
        isPaid: "Оплачен",
        delivery: "Доставка",
        inTheWay: "В пути",
        cancelled: "Отменен",
    };
    const statusRole = {
        USER: "Пользователь",
        ADMIN: "Админ",
    };
    const handleStatusSortChange = (event) => {
        setSortByStatus(event.target.value);
    };

    const handleStatusSort = async (status) => {
        try {
            const res = await apiRequest.get(`basket/order/${userOrderId}`);
            setSortByStatus(status);
            if (res.data.length > 0) {
                setOrderItems(res.data);
                console.log("anime");
                console.log(res.data);
                if (sortByStatus) {
                    const filteredOrders = res.data.filter(
                        (order) => order.status === sortByStatus
                    );
                    console.log(filteredOrders);
                    setOrderItems(filteredOrders);
                } else {
                    setOrderItems(res.data);
                }
            } else {
                console.log("test");
                setOrderItems([]);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const downloadPNG = (order) => {
        console.log(order)
        const orderElement = document.getElementById(`order-to-pdf-${order.id}`);
        if (!orderElement) {
            console.error(`Элемент с идентификатором order-to-pdf-${order.id} не найден.`);
            return;
        }
        if (orderElement) {
            html2canvas(orderElement).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = imgData;
                link.download = `order_${order.id}.png`;
                link.click();
            });
        } else {
            console.error(
                `Элемент с идентификатором order-to-pdf-${order.id} не найден.`
            );
        }
    };

    const handleUserClick = async (userId) => {
        console.log(userId);
        setUserOrderIt(userId);
        // setOrderItems([]);
        try {
            const res = await apiRequest.get(`basket/order/${userId}`);
            if (res.data.length > 0) {
                setOrderItems(res.data);
                console.log(res.data);
                if (sortByStatus) {
                    const filteredOrders = res.data.filter(
                        (order) => order.status === sortByStatus
                    );
                    setOrderItems(filteredOrders);
                } else {
                    setOrderItems(res.data);
                }
            } else {
                setOrderItems([]);
            }
        } catch (err) {
            console.log(err);
        }
        try {
            const res = await apiRequest.get(`users/card/my/${userId}`);
            setCreditCard(res);
            console.log(res);
        } catch (err) { }
        setClickedUsers((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    const handleSortByPrice = () => {
        setOrderItems((prevItems) => {
            const sortedItems = [...prevItems].sort((a, b) => {
                return priceSortOrder === "asc"
                    ? a.totalPrice - b.totalPrice
                    : b.totalPrice - a.totalPrice;
            });
            return sortedItems;
        });
        setPriceSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleSortByDate = () => {
        setOrderItems((prevItems) => {
            const sortedItems = [...prevItems].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
            return sortedItems;
        });
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    console.log(orderItems);
    const downloadPDF = (order) => {
        const orderElement = document.getElementById(`order-to-pdf-${order.id}`);
        html2canvas(orderElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`order_${order.id}.pdf`);
        });
    };

    const [clickedUsers, setClickedUsers] = useState({});

    const deleteOrder = async (orderId) => {
        try {
            const res = await apiRequest.delete(`basket/order/${orderId}`);
            console.log(res);
            // fetchOrders();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiRequest.get(`basket/order/${userOrderId}`);
                setOrderItems(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchOrders();
    }, [userOrderId]);
    useEffect(() => {
        if (sortByStatus) {
            const sortedOrders = orderItems.filter(
                (order) => order.status === sortByStatus
            );
            setOrderItems(sortedOrders);
        }
    }, [sortByStatus]);

    const data = useLoaderData();
    return (
        <div>
            <div className="header-admin-panel">
                <div className="header-admin-panel-title">Панель Администратора</div>
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
            <div className="admin-panel-users">
                <div className="admin-user-info ">
                    <h1>Пользователи</h1>
                    {data.usersResponse.data.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleUserClick(item.id)}
                            className="admin-user"
                        >
                            {/* <div className="admin-user-avatar">
                                {item.avatar ? (
                                    <img src={item.avatar} alt="User Avatar" />
                                ) : (
                                    <p>Отсутствует</p>
                                )}
                            </div> */}
                            <div className="admin-user-details">
                                <p>
                                    <strong>Имя пользователя:</strong> {item.username}
                                </p>
                                <p>
                                    <strong>Электронная почта:</strong> {item.email}
                                </p>
                                <p>
                                    <strong>Телефон:</strong> {item.phone || "Отсутствует"}
                                </p>
                                <p>
                                    <strong>Роль:</strong>
                                    {statusRole[item.role] || "Неизвестная роль"}
                                </p>
                                <p>
                                    <strong>Баланс:</strong> {item.balance}
                                </p>

                                <p>
                                    <strong>Проверенный:</strong> {item.isVerified ? "Да" : "Нет"}
                                </p>
                                <p>
                                    <strong>Подтвержденный адрес электронной почты:</strong>{" "}
                                    {item.isEmailVerified ? "Да" : "Нет"}
                                </p>
                                <p>
                                    <strong>Созданно:</strong>{" "}
                                    {new Date(item.createdAt).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Обновлено:</strong>{" "}
                                    {new Date(item.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="admin-panel-orders">
                    <h1>Заказы пользователя: <span>{userOrderId}</span></h1>
                    {/* <p>{userOrderId}</p> */}
                    {orderItems ? (
                        <div className="sortButtons">
                            <button onClick={handleSortByPrice} className="sortOrder">
                                {priceSortOrder === "asc"
                                    ? "Сортировать по цене ↑"
                                    : "Сортировать по цене ↓"}
                            </button>
                            <button onClick={handleSortByDate} className="sortOrder">
                                {sortOrder === "asc"
                                    ? "Сортировать по дате ↑"
                                    : "Сортировать по дате ↓"}
                            </button>
                            <div className="status_order_admin">
                                <button onClick={() => handleStatusSort("")}>Все</button>
                                <button onClick={() => handleStatusSort("waitingForPayment")}>
                                    Ожидает оплаты
                                </button>
                                <button onClick={() => handleStatusSort("isPaid")}>
                                    Оплачен
                                </button>
                                <button onClick={() => handleStatusSort("delivery")}>
                                    Доставка
                                </button>
                                <button onClick={() => handleStatusSort("inTheWay")}>
                                    В пути
                                </button>
                                <button onClick={() => handleStatusSort("cancelled")}>
                                    Отменен
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {orderItems.length > 0 ? (
                        orderItems.map((order) => (
                            <div
                                key={order.id}
                                className="admin-order"
                                id={`order-to-pdf-${order.id}`}
                            >
                                <h3>Адрес</h3>
                                <p>г. Москва, ул. Ленина, д. 12</p>

                                <div className="admin-order-details">
                                    <p>
                                        <strong>Идентификатор заказа:</strong> {order.id}
                                    </p>
                                    <p>
                                        <strong>Итоговая цена:</strong> {order.totalPrice}
                                    </p>
                                    {/* <p>
                                        <strong>Идентификатор пользователя:</strong>{" "}
                                        {order.userId}
                                    </p> */}
                                    {/* <p>
                                        <strong>Имя :</strong>{" "}
                                        {order.guestName || "Отсутствует"}
                                    </p> */}
                                    <p>
                                        <strong>Оплачивается:</strong>{" "}
                                        {order.isPaid ? "Да" : "Нет"}
                                    </p>
                                    <p>
                                        <strong>Телефон:</strong> {order.phone || "Отсутствует"}
                                    </p>
                                    <p>
                                        <strong>Адрес:</strong> {order.address || "Отсутствует"}
                                    </p>
                                    <p>
                                        <strong>Статус:</strong>{" "}
                                        {statusMap[order.status] || "Неизвестный статус"}
                                    </p>
                                    <p>
                                        <strong>Созданно:</strong>{" "}
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Обновленный:</strong>{" "}
                                        {new Date(order.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="admin-order-items">
                                    {order.orderItems.map((item) => (
                                        <div key={item.id} className="admin-order-item">
                                            <p>
                                                <strong>Идентификатор продукта:</strong>{" "}
                                                {item.productId}
                                            </p>
                                            <p>
                                                <strong>Количество:</strong> {item.quantity}
                                            </p>
                                            <p>
                                                <strong>Цвет:</strong> {item.color || "Отсутствует"}
                                            </p>
                                            <p>
                                                <strong>Размер:</strong> {item.size || "Отсутствует"}
                                            </p>
                                            <p>
                                                <strong>В форме:</strong> {item.fit || "Отсутствует"}
                                            </p>
                                            <p>
                                                <strong>Цена:</strong> {item.totalPrice}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="orderButtonList">
                                    <button
                                        className="orderDownloadPdf"
                                        onClick={() => downloadPNG(order)}
                                    >
                                        Скачать
                                    </button>
                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="orderDownloadPdf"
                                    >
                                        Удалить заказ
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="takeUser">Нет доступных заказов.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
