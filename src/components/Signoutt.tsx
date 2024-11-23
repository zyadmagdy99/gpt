
import { signOut } from '@/auth'
import React from 'react'

export default function Signoutt() {
  return (
    <form
    action={async () => {
      "use server"
      await signOut()
    }}
  >
    <button className='text-sm underline text-gray-200 hover:text-white duration-300' type="submit">Sign Out</button>
  </form>
  )
}
