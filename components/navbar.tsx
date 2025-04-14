'use client'
import React, { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import RightSidebar from './right_sidebar'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

import Image from 'next/image'


const Navbar = () => {
    const [show_sidebar, setShow_sidebar] = useState(false)

    return (
        <nav className="h-[50px] sm:h-[60px] w-full flex items-center justify-between sm:justify-end gap-2 sm:gap-5 bg-[#1C1F2E] px-[15px] sm:px-[25px] relative z-40">

            <Image 
                src={'/icons/zoom-icon.svg'}
                alt='logo'
                width={35}
                height={35}
                className='sm:hidden'
            />

            <div className="flex sm:gap-5 gap-2">

                <SignedIn>
                    <UserButton 
                    appearance={{
                        elements: {
                        userButtonAvatarBox: "w-[50px] h-[50px]",
                        },
                    }}
                    />
                </SignedIn>

                {/* If signed out, show Sign In and Sign Up buttons */}
                <SignedOut>
                    <SignInButton>
                        <button className="px-4 py-2 bg-[#0E78F9] hover:opacity-90 duration-200 text-white rounded ">Sign In</button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="px-4 py-2 bg-gray-600 hover:opacity-90 duration-200 text-white rounded ">Sign Up</button>
                    </SignUpButton>
                </SignedOut>

                <MenuIcon className="sm:hidden text-white cursor-pointer" onClick={() => setShow_sidebar(true)} />

                <RightSidebar show={show_sidebar} onClose={() => setShow_sidebar(false)} />
            </div>
            
        </nav>
    )
}

export default Navbar
