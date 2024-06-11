import Link from "next/link";

export default function Home() {
  const events = [1,2,3]
    return (
        <main className="flex min-h-screen flex-col justify-between gap-10 pb-10">
            <div className="carousel w-full max-h-[750px]">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="/logo.jpg"
                        className="w-full object-contain bg-primary"
                        alt="Logo"
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="/moving-van.jpg"
                        className="w-full object-cover"
                        alt="Moving Van"
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            </div>

            <div className="event-container flex flex-col mx-5 p-4 shadow-xl gap-4">
                <Link
                    href={""}
                    className="text-base-100 flex flex-row items-center gap-1"
                >
                    <p className=""> Event 1</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Link>
                <div  className="card-container flex flex-row gap-5 flex-wrap xs:justify-center md:justify-space">
                {events.map((e) => (
                                  <div key={e} className="card w-96 bg-base-100 shadow-xl image-full">
                                      <figure>
                                          <img
                                              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                              alt="Shoes"
                                          />
                                      </figure>
                                      <div className="card-body">
                                          <h2 className="card-title">Product</h2>
                                          <p>
                                              If a dog chews shoes whose shoes does he choose?
                                          </p>
                                          <div className="card-actions justify-end">
                                              <button className="btn btn-primary">
                                                  View Details
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                ))}
              </div>
            </div>

            <div className="event-container flex flex-col mx-5 p-4 shadow-xl gap-4">
                <Link
                    href={""}
                    className="text-base-100 flex flex-row items-center gap-1"
                >
                    <p className=""> Event 2</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Link>
                <div  className="card-container flex flex-row gap-5 flex-wrap xs:justify-center">
                {events.map((e) => (
                                   <div key={e} className="card w-96 bg-base-100 shadow-xl image-full">
                                   <figure>
                                       <img
                                           src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                           alt="Shoes"
                                       />
                                   </figure>
                                   <div className="card-body">
                                       <h2 className="card-title">Product</h2>
                                       <p>
                                           If a dog chews shoes whose shoes does he choose?
                                       </p>
                                       <div className="card-actions justify-end">
                                           <button className="btn btn-primary">
                                               View Details
                                           </button>
                                       </div>
                                   </div>
                               </div>
                ))}
              </div>
            </div>

            <div className="event-container flex flex-col mx-5 p-4 shadow-xl gap-4">
                <Link
                    href={""}
                    className="text-base-100 flex flex-row items-center gap-1"
                >
                    <p className=""> Upcoming Events</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Link>
                <div  className="card-container flex flex-row gap-5 flex-wrap xs:justify-center">
                {events.map((e) => (
                                   <div key={e} className="card w-96 bg-base-100 shadow-xl image-full">
                                   <figure>
                                       <img
                                           src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                           alt="Shoes"
                                       />
                                   </figure>
                                   <div className="card-body">
                                       <h2 className="card-title">Event</h2>
                                       <p>
                                           Event Location
                                       </p>
                                       <p>
                                           Event Time
                                       </p>
                                       <div className="card-actions justify-end">
                                           <button className="btn btn-primary">
                                               View Details
                                           </button>
                                       </div>
                                   </div>
                               </div>
                ))}
              </div>
            </div>
        </main>
    );
}
