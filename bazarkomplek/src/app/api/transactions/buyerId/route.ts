import Transactions from "@/db/model/transaction";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    console.log(request)
    try {
        const buyerId = request.headers.get('x-id-user');
        if (!buyerId) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const transactions = await Transactions.getTransactionByBuyerId(buyerId);
        return Response.json({ transactions });
        // return new Response(JSON.stringify({ transactions }), { status: 200 });
    } catch (error: any) { // Tipe eksplisit untuk variabel error
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}