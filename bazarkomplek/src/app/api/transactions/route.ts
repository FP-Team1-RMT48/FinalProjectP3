import Transactions from "@/db/model/transaction";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const userId = request.headers.get('x-id-user');
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
        const page = parseInt(request.url.split("?")[1].split("=")[1]) - 1;
        const result = await Transactions.findAll(Number(page), userId);
        return Response.json(result);
    } catch (error) {
        console.log(error)
        return Response.json(error)
    }
}