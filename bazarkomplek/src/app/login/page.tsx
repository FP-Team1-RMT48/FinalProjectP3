import { ButtonBtn } from "@/components/button";
import ClientFlashComponent from "@/components/errorFlash";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

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
    if (data.admin === true) cookies().set("isAdmin", "True");
    return redirect("/");
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-10 pt-32 md:p-24">
        <h1 className="text-3xl text-base-100 font-bold xs:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          Login
        </h1>
        <ClientFlashComponent />
        <br />
        <div className="card flex bg-base-100 shadow-xl w-full xs:w-full md:w-1/2 xl:w-1/2 2xl:w-1/3">
          <form action={handleLogin}>
            <div className="card-body">
              <label className="flex items-center text-primary justify-center font-bold xs:text-sm md:text-lg">
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
              <label className="flex items-center text-primary justify-center font-bold xs:text-sm md:text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="grow input bg-white text-base-100"
                placeholder="password"
              />
              <div className="flex justify-center items-center pt-6">
                <ButtonBtn />
              </div>
            </div>
          </form>
        </div>
        <h6 className="pt-5 text-base-100 text-center">
          Don&apos;t have an account?&nbsp;
          <Link href="/register" className="text-accent">
            Signup now!
          </Link>
        </h6>
      </main>
    </>
  );
}
