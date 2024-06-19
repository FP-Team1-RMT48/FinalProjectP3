import Events from "@/db/model/event";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const filter = searchParams.get("filter") || "";

    const lng = cookies().get("longitude")?.value as any;
    const lat = cookies().get("latitude")?.value as any;

    if (!lat && !lng) {
      const events = await Events.getOngoingEventsWithLimitedProducts({
        page,
        filter,
        lng: +lng,
        lat: +lat,
      });
      return Response.json({
        data: { events },
      });
    } else {
      const events = await Events.getNearOngoingEventsWithLimitedProducts({
        page,
        filter,
        lng: +lng,
        lat: +lat,
      });
      return Response.json({
        data: { events },
      });
    }
    
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
