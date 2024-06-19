
import Products from "@/db/model/product";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
    try {
        const urlParts = request.nextUrl.pathname.split("/");
        const slug = urlParts[urlParts.length - 1];
        const body = await request.json();
        let updatedProductBody = _.pick(body, ["name", "slug", "image", "description", "excerpt", "type", "category", "status", "price", "eventId"]);
        let userId = request.headers.get("x-id-user") as string;
        const result = await Products.editProduct(slug, updatedProductBody, userId);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
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