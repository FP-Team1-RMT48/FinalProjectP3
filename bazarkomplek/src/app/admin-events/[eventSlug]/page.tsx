import { AdminEvent } from "@/app/interface";

async function getEventDetail(eventSlug: string): Promise<AdminEvent> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/events/${eventSlug}`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();
  return result.data.event;
}

export default async function EventSlugPage({
  params,
}: {
  params: { eventSlug: string };
}) {
  "use server";
  const eventData: AdminEvent = await getEventDetail(params.eventSlug);
  console.log(eventData);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
      <h3 className="font-bold text-3xl">EVENT DETAIL</h3>
      {eventData &&
        eventData.map((e: AdminEvent, idx: number) => (
          <form
            key={idx}
            className="bg-base-100 w-11/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6 rounded-lg"
          >
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
              <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12">
                <label
                  htmlFor="name"
                  className="text-xs pl-2 text-white lg:text-base"
                >
                  Event Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={e.name}
                  // onChange={handleChange}
                  className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
              <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12">
                <label
                  htmlFor="startDate"
                  className="text-xs pl-2 text-white lg:text-base"
                >
                  Event starts
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={e.startDate}
                  // onChange={handleChange}
                  className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                />
              </div>
              <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12">
                <label
                  htmlFor="endDate"
                  className="text-xs pl-2 text-white lg:text-base"
                >
                  Event ends
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={e.endDate}
                  // onChange={handleChange}
                  className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12">
              <label
                htmlFor="eventImg"
                className="text-xs pl-2 text-white lg:text-base"
              >
                Event Image
              </label>
              <input
                id="eventImg"
                name="eventImg"
                type="text"
                defaultValue={e.eventImg}
                // onChange={handleChange}
                className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
              />
            </div>
            <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12">
              <label
                htmlFor="location"
                className="text-xs pl-2 text-white lg:text-base"
              >
                Event location
              </label>
              <textarea
                id="location"
                name="location"
                defaultValue={e.location}
                // onChange={handleChange}
                className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-white rounded-lg w-3/6 xs:w-2/6 self-center p-2 mt-4"
            >
              Edit Event
            </button>
          </form>
        ))}
    </main>
  );
}
