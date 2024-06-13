import { ObjectId } from "mongodb";
import { getCollection } from "../config";

export interface Event {
  _id: string;
  name: string;
  location: string;
  eventImg: string;
  lapak: number;
  startDate: string;
  endDate: string;
  eventSlug: string;
}

export default class Events {
  static eventCollection() {
    return getCollection("Events");
  }

  //     1. getAllEvents
  static async getAllEvents() {
    return await this.eventCollection().find().toArray();
  }
  // 2. getUpcomingEvents
  //2.1 function to filter
  static filterUpcomingEvents(events: Event[]) {
    const today = new Date();
    const upcomingDate = new Date(today);
    upcomingDate.setDate(today.getDate() + 30);

    return events.filter((event) => {
      const startDate = new Date(event.startDate);
      console.log(startDate, `<<INI`);
      startDate >= today && startDate <= upcomingDate;
      console.log(startDate, `<<after`);
    });
  }

  //2.2 apply function 2.1 to the database
  static async getUpcomingEvents(): Promise<Event[]> {
    try {
      const events = await Events.eventCollection().find().toArray();
      const filteredEvents = this.filterUpcomingEvents(events);
      return filteredEvents;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  }
  // 3. getOngoingEvents
  static async getOngoingEvents() {
    return await this.eventCollection().find({});
  }
  // 4. getEventDetailBySlug→ aggregate with product
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
    console.log(result, `<<RESULT eventdetailslug`);
    return result;
  }
  // 5. addNewEvent
  static async addEvent(newEvent: Event) {
    let eventDate = new Date(newEvent.startDate);
    const daysToSubstract = 30;
    console.log(eventDate.getDate() - daysToSubstract, `<<<nefore`);
    eventDate.setDate(eventDate.getDate() - daysToSubstract);

    console.log(eventDate, `<<<`);
  }
}
