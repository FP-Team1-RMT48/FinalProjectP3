"use client";

import { useEffect, useState } from "react";
import { AdminProduct, Event } from "../interface";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AdminProductPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [events, setEvents] = useState<any>([]);

  async function getAll(page: number): Promise<AdminProduct[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/products?=${page}`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    return result.data;
  }

  async function getAllEvents(): Promise<Event[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/events`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    return result.data.events;
  }

  useEffect(() => {
    async function getProducts() {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      const newProducts = await getAll(1);
      setProducts(newProducts);
      if (newProducts.length === 0) {
        setHasMore(false);
      }
    }
    async function fetchEvents() {
      const events = await getAllEvents();
      setEvents(events);
    }
    getProducts();
    fetchEvents();
  }, []);

  const paging = async () => {
    const nextPage = page + 1;
    const newProducts = await getAll(nextPage);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
    if (newProducts.length === 0) {
      setHasMore(false);
    }
  };
  const filteredProducts = filter
    ? products.filter((product) =>
        product.eventDetails.some((e: Event) => e.name === filter)
      )
    : products;
  console.log(events, "<events");
  return (
    <>
      <main className="flex min-h-screen flex-col p-10 ">
        <h1 className="text-xl text-center text-base-100 pb-5 font-bold">
          VERIFY PRODUCTS
        </h1>
        <select
          className="select border-base-100 w-full max-w-xs bg-white text-base-100 font-bold"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Get all products</option>
          {events.length > 0 ? (
            events.map((event: Event, idx: number) => (
              <option key={idx} value={event.name}>
                {event.name}
              </option>
            ))
          ) : (
            <option>Loading events...</option>
          )}
        </select>
        <br />
        <div className="overflow-x-auto">
          <InfiniteScroll
            dataLength={products.length}
            next={paging}
            hasMore={hasMore}
            loader={
              <h5 className="text-center text-base-100 pt-5 font-bold">
                Now loading...
              </h5>
            }
            endMessage={
              <p className="text-center text-base-100 pt-5 font-bold">
                No more, please stop
              </p>
            }
          >
            <table className="table text-base-100 border-2 border-base-100">
              <thead className="text-base-100">
                <tr className="">
                  <th>No.</th>
                  <th>Products</th>
                  <th>Event</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filteredProducts.map((e, idx) => {
                return (
                  <tbody key={idx}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={e.image}
                                key={idx}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{e.name}</div>
                            <span className="badge badge-ghost badge-sm ">
                              {e.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {e.eventDetails && e.eventDetails.length > 0 ? (
                          e.eventDetails.map((event: Event, idx: number) => (
                            <div key={idx}>{event.eventSlug}</div>
                          ))
                        ) : (
                          <div>Not tied to any event!</div>
                        )}
                      </td>
                      <td>
                        {e.eventDetails && e.eventDetails.length > 0 ? (
                          e.eventDetails.map((event: Event, idx: number) => (
                            <div key={idx}>{event.startDate}</div>
                          ))
                        ) : (
                          <div>Not Set</div>
                        )}
                      </td>
                      <td>
                        {e.eventDetails && e.eventDetails.length > 0 ? (
                          e.eventDetails.map((event: Event, idx: number) => (
                            <div key={idx}>{event.endDate}</div>
                          ))
                        ) : (
                          <div>Not Set</div>
                        )}
                      </td>
                      <th>
                        <a href={`admin-products/${e.slug}`}>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </a>
                      </th>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
}
