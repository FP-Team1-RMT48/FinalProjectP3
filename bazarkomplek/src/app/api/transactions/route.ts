import Transactions from "@/db/model/transaction";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const filter = searchParams.get("filter") || "";
    const transactions = await Transactions.getAlltransactions({
      page,
      filter,
    });
    return Response.json({
      data: {transactions},
    });
  } catch (error) {
    return Response.json(
      {
        error: "Internal server Error",
      },
      { status: 500 }
    );
  }
}
