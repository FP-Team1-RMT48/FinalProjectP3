"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Event,
  EventWithProducts,
  Product,
  productWithUser,
} from "./interface";
import { revalidatePath } from "next/cache";

export async function logout() {
  cookies().delete("Authorization");
  cookies().delete("isAdmin");
  return redirect("/login");
}

export async function fetchEventDetail(
  eventSlug: string
): Promise<EventWithProducts> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `api/events/${eventSlug}`
  );
  const data = await response.json();
  return data.data.event[0];
}

export async function fetchOngoingEventsForHomepage(): Promise<
  EventWithProducts[]
> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `api/featured-events`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data.data.events;
}

export async function fetchProductDetail(
  productSlug: string
): Promise<productWithUser> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `api/products/${productSlug}`
  );
  const data = await response.json();
  return data;
}

export async function fetchOngoingEvents(): Promise<Event[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "api/events/ongoing"
  );
  const data = await response.json();
  return data.data.events;
}

export async function fetchUpcomingEvents(): Promise<Event[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "api/events/upcoming"
  );
  const data = await response.json();
  return data.data.events;
}

export async function addEvent(formData: Event) {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/events/add-event`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin-events");
}
