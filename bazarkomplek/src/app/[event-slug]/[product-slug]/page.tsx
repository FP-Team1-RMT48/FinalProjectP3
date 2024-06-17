"use server"

import { fetchProductDetail } from "@/app/action";
import formatCurrencyIDR from "@/utils/currencyConverter";

export default async function ProductDetail({ params }: { params: { "product-slug": string } }){
    const productSlug = params["product-slug"];
    const product = await fetchProductDetail((productSlug));    
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-20 text-base-100">
            <h3 className="font-bold text-3xl">PRODUCT DETAIL</h3>
            <div className="flex flex-wrap w-3/4 min-h-[950px] md:min-h-[1050px] lg:min-h-[500px] lg:flex-nowrap rounded-lg shadow-lg">
                <div className="w-full lg:w-1/3 flex items-center justify-center rounded-lg">
                    <img src={product.image} className="h-full w-full object-contain" alt="" />
                </div>
                <div className="w-full flex flex-col justify-between py-5 lg:w-2/3 px-4 lg:py-10">
                    <div className="w-full flex flex-col gap-2">
                        <p className=" font-bold text-xl sm:text-3xl xl:text-5xl">{product.name}</p>
                        <p className=" font-bold pb-10 text-base lg:text-3xl">{formatCurrencyIDR(product.price)}</p>
                        <p className=" font-bold">Seller Details : <span className="font-normal">{product.user.username} - {product.user.phoneNumber}</span></p>
                        <p className=" font-bold">Status : <span className="font-normal">{product.status}</span></p>
                        <p className=" font-bold">Category : <span className="font-normal">{product.category}</span></p>
                        <p className=" font-bold">Description : <span className="font-normal">{product.description}</span></p>
                    </div>
                    {product.status == "UNAVAILABLE" ? (
                        <button className="w-full py-2 bg-gray-400 text-primary rounded-lg disabled">Unavailable</button>
                    ) : (
                        <button className="w-full py-2 bg-base-100 text-primary rounded-lg">Add To Cart</button>
                    )}
                        
                </div>
            </div>
        </main>
    )
}