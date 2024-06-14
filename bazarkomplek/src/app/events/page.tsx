"use client"
import EventCard from "@/components/eventCard";
import { useEffect, useState } from "react";

export default function Events() {
    const [ongoingEvents, setOngoingEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])

    async function fetchOngoingEvents(){
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/events/ongoing")
        const data = await response.json();
        setOngoingEvents(data.data.events);

    }

    async function fetchUpcomingEvents(){
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/events/upcoming")
        const data = await response.json();
        setUpcomingEvents(data.data.events)
    }

    useEffect(() => {
        fetchOngoingEvents();
        fetchUpcomingEvents();
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