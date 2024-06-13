import Events from "@/db/model/event";

export async function GET(request: Request) {
    try {
      const events = await Events.getAllEvents();
      return Response.json({
        data: {events},
      });
    } catch (error) {
      console.log(error);
      return Response.json(error);
    }
  }