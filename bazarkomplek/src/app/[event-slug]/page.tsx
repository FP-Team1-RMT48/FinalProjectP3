'use client'

import ProductCards from "@/components/cards";
import { useEffect, useState } from "react";
import { Event, EventWithProducts, Product } from "../interface";
import ProductCard from "@/components/productCard";
import { fetchEventDetail } from "../action";
import SmallProductCard from "@/components/small-productCard";

export default function EventDetail({ params }: { params: { "event-slug": string } }) {
  const [event, setEvent] = useState<Event>({
    _id: "string",
    name: "string",
    location: "string",
    eventImg: "string",
    startDate: "string",
    endDate: "string",
    eventSlug: "string",
    filledLapakSlots: 0,
    lapakSlots: 0
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const eventSlug = params["event-slug"]
  
  const handleFetchEvent = async () => {
    const data = await fetchEventDetail(eventSlug) as EventWithProducts;
    setEvent(data);
    setProducts(data.EventProducts)
  }

  useEffect(() => {
    handleFetchEvent()
  }, [])

  useEffect(() => {
    if (filter) {
        setFilteredProducts(() => {return products.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase()))})
    }
    else {
        setFilteredProducts(products)
    }
  }, [products, filter])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <br />
      <div className="card card-side bg-accent shadow-xl">
        <figure>
          <img
            src="https://picsum.photos/1280/720"
            alt="Album"
            className="h-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-extrabold">
            {event.name}
          </h2>
          <h3 className="font-bold">Location: </h3>
          <p>{event.location}</p>
          <div className="card-actions justify-between">
            <div>
              start: <span className="badge">{event.startDate}</span>
            </div>
            <div>
              end: &nbsp;<span className="badge">{event.endDate}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-base-100 text-3xl pb-8 pt-32 font-bold">PRODUCT</h1>
      <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter} className="w-3/6 border-2 p-2 text-base-100" placeholder="Search a product here..."/>
      <div className="card-container flex flex-row gap-5 flex-wrap xs:justify-center md:justify-space pt-5">
        {filteredProducts?.map((e, i) => {
          return <SmallProductCard key={i} index={i} product={e} eventSlug={eventSlug}  />;
        })}
      </div>
    </main>
  );
}
