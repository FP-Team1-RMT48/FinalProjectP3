export default function Events() {
    const events = [1, 2, 3];
    return (
        <main className="flex min-h-screen flex-col items-center py-10 text-base-100">
            <p className="font-bold sm:text-xl md:text-3xl">
                EVENT DETAILS
            </p>

            <p className="xs:text-sm md:text-lg font-bold pt-10 pb-4">Ongoing Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
                {events.map((e) => (
                                    <div key={e} className="card w-96 h-[35rem] bg-base-100 shadow-xl image-full flex flex-col">
                                    <figure className="flex-shrink-0">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body flex flex-col justify-between p-4">
                                        <div className="mb-4">
                                            <h2 className="card-title">Event 1</h2>
                                            <div className="pt-10 gap-4 flex flex-col">
                                            <p className=""><span className="font-bold">Start Date:</span> 10-Oct-2023 09:00AM</p>
                                            <p className=""><span className="font-bold">End Date:</span> 13-Oct-2023 17:00PM</p>
                                            <p className=""><span className="font-bold">Location:</span> Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240 </p>
                                            <p className=""><span className="font-bold">Description:</span>If a dog chews shoes whose shoes does he choose?</p>
                                            </div>
                                        </div>
                                        <div className="card-actions mt-auto mb-10 flex justify-center">
                                            <button className="btn btn-primary">View Details</button>
                                        </div>
                                    </div>
                                </div>
                ))}
            </div>


            <p className="xs:text-sm md:text-lg font-bold pt-20 pb-4">Upcoming Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
                {events.map((e) => (
                                    <div key={e} className="card w-96 h-[35rem] bg-base-100 shadow-xl image-full flex flex-col">
                                    <figure className="flex-shrink-0">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body flex flex-col justify-between p-4">
                                        <div className="mb-4">
                                            <h2 className="card-title">Event 1</h2>
                                            <div className="pt-10 gap-4 flex flex-col">
                                            <p className=""><span className="font-bold">Start Date:</span> 10-Oct-2023 09:00AM</p>
                                            <p className=""><span className="font-bold">End Date:</span> 13-Oct-2023 17:00PM</p>
                                            <p className=""><span className="font-bold">Location:</span> Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240 </p>
                                            <p className=""><span className="font-bold">Description:</span>If a dog chews shoes whose shoes does he choose?</p>
                                            </div>
                                        </div>
                                        <div className="card-actions mt-auto mb-10 flex justify-center">
                                            <button className="btn btn-primary">View Details</button>
                                        </div>
                                    </div>
                                </div>
                ))}
            </div>
        </main>
    );
}