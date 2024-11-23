"use client"
import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ImArrowUpRight } from 'react-icons/im'
import { TbPaperclip } from 'react-icons/tb'

export default function Chatinput({id}:{id:string}) {
    const [prompt, setprompt] = useState("")
    const {data:session} = useSession()
    const [loading, setloading] = useState(false)
    const model = "gpt-3.5-turbo";
    const userEmail = session?.user? (session?.user?.email as string):"unknown";
    const userName = session?.user? (session?.user?.email as string):"unknown";
    const router = useRouter();
    async function sendMessage(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if(!prompt) return;
      const input = prompt.trim();
      const message = {
         text : input,
         created_at : serverTimestamp(),
         user : {
          _id : userEmail,
          name : userName,
          avatar : (session?.user?.image as string) || "https://i.ibb.co.com/XC0YX8v/avatar.png"
         }
      }
     try{
        setloading(true)
        let chatDocumentId = id
        if(!id){
          const docRef = await addDoc(
            collection(db,"users",userEmail,"chats"),
            {
              userId : userEmail,
              cratedAt : serverTimestamp(),
            }
          );
          (chatDocumentId = docRef.id), 
          router.push(`/chat/${chatDocumentId}`)
        }
        await addDoc(
          collection(db,"users",userEmail,"chats",chatDocumentId,"message"),message
        );
        setprompt("")

        const notification = toast.loading("chatGPT is thinking ...")
        await fetch("/api/askchat",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            prompt:input,
            id:chatDocumentId,
            model,
            session:userEmail
          })
        }).then(async(res)=>{
            const data = await res.json()
            if(data?.success){
              toast.success(data?.message,{
                id:notification
              })
            }else {
              toast.error(data?.message,{
                id:notification
              });
            }
        })

     }catch(error){
        console.log(error);
        
     }finally{
      setloading(false)

     }
    }

  return (
    <div className='w-full flex flex-col items-center justify-center max-w-3xl mx-auto pt-3 px-4'>
        <form onSubmit={sendMessage} className='bg-white/10 rounded-full w-full flex items-center  px-4 py-2.5 '>
        <TbPaperclip className='text-2xl -rotate-45 text-white' />
        <input onChange={(e)=>setprompt(e.target.value)} value={prompt} type="text" className='bg-transparent font-medium tracking-wide w-full text-white placeholder:text-gray-400 px-3 outline-none ' placeholder='Message ChatGPT' />
        <button type='submit' disabled={!prompt} className='p-2.5 rounded-full text-black bg-white disabled:bg-white/30'>
        <ImArrowUpRight className='text-sm -rotate-45 text-black/80' />
        </button>
        </form>
        <p className='text-xs mt-2 font-medium tracking-wide'>ChatGPT can make mistakes. Check important info.</p>
    </div>
  )
}
