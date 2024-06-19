import Events from "@/db/model/event";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const filter = searchParams.get("filter") || "";
    const events = await Events.getOngoingEvents({
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
