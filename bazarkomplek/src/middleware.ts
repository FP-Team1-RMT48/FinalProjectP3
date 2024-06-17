import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PayloadJose } from "./helpers/jwt";
export const dynamic = "force-dynamic";


export async function middleware(request: NextRequest) {
    const token = cookies().get("Authorization")?.value.split(" ")[1];
    if (!token) {
        return NextResponse.json(
            {
                message: "Invalid token",
            },
            {
                status: 401,
            }
        );
    }

    const decodeToken = await PayloadJose<{
        _id: string;
        email: string;
        role: string;
    }>(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-id-user", decodeToken._id);
    requestHeaders.set("x-id-email", decodeToken.email);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return response;
}

export const config = {
    matcher: ["/api/products/add", "/api/transactions/:path*", "/api/products/sellerId",  "/my-lapak/:path*", "/api/products/edit/:slug*", "/api/products/delete/:slug*", "/admin-products"],
    // matcher: ["/api/products/add", "/api/transactions/add", "/api/transactions/buyerId", "/api/transactions/sellerId", "/my-lapak/:path*", "/api/products/edit/:slug*", "/api/products/delete/:slug*", "/admin-products", "/api/transactions/delete/:transactionId*"],
};
