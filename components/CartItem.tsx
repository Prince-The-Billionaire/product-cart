"use client"
import React from 'react'
import Image from 'next/image'
import { CartItem } from "@/types/types";
import { useDispatch } from 'react-redux';
import { RootState,AppDispatch } from '@/state/store';
import { addItem, removeItem, increaseQuantity,decreaseQuantity } from '@/state/cartSlice';
const CartItemd = ({id,name,quantity,price}:CartItem) => {
  const dispatch:AppDispatch = useDispatch()

  

  const handleRemoveItem = (id:number) => {
    dispatch(removeItem(id))
  }

  
  return (
    <div>
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h1 className="text-lg font-semibold">{name}</h1>
            <div className="flex flex-row gap-5 mt-3">
              <p className="text-rose-700 font-semibold">{quantity}x</p>
              <p className="text-rose-100">@${price}</p>
              <p className="text-rose-300">${price*quantity}</p>
            </div>
          </div>
          <Image
              src={'/icon-remove-item.svg'}
              width={20}
              height={20}
              alt='remove item'
              className='ml-auto mt-2 rounded-full border-2  border-rose-100 p-1 hover:invert cursor-pointer'
              onClick = {
                () => handleRemoveItem(id)
              }
          />
      </div>
      <div className="border  border-gray-200 mt-4"/>
    </div>
  )
}

export default CartItemd