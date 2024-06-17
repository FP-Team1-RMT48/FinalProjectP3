import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { z } from "zod";
import { Product } from "@/app/interface";
const NewEventSchema = z
  .object({
    name: z.string(),
    location: z.string(),
    eventImg: z.string(),
    lapakSlots: z.number().min(0, { message: "lapakSlots cannot be empty" }),
    filledLapakSlots: z
      .number()
      .min(0, { message: "filledLapakSlots cannot be empty" }),
    startDate: z.string(),
    endDate: z.string(),
    eventSlug: z.string().optional(),
  })
  .refine((data) => data.filledLapakSlots <= data.lapakSlots, {
    //custom validation
    message: "filledLapakSlots should not be higher than lapakSlots",
    path: ["filledLapakSlots"],
  });

export type Event = z.infer<typeof NewEventSchema>;
export interface EventResponse extends Event {
  _id: string;
  EventProducts?: Product[];
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
export default class Events {
  static eventCollection() {
    return getCollection("Events");
  }
  static async getEventsWithPagination(
    dataPerPage: number,
    page: string,
    filter: string
  ): Promise<Event[]> {
    const agg = [
      {
        $match: {
          name: {
            $regex: filter,
            $options: "i",
          },
        },
      },
      {
        $skip: (+page - 1) * dataPerPage,
      },
      {
        $limit: dataPerPage,
      },
    ];
    const cursor = this.eventCollection().aggregate(agg);
    const events = (await cursor.toArray()) as Event[];
    return events;
  }

  //1. getAllEvents
  static async getAllEvents({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }) {
    const result = await this.getEventsWithPagination(100, page, filter);
    return result;
  }

  // 2. getUpcomingEvents

  static async getUpcomingEvents({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }): Promise<Event[]> {
    try {
      const events = await this.getEventsWithPagination(100, page, filter);
      const today = new Date();
      const upcomingThreshold = new Date(today);
      upcomingThreshold.setDate(today.getDate() + 30);

      return events.filter((event) => {
        const startDate = new Date(event.startDate);
        return startDate > upcomingThreshold;
      });
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  }
  // 3. getOngoingEvents
  static async getOngoingEvents({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }): Promise<Event[]> {
    const events = await this.getEventsWithPagination(4, page, filter);
    const today = new Date();
    const ongoingThreshold = new Date(today);
    ongoingThreshold.setDate(today.getDate() + 14);

    return events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const beforePastEventsThreshold = new Date(endDate);
      beforePastEventsThreshold.setDate(endDate.getDate() + 7);

      return (
        (startDate <= ongoingThreshold && startDate >= today) ||
        (today >= startDate && today <= beforePastEventsThreshold)
      );
    });
  }

  static async getOngoingEventsWithLimitedProducts({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }): Promise<Event[]> {
    const productsDataLimit = 3
    const agg = [
      {
        $lookup: {
          from: "Products",
          localField: "_id",
          foreignField: "eventId",
          as: "EventProducts",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          location: 1,
          eventImg: 1,
          startDate: 1,
          endDate: 1,
          eventSlug: 1,
          filledLapakSlots: 1,
          lapakSlots: 1,
          EventProducts: {
            $slice: ["$EventProducts", productsDataLimit],
          },
        },
      },
    ];
    const cursor = this.eventCollection().aggregate(agg);
    const events = (await cursor.toArray()) as EventResponse[];
    const today = new Date();
    const ongoingThreshold = new Date(today);
    ongoingThreshold.setDate(today.getDate() + 14);

    return events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const beforePastEventsThreshold = new Date(endDate);
      beforePastEventsThreshold.setDate(endDate.getDate() + 7);

      return (
        (startDate <= ongoingThreshold && startDate >= today) ||
        (today >= startDate && today <= beforePastEventsThreshold)
      );
    });
  }

  static async getPastEvents({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }): Promise<Event[]> {
    const events = await this.getEventsWithPagination(4, page, filter);
    const today = new Date();
    const pastThreshold = new Date(today);
    pastThreshold.setDate(today.getDate() - 7);

    return events.filter((event) => {
      const endDate = new Date(event.endDate);
      return endDate < pastThreshold;
    });
  }

  // 4.1 getEventDetailBySlug→ aggregate with product
  static async getEventDetailBySlug(eventSlug: string) {
    const agg = [
      {
        $match: {
          eventSlug: eventSlug,
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "_id",
          foreignField: "eventId",
          as: "EventProducts",
        },
      },
    ];
    const cursor = this.eventCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result;
  }
  //4.2 getEventDetailBySlugLimited -> aggregate with product and limit the eventProducts displayed
  static async getEventDetailBySlugLimited(eventSlug: string) {
    const productsDataLimit = 2;
    const agg = [
      {
        $match: {
          eventSlug: eventSlug,
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "_id",
          foreignField: "eventId",
          as: "EventProducts",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          location: 1,
          eventImg: 1,
          startDate: 1,
          endDate: 1,
          eventSlug: 1,
          filledLapakSlots: 1,
          lapakSlots: 1,
          EventProducts: {
            $slice: ["$EventProducts", productsDataLimit], //data limit
          },
        },
      },
    ];
    const cursor = this.eventCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result;
  }

  // 5. addNewEvent
  static async addEvent(newEvent: Event) {
    //make property eventSlug
    const addedEvent = {
      ...newEvent,
      eventSlug: createSlug(newEvent.name),
    };
    //type validation
    const parseResult = NewEventSchema.safeParse(addedEvent);
    if (!parseResult.success) {
      throw parseResult.error;
    }
    //unique validation
    const isEventSlugExist = await this.eventCollection().findOne({
      eventSlug: addedEvent.eventSlug,
    });
    if (isEventSlugExist) {
      throw new Error("Event name already exist");
    }

    return await this.eventCollection().insertOne(addedEvent);
  }
}
