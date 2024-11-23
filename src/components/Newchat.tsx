"use client"
import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

export default function Newchat() 
{
  const router = useRouter();
  const {data:session} = useSession()
  const userEmail = session?.user? (session?.user?.email as string):"unknown";
  
  async function createNewChat(){

    const doc = await addDoc(collection(db,"users",userEmail,"chats"),{
      userId:userEmail,
      createdAt:serverTimestamp(),
    })

    router.push(`/chat/${doc?.id}`)
      };
  return (
    <button onClick={createNewChat} className='flex items-center justify-center gap-2 w-full border border-white/20 text-xs md:text-base px-3 py-1 rounder-md text-white/50  hover:border-white/50 hover:text-white duration-300'>
      <FaPlus />
      New chat
    </button>
  )
}
