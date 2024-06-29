import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";



export const listPageLoader = async ({ request, params }) => {
    const productPromise = await apiRequest("/product");
    const userOrder = await apiRequest(`/basket/order/` + params.id)
    console.log(userOrder)
    return defer({
        productResponse: productPromise,
        userOrderResponse: userOrder
    })
};

export const favoritePageLoader = async ({ request, params }) => {
    console.log(params.id)
    const savePromise = await apiRequest(`/favorite/${params.id}/saved-products`)
    console.log(savePromise)
    return defer({
        saveResponse: savePromise,
    })
}

export const adminLoader = async ({ request, params }) => {
    const usersPromise = await apiRequest("/admin/users")
    console.log(usersPromise)
    const ordersPromise = await apiRequest(`/admin/order/purchases`)
    console.log(ordersPromise)
    return defer({
        usersResponse: usersPromise,
        ordersResponse: ordersPromise
    })
}

export const basketPageLoader = async ({ request, params }) => {
    console.log(params.id)
    // const productPromise = await apiRequest("/basket/test/" + params.id)
    const productPromise = await apiRequest("basket/test/" + params.id)
    console.log(productPromise)
    // const userOrder = await apiRequest(`/basket/order/` + params.id)
    // console.log(productPromise)

    return defer({
        productResponse: productPromise,
        // userOrderResponse: userOrder
    })
}

export const singleProductLoader = async ({ request, params }) => {
    const res = await apiRequest("/product/" + params.id);
    console.log(res)
    return res.data;
};
