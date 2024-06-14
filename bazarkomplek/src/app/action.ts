"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Event, EventWithProducts, Product } from "./interface";

export async function logout() {
  cookies().delete("Authorization");
  return redirect("/login");
}


export async function fetchEventDetail(eventSlug: string):Promise<EventWithProducts>{
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `api/events/${eventSlug}`);
    const data = await response.json();
    return data.data.event[0]
  }

// export async function fetchEventsForHomepage(){
//   const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `api/events/${eventSlug}`)
// }


export async function fetchProductDetail(productSlug: string):Promise<Product>{
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `api/products/${productSlug}`)
  const data = await response.json();
  return data
}


export async function truncateDescription (text: string):Promise<string>{
  if (text.length <= 57) {
    return text;
  }
  return text.substring(0, 57) + '...';
};