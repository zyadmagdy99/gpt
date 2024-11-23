import React from 'react'
import type { Metadata } from "next";
import Image from 'next/image';
import { googleImage } from '../assets';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Sign in | MyApp",
  description: "Sign in to MyApp to access exclusive features and content."
};

export default async function Signin() {
  const session = await auth()
  if(session?.user){
    redirect("/")
  }
  
  return (
    <div className='fixed w-full h-full bg-black/80 left-0 flex items-center justify-center'>
      <div className='bg-[#2f2f2f] w-96 flex flex-col items-center px-2 h-96 justify-center rounded-lg'>
        <div className='px-4 text-center'>
        <p className='text-3xl font-bold tracking-wide '>Welcome back </p>
        <p className='text-base tracking-wide mt-2 font-medium'>
          Login or Signup to get smartet responses,upload files and images,and more.
        </p>

        </div>
        <div className='text-red-500 mt-5 flex flex-col justify-center gap-3 items-center'>
        <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className='border border-white/50 py-2 px-6 rounded-md text-base font-semibold flex items-center gap-1 hover:border-white text-white/80 hover:text-white duration-300 ease-in-out' type="submit"><Image src={googleImage} alt='google' className='w-8' /> Signin with Google</button>

    </form>
        </div>
      </div>
    </div>
  )
}
