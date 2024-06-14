import Products from "@/db/model/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
    try {
        // Extract the slug from the URL
        const urlParts = request.nextUrl.pathname.split("/");
        const slug = urlParts[urlParts.length - 1];

        // Get the user ID from the request headers
        const userId = request.headers.get("x-id-user") as string;

        // Delete the product
        const result = await Products.deleteProduct(slug, userId);

        return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) { // explicitly define 'error' as 'any' or 'Error'
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}