"use client";

import { useFormStatus } from "react-dom";
import { logout } from "@/app/action";
import Link from "next/link";

export function ButtonBtn() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <button
        type="submit"
        className="flex btn w-48 text-base-100 text-xl bg-accent"
        disabled={pending}
      >
        Now Loading...
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="flex btn w-48 bg-primary text-base-100 text-xl hover:bg-accent"
    >
      Submit
    </button>
  );
}

export function LogoutBtn() {
  return (
    <button
      className="hidden md:block"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
}
