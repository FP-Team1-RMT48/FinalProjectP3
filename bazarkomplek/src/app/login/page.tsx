import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-6xl text-base-100 font-bold">Login</h1>
        <br />
        <div className="card flex bg-base-100 shadow-xl w-1/2">
          <div className="card-body">
            <label className="flex items-center text-primary justify-center font-bold">
              Email/Username
            </label>
            <input
              type="text"
              className="grow input bg-white"
              placeholder="Email"
            />
            <label className="flex items-center text-primary justify-center font-bold">
              Password
            </label>
            <input
              type="password"
              className="grow input bg-white"
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
          Don&apos;t have an account?&nbsp;
          <Link href="/register" className="text-accent">
            Signup now!
          </Link>
        </h6>
      </main>
    </>
  );
}
