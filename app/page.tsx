"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import data from '@/constant/data.json'
import AddToCart from '@/components/AddToCart'
import DessertCard from '@/components/DessertCard'
import Cart from '@/components/Cart'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

const page = () => {
  return (
    <Provider store={store}>
      <div className='grid gap-5 min-w-full min-h-screen max-md:flex max-md:flex-col bg-rose-50 p-12 grid-cols-3'>
      <div className='col-span-2'>
        <h1 className='text-5xl font-bold'>Desserts</h1>
        {/*product cards grid */}
        
        <div className='grid grid-cols-3 max-md:grid-cols-1 gap-10 mt-12 ' >
          {data.map((item) => (
            <DessertCard 
              product = {item}
            />
          ))}
        </div>
      </div>
      <Cart/>
      </div>
    </Provider>
    
  )
}

export default page