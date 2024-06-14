"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Event } from "@/app/interface";

export default function EventCard({event, index}: {event: Event, index: number}){
    return (
    <motion.div  initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{ duration: 0.5, delay: index * 0.2 }}  className="card w-96 h-[35rem] bg-base-100 shadow-xl image-full flex flex-col">
    <figure className="flex-shrink-0">
        <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
        />
    </figure>
    <div className="card-body flex flex-col justify-between p-4">
        <div className="mb-4">
            <h2 className="card-title">{event.name}</h2>
            <div className="pt-10 gap-4 flex flex-col">
            <p className=""><span className="font-bold">Start Date:</span> {event.startDate}</p>
            <p className=""><span className="font-bold">End Date:</span> {event.endDate}</p>
            <p className=""><span className="font-bold">Location:</span> {event.location}</p>
            <p className=""><span className="font-bold">Lapak Saat Ini:</span> {event.lapak}</p>
            </div>
        </div>
        <div className="card-actions mt-auto mb-10 flex justify-center">
            <Link href={`/${event.slug}`}><button className="btn btn-primary">View Details</button></Link>
        </div>
    </div>
</motion.div>
    )
}