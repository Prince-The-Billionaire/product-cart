"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addItem, increaseQuantity,decreaseQuantity, removeItem } from '@/state/cartSlice'
import { CartItem } from '@/types/types'
import { RootState,AppDispatch } from '@/state/store'

const AddToCart = ({setBorder, product}:any) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const [number, setNumber] = useState<number>(1)
    const dispatch = useDispatch()
    
    const handleAddItem = (product:any)=> {
      dispatch(addItem(product))
    }
    
    const handleIncreaseQuantity = (id:number) => {
      dispatch(increaseQuantity(id))
    }

    const handleDecreaseQuantity = (id:number) => {
      dispatch(decreaseQuantity(id))
    }
    const handleRemoveItem = (id:number) => {
      dispatch(removeItem(id))
    }
  const handleClick = () => {
    setClicked((prev) => prev = true)
    setBorder((prev:boolean) => prev = true)
    handleAddItem(product)
  }

  const increment = () => {
    setNumber((prev) => prev + 1)
    handleIncreaseQuantity(product.id)
    
  }

  const decrement = () => {
    if(number > 0){
      setNumber(number - 1)
      handleDecreaseQuantity(product.id)
    }
    if(number < 1){
      handleRemoveItem(product.id)
      setClicked((prev) => prev = false)
      setBorder((prev:boolean) => prev = false)
      setNumber(1)
    }
  }
  
  return (
    <div className='mx-auto'>
      <div onClick={() => handleClick()} className={`bg-white ${!clicked ?'block':'hidden' } hover:cursor-pointer rounded-3xl z-5 -mt-5 self-center   w-40 p-2  border-1 border-rose-700`}>
        <div className=' text-black gap-2 justify-center flex flex-row'>
          <Image
            src={'/icon-add-to-cart.svg'}
            width={20}
            height={20}
            alt='add to cart'
          />
          <p className='font-bold '>Add to Cart</p>
        </div>
      </div>
      <div className={`bg-rose-700 ${!clicked ?'hidden':'flex' } flex-row justify-between hover:cursor-pointer rounded-3xl z-5 -mt-5 self-center   w-40 p-2  border-2 `}>
          <div className=' border-2 rounded-full bg-transparent p-1.5 border-white w-fit' onClick={increment}>
              <Image
                src={'/icon-increment-quantity.svg'}
                width={8}
                height={8}
                alt='add to cart'
                className='hue-rotate-60'
              />
          </div>
          <p>{number}</p>
          <div className='border-2 self-center rounded-full bg-transparent p-1.5 py-2 border-white w-fit' onClick={decrement}>
              <Image
              src={'/icon-decrement-quantity.svg'}
              width={10}
              height={10}
              alt='add to cart'
              className='my-0.5'
              />
          </div>
      </div>
    </div>
  )
}

export default AddToCart