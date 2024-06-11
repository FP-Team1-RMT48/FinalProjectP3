import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-6xl text-base-100 font-bold">Register</h1>
        <br />
        <div className="card flex bg-base-100 shadow-xl w-1/2">
          <div className="card-body">
            <div className="flex flex-row flex-wrap justify-center">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <label className="flex items-center text-primary justify-center font-bold pb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="grow input bg-white w-full lg:pr-2 xl:pr-2"
                  placeholder="Email"
                />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2 xl:pl-2">
                <label className="pb-2 flex items-center text-primary justify-center font-bold">
                  Username
                </label>
                <input
                  type="text"
                  className="grow input bg-white w-full"
                  placeholder="username"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-primary justify-center font-bold">
              Phone Number
            </label>
            <input
              type="text"
              className="grow input bg-white w-full"
              placeholder="phone number"
            />
            <label className="flex items-center gap-2 text-primary justify-center font-bold">
              Address
            </label>
            <input
              type="text"
              className="grow input bg-white w-full"
              placeholder="address"
            />
            <label className="flex items-center gap-2 text-primary justify-center font-bold">
              Password
            </label>
            <input
              type="password"
              className="grow input bg-white w-full"
              placeholder="password"
            />
            <div className="flex justify-center items-center pt-10">
              <button className="flex btn w-48 bg-primary text-base-100 text-xl hover:bg-accent">
                submit
              </button>
            </div>
          </div>
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
