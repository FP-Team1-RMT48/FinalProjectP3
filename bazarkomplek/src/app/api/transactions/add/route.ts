import { NextResponse } from "next/server";
import Transactions from "@/db/model/transaction";
import { NewTransaction } from "@/app/interface";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        const body: NewTransaction = await request.json();
        const userId = request.headers.get("x-id-user");

        if (!userId) {
            return NextResponse.json({ message: "User ID not found" }, { status: 401 });
        }

        const result = await Transactions.addCartTransactionByBuyerId({ ...body, buyerId: userId });
        return NextResponse.json({ message: "Transaction added successfully", transactionId: result });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}