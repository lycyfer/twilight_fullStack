import "./favoriteProduct.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const FavoriteProduct = ({ items }) => {
    console.log(items);
    const { currentUser } = useContext(AuthContext);
    const [favoriteItems, setFavoriteItems] = useState([]);
    console.log(favoriteItems);
    const navigate = useNavigate();
    const truncateDescription = (description) => {
        const maxLength = 100;
        return description.length > maxLength
            ? description.substring(0, maxLength) + "..."
            : description;
    };
    useEffect(() => {
        if (items && items.length > 0) {
            setFavoriteItems(items);
        }
    }, [items]);
    const [saved, setSaved] = useState(true);

    const handleSave = async (item) => {
        console.log("hi");
        if (!currentUser) {
            navigate("/login");
        }

        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/favorite/save", {
                userId: currentUser.id,
                productId: item.product.id,
            });
            setFavoriteItems((prevItems) => {
                return prevItems.filter(
                    (favItem) => favItem.product.id !== item.product.id
                );
            });
            setSaved(true);
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    };

    return (
        <div className="favorite">
            <div className="favorite-title">Понравившиеся товары</div>
            <div className="favoriteList-item">
                <div className="favoriteList-item-test">
                    {favoriteItems && favoriteItems.length > 0 ? (
                        favoriteItems.map((item) => (
                            <div key={item.id} className="test-absolute">
                                <div className="favoriteList-arrivals">
                                    <a
                                        href={`/product/${item.product?.id}`}
                                        className="cart-productList-second-test"
                                    >
                                        <img
                                            src={item.product?.images[0]}
                                            alt=""
                                            className="cart-productList-image-test"
                                        />
                                    </a>
                                    <p className="cart-productList-name-favorite">
                                        {item.product?.name}
                                    </p>
                                    <p className="cart-productList-name-favorite-desc">
                                        {truncateDescription(item.product?.description)}
                                    </p>
                                    <div className="footer_flex-box">
                                        <div className="cart-productList-price-test">
                                            {item.product?.price} ₽
                                        </div>
                                        <div className="favorite-flex-block">
                                            <button
                                                className="addPlus"
                                                onClick={() => handleSave(item)}
                                            >
                                                <svg
                                                    className="svgLike"
                                                    width="35px"
                                                    height="35px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                                        stroke="#fff"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <a href="/product" className="favorite_icon">
                            <svg
                                fill="#000000"
                                version="1.1"
                                width="100px"
                                height="100px"
                                viewBox="0 0 437.775 437.774"
                            >
                                <g>
                                    <path
                                        d="M437.775,150.801c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801C0,67.584,54.202,29.761,121.041,29.761
		c30.946,0,59.093,11.7,80.463,30.818l-55.744,80.925c-1.392,2.021-1.906,4.527-1.421,6.936c0.484,2.403,1.924,4.522,3.992,5.849
		l82.958,53.309l-38.178,46.08c-1.921,2.317-2.568,5.433-1.726,8.322l21.359,73.672c1.144,3.955,4.764,6.55,8.709,6.55
		c0.703,0,1.425-0.089,2.137-0.255c4.72-1.135,7.705-5.786,6.789-10.551l-12.975-67.033l54.456-54.725
		c1.832-1.841,2.784-4.383,2.624-6.966c-0.159-2.598-1.424-4.995-3.476-6.593l-71.732-55.925l77.963-93.629
		c1.584-1.906,2.317-4.383,2.033-6.845c-0.142-1.265-0.562-2.471-1.194-3.552c12.129-4.111,25.104-6.387,38.633-6.387
		C383.574,29.761,437.775,83.962,437.775,150.801z"
                                    />
                                </g>
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoriteProduct;
