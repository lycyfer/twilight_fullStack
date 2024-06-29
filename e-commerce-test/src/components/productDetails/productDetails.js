import './productDetails.css'
import { useLoaderData, useNavigate } from 'react-router-dom';
import './productDetails.css'
// import PageHero from '../page/pageHero';
import { useState, useEffect, useContext } from 'react';
import Slider from '../slider/slider';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const ProductDetails = () => {
    const productTest = useLoaderData();
    const { currentUser } = useContext(AuthContext);

    console.log(productTest)
    const [saved, setSaved] = useState(
        Array.isArray(productTest.savedProduct) && productTest.savedProduct.length > 0
    );

    const [selectedSize, setSelectedSize] = useState(null);
    console.log(selectedSize)
    const handleAddToCart = (size) => {
        setSelectedSize(size);

    };

    const navigate = useNavigate();
    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
        }

        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/favorite/save", {
                userId: currentUser.id,
                productId: productTest.id
            });
            setSaved(true)

        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    };
    useEffect(() => {
        setSaved(productTest.isSaved);
    }, [productTest.isSaved]);



    const addProductToBasket = async () => {
        const userId = currentUser.id;
        const productId = productTest.id;
        const quantity = 1;
        const size = selectedSize;
        const price = productTest.price
        console.log(userId, productId, quantity, size, price)
        try {
            const res = await apiRequest.post("/basket/add", {
                userId,
                productId,
                quantity,
                size,
                price
            });

            console.log(res.data);
        } catch (err) {
            console.error(err);

        }
    }


    return (
        <div className='productDetails'>
            {/* <PageHero path={location.pathname} /> */}
            <div className='productDetails-block'>
                <div className='productDetails-img'>
                    <Slider images={productTest.images} />
                </div>
                <div className='productDetails-text'>
                    <h2 className='productDetails-name'>{productTest.name}</h2>
                    <div className='productDetails-type'>{productTest.categoryId}</div>
                    <div className='productDetails-price'>{productTest.price} ₽</div>
                    <div className='productDetails-size-block'>
                        {productTest.sizes && productTest.sizes.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => handleAddToCart(size)}
                                className={selectedSize === size ? 'size-block size-active' : 'size-block '}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className='addButton'>
                        {productTest.sizes && productTest.sizes.length > 0 && (
                            <button
                                onClick={addProductToBasket}
                                className='productDetails-button'
                                disabled={!selectedSize}
                            >
                                {selectedSize ? 'Добавить в корзину' : 'Выбери размер'}
                            </button>
                        )}

                        <button onClick={handleSave} className={saved ? 'productDetails-like-active productDetails-like' : 'productDetails-like'}><svg width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></button>
                    </div>
                    <p className='desc'>Описание</p>
                    <div className='productDetails-desc'>
                        <p>{productTest.description}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails