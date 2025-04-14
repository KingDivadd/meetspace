'use client'
import React from 'react'
import CallList from '@/components/call_list'

const Upcoming = () => {
    return (
        <main className="w-full flex flex-col gap-5 px-[15px] sm:px-[25px] py-5" >
            <h1 className="text-2xl font-extrabold text-white">Upcoming</h1>

            <CallList type={"upcoming"} />

        </main>
    )
}

export default Upcoming