"use client"
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState<string>("DRAFT");

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/transactions/buyerId`);
            const data = await response.json();
            if (!response.ok){
                return console.log(data, "<response")
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getButtonClass = (status: string) => {
        const baseClass = "rounded-lg p-2 min-w-16 md:min-w-24 border-2";
        const activeClass = filter === status ? "bg-accent text-white " : "bg-white text-accent";
        return `${baseClass} ${activeClass}`;
    };

    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">MY ORDERS</h3>
            <div className="flex justify-center w-full sm:w-5/6 lg:w-4/6 xl:w-3/6 p-3 gap-3 lg:gap-5 bg-white rounded-lg text-xs md:text-lg font-bold border-2 shadow-lg">
                <p className="py-2 hidden sm:block text-accent">Status: </p>
                <button onClick={() => setFilter("DRAFT")} className={getButtonClass("DRAFT")}>
                    Cart
                </button>
                <button onClick={() => setFilter("PENDING")} className={getButtonClass("PENDING")}>
                    Pending
                </button>
                <button onClick={() => setFilter("CANCELLED")} className={getButtonClass("CANCELLED")}>
                    Cancelled
                </button>
                <button onClick={() => setFilter("COMPLETED")} className={getButtonClass("COMPLETED")}>
                    Completed
                </button>
            </div>

                <button className="bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg">Checkout</button>

        {/* {orders.map(e => (
            <ProductCard key={e}/>
        ))} */}
        </main>
    );
}
