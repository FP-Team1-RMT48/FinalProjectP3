import Users from "@/db/model/user";
import { verifyPassword } from "@/helpers/bcryptjs";
import { createToken } from "@/helpers/jwt";
import { cookies } from "next/headers";
import { ZodError } from "zod";
export const dynamic = "force-dynamic";

export interface InputLogin {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputLogin: InputLogin = {
      email: body.email,
      password: body.password,
    };
    const user = await Users.login(inputLogin);
    if (!user) {
      return Response.json(
        {
          error: "Invalid Email/Password",
        },
        {
          status: 401,
        }
      );
    }
    const isValid = verifyPassword(body.password, user.password);
    if (!isValid) {
      return Response.json(
        {
          error: "Invalid Email/Password",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = createToken({
      _id: user._id,
      email: user.email,
    });
    cookies().set("Authorization", `Bearer ${access_token}`);
    return Response.json({
      data: { access_token },
      admin: user.isAdmin,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].message;
      return Response.json({ error: err }, { status: 400 });
    }
    return Response.json(error);
  }
}
