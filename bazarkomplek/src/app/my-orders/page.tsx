import ProductCard from "@/components/productCard";

export default function MyOrders() {
    const orders = [1,2,3,4,5]
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">MY ORDERS</h3>
            <div className="flex justify-center md:justify-normal w-full sm:w-5/6 lg:w-4/6 xl:w-3/6 p-3 gap-3 lg:gap-5 bg-white rounded-lg text-xs md:text-lg font-bold border-2 shadow-lg">
                <p className="py-2 hidden sm:block">Status: </p>
                <button className="bg-base-100 rounded-lg p-2 text-white lg:min-w-20">
                    Cart
                </button>
                <button className="bg-yellow-800 rounded-lg p-2 text-white">
                    Pending
                </button>
                <button className="bg-red-800 rounded-lg p-2 text-white ">
                    Cancelled
                </button>
                <button className="bg-green-800 rounded-lg p-2 text-white ">
                    Completed
                </button>
            </div>

                <button className="bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg">Checkout</button>

        {orders.map(e => (
            <ProductCard key={e}/>
        ))}
        </main>
    );
}
