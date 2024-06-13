import Events from "@/db/model/event";

export async function POST(request: Request) {
  try {
    const newEvent = {
      name: "Bazaar Komplek 1",
      location: "Jl. perumahan puncak buring indah",
      eventImg:
        "https://img.freepik.com/free-photo/antiques-market-objects-assortment_23-2148950948.jpg?t=st=1718095998~exp=1718099598~hmac=3a73dbd5523c1c254cfe9ccfa5c98ac28d19702e47a69ec9464e40339b72561a&w=996",
      lapak: 0,
      startDate: new Date(),
      endDate: new Date(),
    };
    const addEvent = await Events.addEvent(newEvent)
    return Response.json(`baik`, {status:201})
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
