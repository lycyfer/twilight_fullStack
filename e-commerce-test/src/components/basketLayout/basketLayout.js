import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Basket from "../basket/basket";

function BasketLayout() {

    const data = useLoaderData()
    // <Basket items={productPromise.data}
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={data.productResponse}
                    errorElement={<p>Error loading posts!</p>}
                >
                    {(productPromise) => <Basket items={productPromise.data} />}
                </Await>
            </Suspense>
        </div>
    )
}

export default BasketLayout;