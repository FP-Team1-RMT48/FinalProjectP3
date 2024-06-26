import { NextResponse } from "next/server";
import Transactions from "@/db/model/transaction";
import { NewTransaction } from "@/app/interface";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        const {productId, sellerId}: NewTransaction = await request.json();
        const userId = request.headers.get("x-id-user");
        if (!userId) {
            return NextResponse.json({ message: "User ID not found" }, { status: 401 });
        }
        if (userId == sellerId) {
            return NextResponse.json({ message: "You cannot buy your own item" }, { status: 401 });
        }
        const result = await Transactions.addCartTransactionByBuyerId({productId, sellerId, buyerId: userId });
        return NextResponse.json({ message: "Transaction added successfully", transactionId: result });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}