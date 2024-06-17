import Transactions from "@/db/model/transaction";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    console.log(request)
    try {
        const sellerId = request.headers.get('x-id-user');
        console.log(sellerId, "<<sellerId")
        if (!sellerId) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const transactions = await Transactions.getTransactionBySellerId(sellerId);
        return Response.json({ transactions });
        // return new Response(JSON.stringify({ transactions }), { status: 200 });
    } catch (error: any) { // Tipe eksplisit untuk variabel error
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}