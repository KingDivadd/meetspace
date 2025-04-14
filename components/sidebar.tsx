'use client'
import React from 'react'
import Image from 'next/image'
import { sidebar_routes } from '../constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <main className="max-sm:hidden w-[210px] md:w-[264px] h-screen bg-[#1C1F2E] flex flex-col gap-15 py-[30px]">
            <span className="flex items-center justify-start gap-[2px] md:gap-2 ml-[25px]">
                <Image 
                    src={'/icons/zoom-icon.svg'}
                    alt='logo'
                    width={35}
                    height={35}
                    className='max-sm:scale-85'
                />
                <p className="text-md  md:text-lg xl:text-xl font-[700] font-montserrat text-white">MEETSPACE</p>
            </span>

            <section className="w-full flex flex-col gap-2 px-[15px]">
                {
                    sidebar_routes.map(({ icon, title, route }, ind) => {
                        const isActive = pathname === route
                        return (
                            <Link
                                key={ind}
                                href={route}
                                className={`h-[50px] w-full rounded-[5px] flex items-center justify-start px-[10px] text-[#C9DDFF] text-sm md:text-md gap-2 md:gap-[10px] font-[500] 
                                ${isActive ? 'bg-[#0E78F9]' : 'hover:bg-[#0E78F922]'}`}
                            >
                                <Image src={icon} alt={title} width={24} height={24} className='max-sm:scale-85'/>
                                {title}
                            </Link>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default Sidebar
