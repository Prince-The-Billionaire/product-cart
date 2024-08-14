"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import {RootState, AppDispatch} from '@/state/store'
import { useDispatch, useSelector } from 'react-redux'
import CartItemd from './CartItem'
import { fetchProducts, resetCart } from '@/state/cartSlice'
import {Button, useDisclosure ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";


const Cart = () => {
  const cart = useSelector((state:RootState) => state.cart.items)
  const status = useSelector((state:RootState) => state.cart.status)
  const {isOpen,onClose, onOpen, onOpenChange} = useDisclosure();
  const total_quantity = cart.reduce((acc, currentValue) => {
    return acc + currentValue.quantity
  },0)
  const dispatch : AppDispatch = useDispatch()
  const total_price = cart.reduce((acc, currentValue) => {
    return acc + (currentValue.quantity * currentValue.price)
  },0)
  const handleConfirmOrder = () => {
    // place order logic here
    console.log('order confirmed')
    onClose()
    dispatch(resetCart())
    window.location.reload()
  }

  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchProducts())
    }
  },[status, dispatch])
  return (
    <div>
        <div className='bg-white p-3 rounded-3xl w-[400px] max-md:w-fit h-fit gap-4 flex flex-col'>
          <h2 className='text-4xl text-rose-900'>Your Cart ({total_quantity})</h2>
          {/*cart items */}
          <div  className={`mx-auto flex flex-col align-middle justify-center items-center gap-3 ${cart.length == 0 ? 'block':'hidden'}`} >
            <Image
              src={'/illustration-empty-cart.svg'}
              width={150}
              height={150}
              alt='empty cart'
              
            />
            <p>Your added items will appear here </p>
          </div>
          <div className={`${cart.length == 0 ? 'hidden':'block'}`}>
            <div className='flex flex-col gap-3'>
              {cart.map((item) => (
                <CartItemd key={item.id} id={item.id} name={item.name} quantity={item.quantity} price={item.price}/>
              ))}
            </div>
            <div className="flex flex-row justify-between align-bottom">
              <p className="font-thin text-sm">Order Total</p>
              <p className="font-semibold text-lg">${total_price}</p>
            </div>
            <div className='w-full p-3 flex flex-row justify-center items-center gap-3 bg-rose-50/25 rounded-md'>
              <Image
                src={'/icon-carbon-neutral.svg'}
                alt='carbon-neutral'
                width={20}
                height={20}
              />
              <p>This is a <b>carbon-neutral</b> delivery</p>
            </div>
            <Button onPress={onOpen} className='bg-rose-800 text-white hover:cursor-pointer rounded-3xl w-full'>Confirm Order</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className='p-3'>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      <Image
                        src={"/icon-order-confirmed.svg"}
                        alt='confirmed'
                        width={50}
                        height={50}
                      />
                      <p className='text-xl'>Order Confirmed</p>
                      <p className='font-thin text-base'>we hope you enjoyed your meal</p>
                    </ModalHeader>
                    <ModalBody className='bg-rose-50 rounded-md'>
                      {
                        cart.map((item) => (
                          <div>
                            <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-3'>
                              <Image
                                src={item.image.desktop}
                                alt={item.name}
                                width={50}
                                height={50}
                                className='rounded-lg '
                              />
                              <div className='flex flex-col '>
                                <p className='font-semibold'>{item.name}</p>
                                <div className='flex flex-row gap-5'>
                                <p className='text-rose-700 text-base'>{item.quantity}x</p>
                                <p className='text-rose-300 text-base'>@${item.price}</p>
                                </div>
                              </div>
                            </div>
                            <p className='font-bold'>${(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                          <div className='bg-slate-50 border w-full mt-2'/>
                          </div>
                        ))
                      }
                      <div className='flex flex-row justify-between align-bottom gap-3'>
                        <p className='font-light text-sm text-center'>Order Total</p>
                        <p className='font-bold text-lg'>${total_price.toFixed(2)}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button className='bg-rose-800 text-white hover:cursor-pointer rounded-3xl w-full' onPress={handleConfirmOrder}>
                        Start New Order
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
        </div>
          </div>
    </div>
  )
}

export default Cart