'use client'
import { getFormattedDateTime } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const HomeWallPaperCont = () => {
    const [current_datetime, setCurrent_datetime] = useState({
        date: "Sunday, January 01, 2025",
        time: "00:00",
        meridian: "AM"
    })
    
    useEffect(() => {
        
        get_current_datetime()
        setInterval(() => {
            get_current_datetime()
        }, 45000);

        function get_current_datetime(){
            const current_date = getFormattedDateTime()
            setCurrent_datetime(current_date)
        }
    }, [])

    return (
        <article className="w-full min-h-[250px] sm:min-h-[280px] rounded-md relative ">
            <Image src={'/wallpaper.svg'} alt='wallpaper' objectFit='cover' layout='fill' className='rounded-md' />
            <div className="h-full w-full absolute right-0 top-0 bg-blue-5000 px-5 py-5 flex flex-col items-start justify-between">
                <span className="h-[45px] flex items-center px-3 sm:px-5 rounded-md gap-2 bg-white/10 text-white">
                    <p className="text-md">Upcoming Meeting:</p>
                    <p className="text-md font-[500]">12:30 PM</p>
                </span>


                <div className="w-full flex flex-col gap-2">
                    <span className="flex items-end justify-start gap-2 text-white">
                        <p className="text-[60px] font-extrabold leading-none ">{current_datetime.time || "00:00"}</p>
                        <p className="text-lg font-[600]">{current_datetime.meridian || "AM"}</p>
                    </span>
                    <p className="text-lg text-[#C9DDFF]">{current_datetime.date || "Sunday, January 01, 2025"}</p>
                </div>
            </div>
        </article>
    )
}

export default HomeWallPaperCont