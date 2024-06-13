import { ButtonBtn } from "@/components/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await result.json();
    if (!result.ok) {
      return redirect(`/login?error=${data.error}`);
    }

    cookies().set("Authorization", `Bearer ${data.data.access_token}`);
    return redirect("/");
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-6xl text-base-100 font-bold">Login</h1>
        <br />
        <div className="card flex bg-base-100 shadow-xl w-1/2">
          <form action={handleLogin}>
            <div className="card-body">
              <label className="flex items-center text-primary justify-center font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                className="grow input bg-white text-base-100"
                placeholder="email"
              />
              <label className="flex items-center text-primary justify-center font-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="grow input bg-white text-base-100"
                placeholder="password"
              />
              <div className="flex justify-center items-center pt-10">
                <ButtonBtn />
              </div>
            </div>
          </form>
        </div>
        <h6 className="pt-5 text-base-100">
          Don&apos;t have an account?&nbsp;
          <Link href="/register" className="text-accent">
            Signup now!
          </Link>
        </h6>
      </main>
    </>
  );
}
