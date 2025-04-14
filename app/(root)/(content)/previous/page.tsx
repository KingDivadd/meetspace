import CallList from '@/components/call_list'
import React from 'react'

const Previous = () => {
    return (
        <main className="w-full flex flex-col gap-5 px-[15px] sm:px-[25px] py-5" >
            <h1 className="text-2xl font-extrabold text-white">Previous </h1>

            <CallList type={"ended"} />

        </main>
    )
}

export default Previous