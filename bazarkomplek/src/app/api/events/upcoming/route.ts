import Events, { EventResponse } from "@/db/model/event";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const filter = searchParams.get("filter") || "";
    const events: EventResponse[] = await Events.getUpcomingEvents({
      page,
      filter,
    });
    return Response.json({
      data: { events },
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Internal server Error",
      },
      { status: 500 }
    );
  }
}
