import Products from "@/db/model/product";
import _ from "lodash"
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        let newProductBody = _.pick(body,["name", "slug", "images", "description", "excerpt", "type", "status", "price", "eventId"]);
        const userId = request.headers.get("x-id-user") as string;
        newProductBody = newProductBody.status ? newProductBody : { ...newProductBody, status: undefined }
        const result = await Products.addProduct({ sellerId: userId, ...newProductBody })
        return Response.json({ result });
    } catch (error) {
        console.log(error)
        return Response.json(error)
    }
}