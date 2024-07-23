"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function Profile() {
  const router= useRouter()

const logout=()=>{
  try {
    const res=axios.get('/api/users/logout')
    console.log(res);
    
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className='flex flex-col item-center justify-center min-h-screen py-2'>
      <h2>Profile</h2>
      <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 rounded px-2 py-1 mt-2'>Logout</button>
    </div>
  )
}

 
