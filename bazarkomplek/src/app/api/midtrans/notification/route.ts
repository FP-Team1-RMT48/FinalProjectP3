import Transactions from "@/db/model/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  Transactions.editStatusTransaction(body.order_id, body.transaction_status);
  return NextResponse.json(body);
}
