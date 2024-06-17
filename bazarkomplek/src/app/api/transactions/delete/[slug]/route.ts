import Transactions from "@/db/model/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const buyerId = request.headers.get("x-id-user") as string
        const id = url.pathname.split("/").pop()
        if (!id) {
            return NextResponse.json({ message: "transaction id not supplied" }, { status: 404 })
        }
        const result = await Transactions.deleteTransaction(id, buyerId )
        return NextResponse.json({ result }, { status: 200 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}