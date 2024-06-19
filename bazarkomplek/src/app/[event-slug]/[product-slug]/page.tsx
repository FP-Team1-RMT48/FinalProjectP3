'use client'

import { fetchProductDetail } from "@/app/action";
import { productWithUser } from "@/app/interface";
import formatCurrencyIDR from "@/utils/currencyConverter";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ProductDetail({ params }: { params: { "product-slug": string } }){
    const productSlug = params["product-slug"];
    const [product, setProduct] = useState<productWithUser>({
        _id: "",
        sellerId: "",
        name: "",
        slug: "",
        image: "",
        description: "",
        excerpt: "",
        type: "",
        category: "",
        status: "",
        price: 0,
        eventId: "",
        user: {
            _id: "",
            username: "",
            email: "",
            location: "",
            phoneNumber: "",
            isAdmin: false,
        }
    })

    const handleFetchProduct = async () => {
        const response = await fetchProductDetail((productSlug));  
        setProduct(response)
    } 

    const handleAddToCart = async () => {
        try {
            const data = {
                sellerId: product?.user?._id,
                productId: product?._id
            }
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `api/transactions/add`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!response.ok){
                const data = await response.json()
                throw data
            }
            Swal.fire({
                title: "Success",
                text: "Product has been added to cart successfully",
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null && "message" in error
            ) {
                Swal.fire({
                    title: "Error",
                    text: `${error.message}`,
                    icon: "error",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
            } else {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        handleFetchProduct();
    }, [])
        return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-20 text-base-100">
            <h3 className="font-bold text-3xl">PRODUCT DETAIL</h3>
            <div className="flex flex-wrap w-3/4 min-h-[950px] md:min-h-[1050px] lg:min-h-[500px] lg:flex-nowrap rounded-lg shadow-lg">
                <div className="w-full lg:w-1/3 flex items-center justify-center rounded-lg">
                    <img src={product?.image} className="h-full w-full object-contain" alt="" />
                </div>
                <div className="w-full flex flex-col justify-between py-5 lg:w-2/3 px-4 lg:py-10">
                    <div className="w-full flex flex-col gap-2">
                        <p className=" font-bold text-xl sm:text-3xl xl:text-5xl">{product?.name}</p>
                        <p className=" font-bold pb-10 text-base lg:text-3xl">{formatCurrencyIDR(product?.price)}</p>
                        <p className=" font-bold">Seller Details : <span className="font-normal">{product?.user?.username} - {product?.user?.phoneNumber}</span></p>
                        <p className=" font-bold">Status : <span className="font-normal">{product?.status}</span></p>
                        <p className=" font-bold">Category : <span className="font-normal">{product?.category}</span></p>
                        <p className=" font-bold mb-6">Description : <span className="font-normal">{product?.description}</span></p>
                    </div>
                    {product.status == "UNAVAILABLE" ? (
                        <button className="w-full py-2 bg-gray-400 text-primary rounded-lg disabled">Unavailable</button>
                    ) : (
                        <button onClick={handleAddToCart} className="w-full py-2 bg-base-100 text-primary rounded-lg">Add To Cart</button>
                    )}
                        
                </div>
            </div>
        </main>
    )
}