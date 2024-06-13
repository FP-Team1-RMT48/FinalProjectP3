"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function EventCard({index}: {index: number}){
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
            <h2 className="card-title">Event 1</h2>
            <div className="pt-10 gap-4 flex flex-col">
            <p className=""><span className="font-bold">Start Date:</span> 10-Oct-2023 09:00AM</p>
            <p className=""><span className="font-bold">End Date:</span> 13-Oct-2023 17:00PM</p>
            <p className=""><span className="font-bold">Location:</span> Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240 </p>
            <p className=""><span className="font-bold">Description:</span>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
        <div className="card-actions mt-auto mb-10 flex justify-center">
            <button className="btn btn-primary">View Details</button>
        </div>
    </div>
</motion.div>
    )
}