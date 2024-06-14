import Events from "@/db/model/event";

export async function GET(
  request: Request,
  { params }: { params: { eventSlug: string } }
) {
  try {
    const { eventSlug } = params;
    const event = await Events.getEventDetailBySlug(eventSlug);
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
