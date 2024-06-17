import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const emailUser = request.headers.get("x-id-email") as string;
  const username = request.headers.get("x-id-username") as string;
  const phoneUser = request.headers.get("x-id-phone") as string;
  const OrderId = Math.floor(100000 + Math.random() * 900000).toString();
  const body = await request.json();
  const amount = body.price;
  const pay = Number(amount);
  // console.log(pay);
  try {
    const parameter = {
      transaction_details: {
        order_id: OrderId,
        gross_amount: pay,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: username,
        email: emailUser,
        phone: phoneUser,
      },
    };

    const midtransToken = await fetch(
      `https://api.sandbox.midtrans.com/v1/payment-links`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${process.env.MIDTRANS_ENCODED}`,
        },
        body: JSON.stringify(parameter),
      }
    );
    const result = await midtransToken.json();
    // console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Internal server Error",
      },
      { status: 500 }
    );
  }
}
