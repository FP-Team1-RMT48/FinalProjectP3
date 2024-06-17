"use client";

import { useEffect, useState } from "react";
import { Event } from "../interface";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function getEvent(page: number): Promise<Event[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/events?page=${page}`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    return result.data.events;
  }
  useEffect(() => {
    async function getProducts() {
      setEvents([]);
      setPage(1);
      setHasMore(true);
      const newProducts = await getEvent(1);
      setEvents(newProducts);
      if (newProducts.length === 0) {
        setHasMore(false);
      }
    }
    getProducts();
  }, []);

  const paging = async () => {
    const nextPage = page + 1;
    const newEvents = await getEvent(nextPage);
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    setPage(nextPage);
    if (newEvents.length === 0) {
      setHasMore(false);
    }
  };
  return (
    <>
      <main className="flex min-h-screen flex-col p-10 ">
        <h1 className="text-xl text-center text-base-100 pb-5 font-bold">
          ADMIN Events
        </h1>
        <div className="overflow-x-auto">
          <InfiniteScroll
            dataLength={events.length}
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
                  <th>Event</th>
                  <th>Lapak</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {events.map((e, idx) => {
                return (
                  <tbody key={idx}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`${e.eventImg}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{e.name}</div>
                            <div className="text-sm opacity-50">
                              {e.eventSlug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {e.location}
                        <br />
                        <div className="flex pt-3 justify-around">
                          <span className="badge badge-ghost badge-sm ">
                            slot lapak: {e.lapakSlots}
                          </span>
                          <span className="badge badge-ghost badge-sm ">
                            slot filled: {e.filledLapakSlots}
                          </span>
                        </div>
                      </td>
                      <td>{e.startDate}</td>
                      <td>{e.endDate}</td>
                      <th>
                        <a href={`admin-events/${e.eventSlug}`}>
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
