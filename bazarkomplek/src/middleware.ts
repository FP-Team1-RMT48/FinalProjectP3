import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PayloadJose } from "./helpers/jwt";
export const dynamic = "force-dynamic";

export async function middleware(request: NextRequest) {
  const token = cookies().get("Authorization")?.value.split(" ")[1];

  const adminToken = cookies().get("isAdmin");

  if (request.nextUrl.pathname.startsWith("/admin-products")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin-events")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin-products/:path*")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin-events/:path*")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

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
    username: string;
    phone: string;
    role: string;
  }>(token);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-id-user", decodeToken._id);
  requestHeaders.set("x-id-email", decodeToken.email);
  requestHeaders.set("x-id-username", decodeToken.username);
  requestHeaders.set("x-id-phone", decodeToken.phone);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    "/api/products/add",
    "/api/transactions/:path*",
    "/api/products/sellerId",
    "/my-lapak/:path*",
    "/api/products/edit/:slug*",
    "/api/products/delete/:slug*",
    "/admin-products",
    "/admin-events",
    "/admin-products/:path*",
    "/admin-events/:path*",
    "/api/midtrans",
  ],
  // matcher: ["/api/products/add", "/api/transactions/add", "/api/transactions/buyerId", "/api/transactions/sellerId", "/my-lapak/:path*", "/api/products/edit/:slug*", "/api/products/delete/:slug*", "/admin-products", "/api/transactions/delete/:transactionId*"],
};
