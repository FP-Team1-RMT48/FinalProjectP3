
import Products from "@/db/model/product";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
    try {
        const urlParts = request.nextUrl.pathname.split("/");
        const slug = urlParts[urlParts.length - 1];
        const body = await request.json();
        let updatedProductBody = _.pick(body, ["name", "slug", "image", "description", "excerpt", "type", "category", "status", "price"]);
        let userId = request.headers.get("x-id-user") as string;
        const result = await Products.editProduct(slug, updatedProductBody, userId);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}