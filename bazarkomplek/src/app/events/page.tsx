"use client"
import EventCard from "@/components/eventCard";
import { useEffect, useState } from "react";
import { fetchOngoingEvents, fetchUpcomingEvents } from "../action";
import { Event } from "../interface";

export default function Events() {
    const [ongoingEvents, setOngoingEvents] = useState<Event[]>([])
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])

    const getOngoingEvents = async () => {
        const data = await fetchOngoingEvents();
        setOngoingEvents(data);
    }

    const getUpcomingEvents = async () => {
        const data = await fetchUpcomingEvents();
        setUpcomingEvents(data);
    }

    useEffect(() => {
        getOngoingEvents();
        getUpcomingEvents();
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center py-10 text-base-100">
            <p className="font-bold sm:text-xl md:text-3xl">
                EVENTS
            </p>

            <p className="xs:text-sm md:text-lg font-bold pt-10 pb-4">Ongoing Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
                {ongoingEvents.map((e, index) => (
                    <EventCard key={index} event={e} index={index}/>
                ))}
            </div>


            <p className="xs:text-sm md:text-lg font-bold pt-20 pb-4">Upcoming Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
            {upcomingEvents.map((e, index) => (
                    <EventCard key={index} event={e} index={index}/>
                ))}
            </div>
        </main>
    );
}