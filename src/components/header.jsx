"use client"

import Image from "next/image";
import Link from "next/link";
import logoDark from "../../public/images/logoDark.png";
import { signIn, signOut, useSession } from "next-auth/react"
const Header = () => {
  const { data } = useSession()
  console.log(data)
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">Home</li>
            <li className="headerLi">Posts</li>
            <li className="headerLi">Pages</li>
            <li className="headerLi">Features</li>
            <li className="headerLi">Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <img
              className="w-8 h-8 rounded-full"
              src={data ? data?.user?.image : "https://pbs.twimg.com/profile_images/1742589576659529728/ft-r6MXW_400x400.jpg"}
              alt="logo"
            />

            <p className="text-sm font-medium">
              {
                data ? `Hello ${ data?.user?.name }` : `Hello Stranger`
              }
            </p>
          </div>

          <button 
          onClick={data ? signOut : signIn}
          className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
            {
              data ? "Sign Out" : "Sign In"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
