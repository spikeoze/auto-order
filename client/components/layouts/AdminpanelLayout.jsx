import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function AdminpanelLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex space-x-1">
      {/* SideBar */}
      <div className= "md:w-44 min-h-screen  shadow-xl p-3 space-y-3 mt-2">
        <Link href="/adminpanel">
          <h3 className={`${router.pathname == "/adminpanel"? "bg-gray-800 dark:bg-gray-200 dark:text-black text-white":'dark:text-gray-400 '} flex items-center space-x-3 font-semibold cursor-pointer border  border-gray-400 dark:border-neutral-400 rounded-md px-2 py-1`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>{" "}
            <span className="hidden md:inline ">Home</span>
          </h3>
        </Link>

        <Link href="/adminpanel/products">
          <h3 className={`${router.pathname == "/adminpanel/products"? "bg-gray-800 dark:bg-gray-200 dark:text-black text-white":'dark:text-gray-400 '} flex items-center space-x-3 font-semibold cursor-pointer border  border-gray-400 dark:border-neutral-400 rounded-md px-2 py-1`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden md:inline ">Products</span>
          </h3>
        </Link>

        <Link href="/adminpanel/category">
          <h3 className={`${router.pathname == "/adminpanel/category"? "bg-gray-800 dark:bg-gray-200 dark:text-black text-white":'dark:text-gray-400 '} flex items-center space-x-3 font-semibold cursor-pointer border  border-gray-400 dark:border-neutral-400 rounded-md px-2 py-1`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{" "}
            <span className="hidden md:inline">Category</span>
          </h3>
        </Link>
      </div>

      {/* Main screen */}
      <div className="w-screen overflow-auto transition-all">{children}</div>
    </div>
  );
}

export default AdminpanelLayout;
