import EventCard from "@/components/eventCard";

export default function Events() {
    const events = [1, 2, 3];
    return (
        <main className="flex min-h-screen flex-col items-center py-10 text-base-100">
            <p className="font-bold sm:text-xl md:text-3xl">
                EVENT DETAILS
            </p>

            <p className="xs:text-sm md:text-lg font-bold pt-10 pb-4">Ongoing Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
                {events.map((e, index) => (
                    <EventCard key={e} index={index}/>
                ))}
            </div>


            <p className="xs:text-sm md:text-lg font-bold pt-20 pb-4">Upcoming Events</p>
            <div className="event-container flex-wrap flex mx-5 p-4 shadow-xl gap-8 justify-center">
            {events.map((e, index) => (
                    <EventCard key={e} index={index}/>
                ))}
            </div>
        </main>
    );
}