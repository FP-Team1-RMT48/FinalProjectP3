import { ButtonBtn } from "@/components/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const handleRegister = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const username = formData.get("username");
    const phoneNumber = formData.get("phoneNumber");
    const location = formData.get("location");
    const password = formData.get("password");

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          phoneNumber,
          location,
          password,
          isAdmin: false,
        }),
      }
    );
    const data = await result.json();
    if (!result.ok) {
      return redirect(`/register?error=${data.error}`);
    }
    console.log(data);
    return redirect("/login");
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-10 md:p-24">
        <h1 className="text-3xl text-base-100 font-bold xs:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
          Register
        </h1>
        <br />
        <div className="card flex bg-base-100 shadow-xl w-full xs:w-full md:w-1/2 xl:w-1/2 2xl:w-1/3">
          <form action={handleRegister}>
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <label className="flex items-center text-primary justify-center font-bold pb-2 text-xs xs:text-sm md:text-lg lg:text-sm 2xl:text-sm">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="grow input bg-white text-base-100 w-full lg:pr-2 xl:pr-2"
                    placeholder="email"
                  />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-2 xl:pl-2">
                  <label className="pb-2 flex items-center text-primary justify-center font-bold xs:text-sm md:text-lg lg:text-sm 2xl:text-sm text-xs">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    className="grow input bg-white text-base-100 w-full"
                    placeholder="username"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-primary justify-center font-bold xs:text-sm xs:text-sm md:text-lg lg:text-sm 2xl:text-sm text-xs">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="phoneNumber"
                className="grow input bg-white text-base-100 w-full"
                placeholder="phone number"
              />
              <label className="flex items-center gap-2 text-primary justify-center font-bold xs:text-sm md:text-lg lg:text-sm 2xl:text-sm text-xs">
                Address
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="grow input bg-white text-base-100 w-full"
                placeholder="address"
              />
              <label className="flex items-center gap-2 text-primary justify-center font-bold xs:text-sm md:text-lg lg:text-sm 2xl:text-sm text-xs">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="grow input bg-white text-base-100 w-full"
                placeholder="password"
              />
              <div className="flex justify-center items-center pt-6">
                <ButtonBtn />
              </div>
            </div>
          </form>
        </div>
        <h6 className="pt-5 text-base-100 text-center">
          Already have an account?&nbsp;
          <Link href="/login" className="text-accent">
            Login now!
          </Link>
        </h6>
      </main>
    </>
  );
}
