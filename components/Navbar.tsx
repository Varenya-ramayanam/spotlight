import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/auth';
import { signIn, signOut } from '@/auth'; // Import from the correct server action path

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={60} height={30} className="h-10" />
        </Link>
        <div className="flex items-center gap-5 text-black font-medium">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server";
                await signOut({ redirectTo: '/' }); // Redirect to home after sign out
              }}>
                <button type="submit" className="font-medium bg-red-500 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </form>

              <Link href={`/user/${session.user.id}`} className="flex items-center gap-2">
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server";
              await signIn('github');
            }}>
              <button type="submit" className="font-medium bg-blue-500 text-white px-4 py-2 rounded-md">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}; 

export default Navbar;
