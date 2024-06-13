"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function SmallEventCard({index}: {index: number}){
    return (
        <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{ duration: 0.5, delay: index * 0.2 }} className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Event</h2>
            <p>
                Event Location
            </p>
            <p>
                Event Time
            </p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">
                    View Details
                </button>
            </div>
        </div>
    </motion.div>
    )
}