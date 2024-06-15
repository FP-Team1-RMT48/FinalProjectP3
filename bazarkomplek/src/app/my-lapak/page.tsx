"use client"

import ProductCardWithEdit from "@/components/productCardWithEditBtn";
import Link from "next/link";

export default function MyLapak() {
    const products =[1,2,3,4,5]
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">MY LAPAK</h3>
            <div className="flex justify-center w-5/6 md:w-3/6 sm:w-5/12 p-3 gap-5 bg-white rounded-lg text-xs md:text-lg font-bold border-2 shadow-lg">
                <button className="bg-accent rounded-lg p-2 text-white">
                    Available
                </button>
                <button className="bg-yellow-800 rounded-lg p-2 text-white ">
                    Verifying
                </button>
                <button className="bg-green-800 rounded-lg p-2 text-white min-w-16 md:min-w-24">
                    Sold
                </button>
            </div>

            <Link href={"/my-lapak/add-product"}><button className="bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg">Add Product</button></Link>

            {products.map((e) => (
                <ProductCardWithEdit key={e} />
            ))}

        </main>
    );
}
