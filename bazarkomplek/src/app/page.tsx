import Link from "next/link";
import React from "react";
import SmallProductCard from "@/components/small-productCard";
import SmallEventCard from "@/components/small-eventCard";

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
                <div  className="card-container flex flex-row gap-5 py-6 flex-wrap xs:justify-center md:justify-space">
                {events.map((e, index) => (
                    <SmallProductCard key={e} index={index} />
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
                <div  className="card-container flex flex-row gap-5 py-6 flex-wrap xs:justify-center">
                {events.map((e, index) => (
                    <SmallProductCard key={e} index={index} />
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
                <div  className="card-container flex flex-row gap-5 py-6 flex-wrap xs:justify-center">
                {events.map((e, index) => (
                    <SmallEventCard key={e} index={index} />
                ))}
              </div>
            </div>
        </main>
    );
}
