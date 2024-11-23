import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FiChevronsDown } from 'react-icons/fi';
import Signoutt from './Signoutt';

export default async function Header() {
  const session = await auth()
  return (
    <div className='flex items-center justify-between m-2.5 h-10 absolute w-full top-0 left-0 pl-2 pr-12'>
      <button className='flex items-center gap-1 bg-[#2f2f2f] hover:bg-black font-semibold tracking-wide px-3 py-2 rounded-lg duration-300'>
        ChatGPT <FiChevronsDown/>
      </button>
      {session?.user ? (
        <div className='flex gap-2'>
          <div className='w-8 h-8 rounded-full'>
            <Image className='w-full rounded-full object-cover' src={session?.user?.image as string} alt='image' width={200} height={200}/>

          </div>
          <Signoutt />          
        </div>
      )
      :<Link href={"/signin"}>Sign In </Link>}
    </div>
  )
}
