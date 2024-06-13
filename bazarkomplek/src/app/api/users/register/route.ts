import Users from "@/db/model/user";
import { ZodError } from "zod";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, location, phoneNumber } = body;
        await Users.register({ username, email, password, location, phoneNumber, isAdmin: false });
        return Response.json({ message: "User Register Successfully" });
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessage = error.issues.map((item) => {
                return item.path[0] + ": " + item.message;
            });

            return Response.json({
                error: errorMessage,
            }, {
                status: 400
            });
        } else if (
            error instanceof Error
        ) {
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