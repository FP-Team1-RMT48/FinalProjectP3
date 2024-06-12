import Products from "@/db/model/product"
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const result = await Products.getProductPreview();
        return Response.json(result);
    } catch (error) {
        console.log(error)
    }
}