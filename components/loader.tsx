'use client'
import React from 'react'
import Image from 'next/image'

const Loader = () => {
    return (
        <div className="flex items-center justify-center bg-[#1C1F2E] h-screen w-full">
            <Image 
                src={"/icons/loader.svg"}
                alt='loader'
                width={50}
                height={50}
            />
        </div>
    )
}

export default Loader