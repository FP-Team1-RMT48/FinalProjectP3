"use client";

import ProductCards from "@/components/cards";
import { useEffect, useState } from "react";
import { Event, EventWithProducts, Product } from "../interface";
import ProductCard from "@/components/productCard";
import { fetchEventDetail } from "../action";
import SmallProductCard from "@/components/small-productCard";

export default function EventDetail({
  params,
}: {
  params: { "event-slug": string };
}) {
  const [event, setEvent] = useState<Event>({
    _id: "string",
    name: "string",
    location: "string",
    eventImg: "string",
    startDate: "string",
    endDate: "string",
    eventSlug: "string",
    filledLapakSlots: 0,
    lapakSlots: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const eventSlug = params["event-slug"];

  const handleFetchEvent = async () => {
    const data = (await fetchEventDetail(eventSlug)) as EventWithProducts;
    setEvent(data);
    const products =  data.EventProducts.filter(e => e.status !== "VERIFYING")
    setProducts(products);
  };

  useEffect(() => {
    handleFetchEvent();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredProducts(() => {
        return products.filter((el) =>
          el.name.toLowerCase().includes(filter.toLowerCase())
        );
      });
    } else {
      setFilteredProducts(products);
    }
  }, [products, filter]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <br />
      <div className="flex flex-wrap md:flex-nowrap card card-side bg-accent shadow-xl">
        <figure className="rounded-xl">
          <img
            src={event.eventImg}
            alt="Album"
            className="h-full object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-extrabold text-lg md:text-2xl">
            {event.name}
          </h2>
          <h3 className="font-bold text-sm md:text-lg">Location: </h3>
          <p className="text-sm md:text-lg">{event.location}</p>
          <div className="card-actions justify-between">
            <div>
              start:&nbsp;
              <span className="badge text-xs md:text-sm">
                {event.startDate}
              </span>
            </div>
            <div>
              end: &nbsp;
              <span className="badge text-xs md:text-sm">{event.endDate}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-base-100 text-3xl pb-8 md:text-5xl pt-10">PRODUCT</h1>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className="w-3/6 border-2 p-2 text-base-100"
        placeholder="Search a product here..."
      />
      <div className="card-container flex flex-row gap-5 flex-wrap w-full justify-center md:w-4/5 md:justify-space pt-5">
        {filteredProducts?.map((e, i) => {
          return (
            <SmallProductCard
              key={i}
              index={i}
              product={e}
              eventSlug={eventSlug}
            />
          );
        })}
      </div>
    </main>
  );
}
