import Events, { Event, createSlug } from "@/db/model/event";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body: Event = await request.json();
    await Events.addEvent(body);
    return Response.json({ message: "Success add a new event" });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].message;
      return Response.json({ error: err }, { status: 400 });
    } else if (error instanceof Error) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          error: "Internal server Error",
        },
        { status: 500 }
      );
    }
  }
}
