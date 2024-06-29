import { Suspense } from "react";
import FavoriteProduct from "../favoriteProduct/favoriteProduct";
import { Await, useLoaderData } from "react-router-dom";
import FavoriteProductSkeleton from "../FavoriteProductSkeleton/FavoriteProductSkeleton";


function Favorite() {
    { }
    const data = useLoaderData()
    return (
        <div>
            <Suspense fallback={<FavoriteProductSkeleton />}>
                <Await
                    resolve={data.saveResponse}
                    errorElement={<p>Error loading posts!</p>}
                >
                    {(savePromise) => <FavoriteProduct items={savePromise.data} />}
                </Await>
            </Suspense>
        </div>
    )
}

export default Favorite;