import Events from "@/db/model/event";

export async function GET(
  request: Request,
  { params }: { params: { eventSlugLimited: string } }
) {
  try {
    const { eventSlugLimited } = params;
    const event = await Events.getEventDetailBySlugLimited(eventSlugLimited);
    return Response.json(
      {
        data: { event },
      },
      { status: 200 }
    );
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
