import { db } from '@/firebase';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoChatboxOutline } from 'react-icons/io5';

export default function Chatrow({id}:{id:string} ) {
    const pathname = usePathname();
    const router = useRouter();
    const {data:session} = useSession();
    const [active, setactive] = useState(false)
    const [messages,loading] = useCollection(
        query(collection(db,"users",session?.user?.email as string,"chats",id,"messages"))
    )
    useEffect(() => {
      
      if(!pathname) return;
      setactive(pathname.includes(id));
    }, [pathname,id])
    
    const[chatSnapshot] = useCollection(query(collection(db,"users",session?.user?.email as string,"chats"),orderBy("createdAt","desc")));
    const handleDelete = async()=>{
      await deleteDoc(doc(db,"users",session?.user?.email as string,"chats",id))
      if (active) {
        const nextChat = chatSnapshot?.docs?.find((chat)=>chat.id !==id);
        if(nextChat){
          router.push(`/chat/${nextChat.id}`)
        }else{
          router.push("/")
        }
      }
    }
    const chat = messages?.docs[messages?.docs?.length - 1]?.data().text &&
    messages?.docs[messages?.docs?.length-1]?.data();

    const chatText = chat?.text || "New chat"
    const shouldAnimate =active;
    
  return (
    <Link className={`flex gap-2 items-center justify-center px-2 py-1.5 hover:bg-white/10 rounded-md mb-2 duration-300 ease-in ${active?"bg-white/10":"bg-transparent"}`} href={`/chat/${id}`}>
      <IoChatboxOutline />
      <p className='hidden md:inline-flex truncate flex-1 text-sm font-medium tracking-wide'>
        {chatText}
      </p>
      <BiSolidTrashAlt onClick={handleDelete}/>
    </Link>
  )
}
