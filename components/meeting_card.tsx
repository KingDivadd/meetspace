'use client'
import React, {} from 'react'
import { Card, CardFooter, CardHeader, CardDescription } from './ui/card'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { DialogClose, DialogHeader } from './ui/dialog'


const MeetingCard = ({icon, title, date, end_date, is_previous_meeting, handle_click, button_icon_1, button_text_1, button_icon_2, button_text_2, link, type}:MeetingCardProps) => {
    return (
        (type == 'recording' ? 
        <Dialog>
            <DialogTrigger asChild>
                <Card className='min-h-[240px] min-w-[350px]  bg-[#1C1F2E] border border-[#1C1F2E] flex flex-col justify-between'>
                    <CardHeader className="flex flex-col gap-3 items-start justify-start">
                        <Image 
                            src={icon}
                            alt='calender'
                            width={30} height={30}
                        />

                        {type == "recording" && <p className="text-lg text-white font-bold">{title}</p>}

                        { type !== 'recording' ?
                        <div className="w-full flex flex-col sm:gap-2">
                            <p className="text-lg text-white font-bold">{title}</p>
                            <p className="text-sm font-light text-[#ECF0FF]">{formatDateTime(date!!)}</p>
                        </div>
                        :
                        <div className="flex gap-5">
                            <span className="flex gap-2">
                                <p className="text-sm font-light text-white">Start Time:</p>
                                <p className="text-sm font-bold text-white">{formatDateTime(date!!)}</p>
                            </span>
                            <span className="flex gap-2">
                                <p className="text-sm font-light text-white">End Time:</p>
                                <p className="text-sm font-bold text-white">{formatDateTime(end_date!!)}</p>
                            </span>
                        </div>}
                    </CardHeader>

                    <CardDescription className="flex flex-wrap items-center gap-3 justify-between ">
                        <div className="w-[200px] h-[50px] bg-slate-600 "></div>

                        <div className="flex gap-3 h-[45px] ">
                            <button className="px-5 h-full rounded-sm bg-[#0E78F9] hover:opacity-90 cursor-pointer text-white flex items-center gap-1.5" onClick={handle_click}>
                                <Image src={button_icon_1!!} alt='copy icon' width={15} height={15} />
                                {button_text_1}
                            </button>

                            <button className="px-5 text-white h-full rounded-sm bg-slate-700 hover:opacity-90 cursor-pointer flex items-center gap-1.5" onClick={()=> navigator.clipboard.writeText(link!!)}>
                                <Image src={button_icon_2!!} alt='copy icon' width={15} height={15} />
                                {button_text_2}
                            </button>

                        </div>
                    </CardDescription>
                </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] bg-[#1C1F2E] border-0 text-[#ECF0FF]">
                <div className="relative w-full h-full">
                    <iframe
                        src={link} // or meeting.url if external
                        className="w-full h-full border-none"
                        // allow="camera; microphone; fullscreen"
                    />
                    <DialogClose asChild>
                        <button className="px-5 py-3 rounded-sm text-white">Close</button>
                    </DialogClose>
                </div>

            </DialogContent>
        </Dialog>
        :
        <Card className='min-h-[240px] min-w-[350px]  bg-[#1C1F2E] border border-[#1C1F2E] flex flex-col justify-between'>
            <CardHeader className="flex flex-col gap-3 items-start justify-start">
                <Image 
                    src={icon}
                    alt='calender'
                    width={30} height={30}
                />

                {type == "recording" && <p className="text-lg text-white font-bold">{title}</p>}

                { type !== 'recording' ?
                <div className="w-full flex flex-col sm:gap-2">
                    <p className="text-lg text-white font-bold">{title}</p>
                    <p className="text-sm font-light text-[#ECF0FF]">{formatDateTime(date!!)}</p>
                </div>
                :
                <div className="flex gap-5">
                    <span className="flex gap-2">
                        <p className="text-sm font-light text-white">Start Time:</p>
                        <p className="text-sm font-bold text-white">{formatDateTime(date!!)}</p>
                    </span>
                    <span className="flex gap-2">
                        <p className="text-sm font-light text-white">End Time:</p>
                        <p className="text-sm font-bold text-white">{formatDateTime(end_date!!)}</p>
                    </span>
                </div>}
            </CardHeader>

            <CardDescription className="flex flex-wrap items-center gap-3 justify-between ">
                <div className="w-[200px] h-[50px] bg-slate-600 "></div>

                {type !== 'ended' && <div className="flex gap-3 h-[45px] ">
                    <button className="px-5 h-full rounded-sm bg-[#0E78F9] hover:opacity-90 cursor-pointer text-white flex items-center gap-1.5" onClick={handle_click}>
                        {type !== 'upcoming' && <Image src={button_icon_1!!} alt='copy icon' width={15} height={15} />}
                        {button_text_1}
                    </button>

                    <button className="px-5 text-white h-full rounded-sm bg-slate-700 hover:opacity-90 cursor-pointer flex items-center gap-1.5" onClick={()=> navigator.clipboard.writeText(link!!)}>
                        <Image src={button_icon_2!!} alt='copy icon' width={15} height={15} />
                        {button_text_2}
                    </button>


                </div>}
            </CardDescription>
        </Card>)   
    )
}

export default MeetingCard


