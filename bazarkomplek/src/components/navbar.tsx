import { logout } from "@/app/action";
import Link from "next/link";
import { LogoutBtn } from "./button";

export default function Navbar({ logOn }: { logOn: boolean }) {
  return (
    <header className="bg-white sticky top-0 z-50 border-b-2 flex justify-between px-5 py-4 items-center font-bold text-base-100">
      <div className="flex items-center">
        <Link href={"/"} className="font-bold text-2xl">
          Bazar Komplek
        </Link>
      </div>

      <div className=" md:flex items-center gap-10">
        <Link href={"/events"} className="hidden md:block">
          Events
        </Link>
        <Link href={"/my-orders"} className="hidden md:block">
          My Orders
        </Link>
        <Link href={"/my-lapak"} className="hidden md:block">
          My Lapak
        </Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li className="block md:hidden">
              <Link href={"/events"}>Events</Link>
            </li>
            <li className="block md:hidden">
              <Link href={"/my-orders"}>My Orders</Link>
            </li>
            <li className="block md:hidden">
              <Link href={"/my-lapak"}>My Lapak</Link>
            </li>
            <li className="">
              {logOn ? (
                <LogoutBtn />
              ) : (
                <Link href={"/login"}>Login / Register</Link>
              )}
            </li>
            <li className="">
              <a>Profile</a>
            </li>
            <li className="">
              <Link href={"/about-us"}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export function AdminNavbar() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b-2 flex justify-between px-5 py-4 items-center font-bold text-base-100">
      <div className="flex items-center">
        <Link href={"/"}>Bazar Komplek</Link>
      </div>

      <div className=" md:flex items-center gap-10">
        <Link href={"/admin-products"} className="hidden md:block">
          Products
        </Link>
        <Link href={"/admin-events"} className="hidden md:block">
          Events
        </Link>
        <LogoutBtn />
      </div>
    </header>
  );
}
