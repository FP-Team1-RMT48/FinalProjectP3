import Products from "@/db/model/product";
import _ from "lodash"
import { ZodError } from "zod";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        let newProductBody = _.pick(body,["name", "image", "description", "excerpt", "type", "category", "status", "price", "eventId"]);
        if (typeof newProductBody.price === 'string') {
          newProductBody.price = parseFloat(newProductBody.price);
      }
     
        const userId = request.headers.get("x-id-user") as string;
        newProductBody = newProductBody.status ? newProductBody : { ...newProductBody, status: "VERIFYING" }
        const result = await Products.addProduct({ sellerId: userId, ...newProductBody, status: "VERIFYING" })
        return Response.json({ result });
    } catch (error) {
        if (error instanceof ZodError) {
            const err = error.issues[0].message;
            return Response.json({ error: err }, { status: 400 });
          } else if (error instanceof Error) {
            return Response.json(
              {
                error: error.message,
              },
              { status: 400 }
            );
          } else {
            return Response.json(
              {
                error: "Internal server Error",
              },
              { status: 500 }
            );
          }
    }
}