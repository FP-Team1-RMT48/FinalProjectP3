"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SmallProductCard from "@/components/small-productCard";
import SmallEventCard from "@/components/small-eventCard";
import { fetchOngoingEventsForHomepage, fetchUpcomingEvents } from "./action";
import { Event, EventWithProducts } from "./interface";

type LngLat = {
    lng: number,
    lat:number
}
export default function Home() {
  const [userLocation, setUserLocation] = useState<LngLat>({lng: 0, lat:0});
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [ongoingEvents, setOngoingEvents] = useState<EventWithProducts[]>([])

    const handleUpcomingEvents = async () => {
        let data = await fetchUpcomingEvents() 
        if (data.length > 3){
            data = data.slice(0, 3);
        }
        setUpcomingEvents(data)
    }
    const handleOngoingEvents = async () => {
        let data = await fetchOngoingEventsForHomepage() 
        if (data.length > 3){
            data = data.slice(0, 3);
        }
        setOngoingEvents(data)
    }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lng:longitude, lat:latitude });
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    
  }, [setUserLocation]);

  useEffect(()=>{
    handleUpcomingEvents()
    handleOngoingEvents()
  },[])

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
      {ongoingEvents?.map((e) => (
        <div
          key={e.eventSlug}
          className="event-container flex flex-col mx-5 p-4 shadow-xl gap-4"
        >
          <Link
            href={`/${e.eventSlug}`}
            className="text-base-100 flex flex-row items-center gap-1"
          >
            <p className="">{e.name}</p>
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
          <div className="card-container flex flex-row gap-5 py-6 flex-wrap xs:justify-center md:justify-space">
            {e.EventProducts.map((product, index) => (
              <SmallProductCard
                product={product}
                eventSlug={e.eventSlug}
                key={index}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}

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
        <div className="card-container flex flex-row gap-5 py-6 flex-wrap xs:justify-center">
          {upcomingEvents?.map((e, index) => (
            <SmallEventCard event={e} key={index} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
