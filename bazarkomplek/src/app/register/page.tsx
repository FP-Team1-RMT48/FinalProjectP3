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
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-6xl text-base-100 font-bold">Register</h1>
        <br />
        <div className="card flex bg-base-100 shadow-xl w-1/2">
          <form action={handleRegister}>
            <div className="card-body">
              <div className="flex flex-row flex-wrap justify-center">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <label className="flex items-center text-primary justify-center font-bold pb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="grow input bg-white text-base-100 w-full lg:pr-2 xl:pr-2"
                    placeholder="Email"
                  />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-2 xl:pl-2">
                  <label className="pb-2 flex items-center text-primary justify-center font-bold">
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
              <label className="flex items-center gap-2 text-primary justify-center font-bold">
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
              <label className="flex items-center gap-2 text-primary justify-center font-bold">
                Address
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="grow input bg-white text-base-100 w-full"
                placeholder="address"
              />
              <label className="flex items-center gap-2 text-primary justify-center font-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="grow input bg-white text-base-100 w-full"
                placeholder="password"
              />
              <div className="flex justify-center items-center pt-10">
                <ButtonBtn />
              </div>
            </div>
          </form>
        </div>
        <h6 className="pt-5 text-base-100">
          Already have an account?&nbsp;
          <Link href="/login" className="text-accent">
            Login now!
          </Link>
        </h6>
      </main>
    </>
  );
}