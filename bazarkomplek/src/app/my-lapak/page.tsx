export default function MyLapak() {
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

            <button className="bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg">Add Product</button>


            <div className="flex flex-col w-5/6 gap-3 sm:gap-4 border-2 md:flex-row shadow-lg">
                <div className="w-full h-36 sm:h-64 md:w-3/12">
                    <img
                        src="/logo.jpg"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </div>
                <div className="w-full flex px-2 sm:px-4 sm:text-xl md:py-4 md:w-9/12">
                    <div className="w-5/6 flex flex-col gap-2 break-all">
                        <p>
                            Product Name
                        </p>
                        <p className="pb-4">Product Price</p>
                    </div>
                    <div className="h-full w-1/6 md:justify-between md:items-start flex gap-6 flex-col">
                    <button className="ml-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <button className="w-full mb-4 py-2 bg-base-100 text-primary rounded-full">Edit</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
