"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Event } from "@/app/interface";

export default function SmallEventCard({index, event}: {index: number, event: Event}){
    return (
        <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{ duration: 0.5, delay: index * 0.2 }} className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
            <img
                src={event.eventImg}
                alt="Shoes"
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{event.name}</h2>
            <p>
                {event.location}
            </p>
            <p>
                {event.startDate} - {event.endDate}
            </p>
            <div className="card-actions justify-end">
                <Link href={`/${event.eventSlug}`}>
                <button className="btn btn-primary">
                    View Details
                </button>
                </Link>

            </div>
        </div>
    </motion.div>
    )
}