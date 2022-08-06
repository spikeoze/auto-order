import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar({ darkTheme, setDarkTheme }) {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="px-5 py-3 flex justify-between items-center transition-all shadow-md ">
      <div>
        <p className="bg-gray-800 dark:bg-neutral-100 rounded-sm px-2 py-1 lg:text-lg text-md font-semibold capitalize cursor-pointer text-neutral-200 dark:text-gray-800">
          {router.pathname == "/"
            ? "home"
            : router.pathname.split("/").join(" / ")}
        </p>
      </div>

      <div className="flex justify-evenly items-center">
        <div
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden border border-gray-400 rounded-md p-1 cursor-pointer dark:bg-neutral-100 dark:hover:bg-gray-300 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        <div
          className={` ${
            !navOpen ? "hidden" : ""
          } gap-4 md:gap-0 absolute z-40 bg-neutral-100 dark:bg-gray-800 right-0 rounded-lg left-0 top-14 shadow-lg text-center
            p-5 md:p-0 md:flex md:flex-row md:shadow-none  md:w-full md:static  space-x-0 md:space-x-5 space-y-3 md:space-y-0 lg:text-lg text-md   
        `}
        >
          <Link href="/">
            <p
              className={`${
                router.pathname == "/"
                  ? " border-b-4 "
                  : " hover:underline underline-offset-8"
              }
            px-3 py-1 cursor-pointer  border-black dark:border-gray-300 hover:opacity-80 dark:text-neutral-200`}
            >
              Home
            </p>
          </Link>
          <Link href="/adminpanel">
            <p
              className={`${
                router.pathname.includes("/adminpanel")
                  ? " border-b-4"
                  : "hover:underline underline-offset-8"
              }
            px-3 py-1 cursor-pointer border-black dark:border-gray-300 hover:opacity-80 dark:text-neutral-200`}
            >
              Adminpanel
            </p>
          </Link>

          <Link href="/menu">
            <p
              className={`${
                router.pathname == "/menu"
                  ? "border-b-4 "
                  : "hover:underline underline-offset-8"
              }
            px-3 py-1 cursor-pointer border-black dark:border-gray-300 hover:opacity-80 dark:text-neutral-200`}
            >
              Menu
            </p>
          </Link>
          <Link href="/kitchen">
            <p
              className={`${
                router.pathname == "/kitchen"
                  ? " border-b-4 "
                  : "hover:underline underline-offset-8"
              }
            px-3 py-1 cursor-pointer border-black dark:border-gray-300 hover:opacity-80 dark:text-neutral-200`}
            >
              Kitchen
            </p>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-md dark:bg-gray-50 dark:text-gray-900 bg-white rounded-full border px-2 py-1 hover:shadow-lg"
        >
          {darkTheme ? "💡 Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
