import Transactions from "@/db/model/transaction";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "transaction id not supplied" },
        { status: 404 }
      );
    }
    const data = await request.json();
    let editTransaction: any = _.pick(data, [
      "transaction_time",
      "transaction_status",
      "transaction_id",
      "status_message",
      "status_code",
      "signature_key",
      "settlement_time",
      "payment_type",
      "order_id",
      "merchant_id",
      "gross_amount",
      "fraud_status",
      "expiry_time",
      "currency",
    ]);

    console.log(data, "<editTransaction");
    const result = await Transactions.editStatusTransaction(
      id,
      editTransaction
    );
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split("/").pop();
//     if (!id) {
//       return NextResponse.json(
//         { message: "transaction id not supplied" },
//         { status: 404 }
//       );
//     }
//     const result = await Transactions.editStatusTransaction(id);
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }transactionId: string, editTransaction: Pick<any, "transaction_time" | "transaction_status" | "transaction_id" | "status_message" | "status_code" | "signature_key" | "settlement_time" | "payment_type" | "order_id" | "merchant_id" | "gross_amount" | "fraud_status" | "expiry_time" | "currency">
