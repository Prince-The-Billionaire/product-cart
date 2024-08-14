import React, { useState } from 'react'
import Image from 'next/image'
import AddToCart from './AddToCart'
import { DessertProps } from '@/types/types'

const DessertCard = ({product}:any) => {
  const [border, setBorder] = useState<boolean>(false)
  return (
    <div key={product.id} className='flex flex-col text-left w-fit'> 
              <Image
                src={product.image.desktop}
                alt={product.name}
                width={200}
                height={200}
                className={`rounded-lg shadow-md  ${border ? 'border-rose-900 border-[3px]':'' }`}
              />
              <AddToCart product={product} setBorder={setBorder}/>
              <p className='text-slate-400'>{product.category}</p>
              <p className='font-2xl font-semibold'>{product.name}</p>
              <p className='text-rose-700 font-semibold'>${product.price}</p>
            </div>
  )
}

export default DessertCard