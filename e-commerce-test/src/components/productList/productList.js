import model1 from './img/model-demonstrating-earrings-and-ring.jpg'
import './productList.css'
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import List from '../list/list';



const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    const data = useLoaderData();
    const products = data.productResponse.data;
    console.log(data)
    useEffect(() => {
        const categories = Array.from(new Set(products.flatMap(item => item.categoryId)));
        setAllCategories(categories);
    }, [products]);

    const filteredProducts = selectedCategory
        ? products.filter(item => item.categoryId === selectedCategory)
        : products;

    return (
        <>
            <div className="productList-banner">
                <img src={model1} alt="" />
                <div className='productList-banner_info'>
                    <span className='productList-banner_logo'>Twilight</span>
                    <div className='productList-subLogo'>магазин женских аксессуаров</div>
                </div>
            </div>
            <div className='productList-details'>Все украшения</div>
            <div className='productList-actions'>
                <div className='productList-item'>
                    <Suspense fallback={<p>Loading...</p>}>
                        <List
                            items={filteredProducts}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            allCategories={allCategories}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

export default ProductList;