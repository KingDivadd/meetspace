'use client'
import { personal_room_data } from '@/constant'
import React from 'react'
import Image from 'next/image'

const PersonalRoom = () => {
    return (
        <main className="w-full flex flex-col gap-5 px-[15px] sm:px-[25px] py-5" >
            <h1 className="text-2xl font-extrabold text-white">Previous </h1>

            <section className="w-full flex flex-col gap-5">
                {personal_room_data.map((data: {title:string, value: string}, ind:number)=>{
                    return(
                        <span key={ind} className="w-full flex items-start justify-start gap-3 ">
                            <p className="text-md text-[#C9DDFF] font-light">{data.title}</p>
                            <p className="text-md text-white font-bold wrap">{data.value}</p>
                        </span>
                    )
                })}
            </section>

            <div className="w-full flex flex-wrap gap-3">
                <button className="h-[45px] rounded-sm px-5 text-white bg-[#0E78F9]">Start the meeting</button>
                

                <button className="h-[45px] rounded-sm px-5 text-white bg-slate-800 flex items-center justify-center gap-2" onClick={()=>{
                    navigator.clipboard.writeText('link')
                }}>
                    <Image src={'/icons/copy-icon.svg'} alt={'copy'} width={15} height={15} />
                    Copy Invitation
                </button>

                <button className="h-[45px] rounded-sm px-5 text-white border border-slate-800 flex items-center justify-center gap-2" onClick={()=>{
                    navigator.clipboard.writeText('link')
                }}>
                    <Image src={'/icons/edit-icon.svg'} alt={'copy'} width={15} height={15} />
                    Edit
                </button>

                <button className="h-[45px] rounded-sm px-5 text-white border border-slate-800 flex items-center justify-center gap-2" onClick={()=>{
                    navigator.clipboard.writeText('link')
                }}>
                    <Image src={'/icons/delete-icon.svg'} alt={'copy'} width={15} height={15} />
                    Delete
                </button>

            </div>
            
        </main>
    )
}

export default PersonalRoom