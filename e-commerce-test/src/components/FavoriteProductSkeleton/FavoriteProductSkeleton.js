import React from 'react';
import "./FavoriteProductSkeleton.css"

const FavoriteProductSkeleton = () => {
    return (
        <div className="favoriteList-item">
            <div className='favoriteList-item-test'>
                <div className="skeleton-item">
                    <div className="skeleton-image" />
                    <div className="skeleton-name" />
                    <div className="skeleton-price" />
                </div>
            </div>
        </div>
    );
};

export default FavoriteProductSkeleton;