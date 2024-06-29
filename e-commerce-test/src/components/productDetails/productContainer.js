import React from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync } from "../../products/productActions";
import { addProductToCart } from "../../products/productSlice";
import ProductDetails from "./productDetails";
import { useState, useEffect } from "react";

const ProductContainer = () => {

    const product = useLoaderData()
    console.log(product)



    return (
        <div>

            <ProductDetails
                fields={product}
            />

        </div>
    );
};


export default ProductContainer