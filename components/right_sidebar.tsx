'use client'
import React from 'react'
import Image from 'next/image'
import { sidebar_routes } from '../constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const RightSidebar = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
    const pathname = usePathname()

    return (
        <>
            {/* Overlay */}
            {show && <div className="fixed inset-0 bg-black/40 z-20" onClick={onClose}></div>}

            {/* Sidebar container */}
            <div className={`fixed top-0 right-0 z-30 h-screen w-[264px] bg-[#1C1F2E] flex flex-col py-[15px] transition-transform duration-300 ease-in-out
                ${show ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header with Close Button */}
                <span className="flex items-center justify-between px-[15px] mb-5">
                    <span className="flex items-center gap-2">
                        <Image 
                            src={'/icons/zoom-icon.svg'}
                            alt='logo'
                            width={32.5}
                            height={32.5}
                        />
                        <p className="text-lg font-[700] font-montserrat text-white">MEETSPACE</p>
                    </span>

                    <X className="text-white cursor-pointer" onClick={onClose} />
                </span>

                {/* Navigation */}
                <section className="w-full flex flex-col gap-2 px-[15px] mt-7">
                    {
                        sidebar_routes.map(({ icon, title, route }, ind) => {
                            const isActive = pathname === route
                            return (
                                <Link
                                    key={ind}
                                    href={route}
                                    onClick={onClose}
                                    className={`h-[45px] w-full rounded-[5px] flex items-center justify-start px-[10px] text-[#C9DDFF] text-sm gap-[10px] font-[500] 
                                    ${isActive ? 'bg-[#0E78F9]' : 'hover:bg-[#0E78F922]'}`}
                                >
                                    <Image src={icon} alt={title} width={20} height={20} />
                                    {title}
                                </Link>
                            )
                        })
                    }
                </section>
            </div>
        </>
    )
}

export default RightSidebar
