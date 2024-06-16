import Products from "@/db/model/product";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const sellerId = request.headers.get('x-id-user');

        if (!sellerId) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
        console.log(sellerId, "<<<api")
        const products = await Products.getProductBySellerId(sellerId);
        return Response.json({ products });
    } catch (error: any) { // Tipe eksplisit untuk variabel error
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}