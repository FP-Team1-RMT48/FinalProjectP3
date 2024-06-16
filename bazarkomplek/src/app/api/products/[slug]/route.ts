import Products from "@/db/model/product";
export const dynamic = "force-dynamic";
type RequestParam = {
    params: {
        slug: string;
    };
};

export async function GET(request: Request, { params }: RequestParam) {
    try {
        const product = await Products.findBySlug(params.slug);
        return Response.json(product[0]);
    } catch (error) {
        return Response.json(error)
    }
}