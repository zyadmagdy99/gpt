import Chatinput from '@/components/Chatinput'
import React from 'react'

interface props {
  params:{id:string}
}
export default function ChatPage({params:{id}}:props) {
  return (
    <div className='flex flex-col justify-center h-[100%] p-5 overflow-hidden'>
       <div className='flex-1  pt-20'> {/*overflow-y-scroll */}
        chat
      </div>
      <Chatinput id={id}/>
    </div>
  )
}
