import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';

function List({ items, selectedCategory, setSelectedCategory, allCategories }) {
    const [sizeFilter, setSizeFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [hoveredItem, setHoveredItem] = useState(null);
    const [stoneFilter, setStoneFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [materialFilter, setMaterialFilter] = useState('');
    const categories = allCategories;

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handlePriceChange = (event, type) => {
        const value = Number(event.target.value);
        setPriceRange(prev => ({ ...prev, [type]: value }));
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    const handleSizeFilterChange = (event) => {
        setSizeFilter(event.target.value);
    };
    const handleStoneFilterChange = (event) => {
        setStoneFilter(event.target.value);
    };

    const handleBrandFilterChange = (event) => {
        setBrandFilter(event.target.value);
    };

    const handleMaterialFilterChange = (event) => {
        setMaterialFilter(event.target.value);
    };

    const formatCategory = (category) => {
        switch (category) {
            case 'ring':
                return 'Кольцо';
            case 'watch':
                return 'Часы';
            case 'earrings':
                return 'Серьги';
            case 'pendant':
                return 'кулоны';
            case 'bracelet':
                return 'браслет';
            case 'chain':
                return 'цепи';
            case 'brooch':
                return 'брошь';
            case 'crosses':
                return 'кресты';
            case 'cufflinks':
                return 'запонки';
            default:
                return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = items
        .filter(item => item.categoryId === selectedCategory || selectedCategory === null)
        .filter(item => item.price >= priceRange.min && item.price <= priceRange.max)
        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // .filter(item => item.stone.toLowerCase().includes(stoneFilter.toLowerCase()))
    // .filter(item => item.brand.toLowerCase().includes(brandFilter.toLowerCase()))
    // .filter(item => item.material.toLowerCase().includes(materialFilter.toLowerCase()));

    const truncateDescription = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
    };

    return (
        <div className='productList-item'>
            <div className='catalog-filter-items'>
                <div className='product_type-filter'>
                    <article className='productList-type'>
                        <button onClick={() => handleCategoryClick(null)} className={selectedCategory === null ? 'type_filter active' : 'type_filter'}>
                            Все
                        </button>
                    </article>
                    {categories.map((category, index) => {
                        const btnClass = category === selectedCategory ? 'type_filter active' : 'type_filter';
                        return (
                            <article className='productList-type' key={index}>
                                <button onClick={() => handleCategoryClick(category)} className={btnClass}>
                                    {formatCategory(category)}
                                </button>
                            </article>
                        );
                    })}
                </div>
                <div className='price-filter'>
                    <label>Цена</label>
                    <div className='input-container'>
                        <label htmlFor="">от</label>
                        <input type="number" placeholder="От" value={priceRange.min} onChange={e => handlePriceChange(e, 'min')} />
                        <label htmlFor="">до</label>
                        <input type="number" placeholder="До" value={priceRange.max} onChange={e => handlePriceChange(e, 'max')} />
                    </div>
                </div>
                <div className='search-filter'>
                    <label>Поиск</label>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} />
                </div>

                <div className='size-filter'>
                    <label>Размер кольца</label>
                    <select value={sizeFilter} onChange={handleSizeFilterChange} className='size-filter-select'>
                        <option value="">Выберите размер</option>
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 12} value={i + 12}>{i + 12}</option>
                        ))}
                    </select>
                </div>
                <div className='size-filter'>
                    <label>Тип камня</label>
                    <select value={stoneFilter} className='size-filter-select'>

                        <option value="">Выберите камень</option>
                        <option value="diamond">Алмаз</option>
                        <option value="ruby">Рубин</option>
                        <option value="sapphire">Сапфир</option>
                    </select>
                </div>
                <div className='size-filter'>
                    <label>Бренд</label>
                    <select value={brandFilter} onChange={handleBrandFilterChange} className='size-filter-select'>
                        <option value="">Выберите бренд</option>
                        <option value="brand1">Sunlight</option>
                        <option value="brand2">Zara</option>
                        <option value="brand3">H&H</option>
                    </select>
                </div>
                <div className='size-filter'>
                    <label>Тип материала</label>
                    <select value={materialFilter} onChange={handleMaterialFilterChange} className='size-filter-select'>
                        <option value="">Выберите материал</option>
                        <option value="gold">Золото</option>
                        <option value="silver">Серебро</option>
                        <option value="platinum">Платина</option>
                    </select>
                </div>
            </div>
            <div className='productList-item-test'>
                {filteredItems.map(item => (
                    <div key={item.id}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}>
                        <a href={`/product/${item.id}`} className='productList-arrivals'>
                            <div className='cart-productList'>
                                <img src={item.images[0]} alt="" className='cart-productList-image' />
                            </div>
                            <p className='cart-productList-name'>{item.name}</p>
                            <div className='cart-productList-price'>
                                {item.price} ₽
                            </div>
                            <div className='cart-arrivals_more'>
                                <div className='cart-productList-description'>
                                    {truncateDescription(item.description)}
                                </div>
                            </div>
                            {hoveredItem && hoveredItem.id === item.id && (
                                <div className='extra-info'>
                                    <p>{hoveredItem.colors}</p>
                                    <p>{hoveredItem.collection}</p>
                                    <p>{hoveredItem.countryOfManufacture}</p>
                                    <p>{hoveredItem.brand}</p>
                                    <p>{hoveredItem.model}</p>
                                </div>

                            )}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List;