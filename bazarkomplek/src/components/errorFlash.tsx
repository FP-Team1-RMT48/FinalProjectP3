"use client"

import { useSearchParams } from "next/navigation"

export default function ClientFlashComponent() {
    const searchParams = useSearchParams();
    let errorMessage = searchParams.get('error');
    const errorMessages = errorMessage ? errorMessage.split(",") : [];
    console.log(errorMessages);
    return (
        <>
            {errorMessage && (
                <p className="bg-red-400 px-4 py-2 my-6 text-center text-white rounded animate-pulse">{errorMessages[0]}</p>
            )}

        </>
    )
}