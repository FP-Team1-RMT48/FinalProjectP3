export default function Navbar() {
    return (
        <header className="bg-white sticky top-0 z-50 border-b-2 flex justify-between px-5 py-4 items-center font-bold text-base-100">
            <div className="flex items-center">
                <p>Bazar Komplek</p>
            </div>

            <div className=" md:flex items-center gap-10">
                <p className="hidden md:block">Events</p>
                <p className="hidden md:block">My Order</p>
                <p className="hidden md:block">My Lapak</p>
                <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                >
                    <li className="block md:hidden">
                        <a>Events</a>
                    </li>
                    <li className="block md:hidden">
                        <a>My Order</a>
                    </li>
                    <li className="block md:hidden">
                        <a>My Lapak</a>
                    </li>
                    <li className="">
                        <a>Login / Register</a>
                    </li>
                    <li className="">
                        <a>Profile</a>
                    </li>
                    <li className="">
                        <a>About Us</a>
                    </li>
                </ul>
            </div>
            </div>      
        </header>
    );
}
