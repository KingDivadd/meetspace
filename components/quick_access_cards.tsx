import React from 'react'
import {NewMeetingDialog} from '@/components/new_meeting_card'
import {JoinMeetingDialog} from '@/components/join_meeting_card_dialog'
import {ScheduleMeetingDialog} from '@/components/schedule_meeting_card_dialog'
import { Card, CardFooter, CardHeader } from './ui/card'
import Image from 'next/image'


const QuickAccessCards = () => {
    return (
        <section className="w-full template-260 gap-[15px] sm:gap-[25px]">
            <NewMeetingDialog />
            <JoinMeetingDialog />
            <ScheduleMeetingDialog />

            <Card className="min-w-[260px] h-[250px] sm:h-[260px] rounded-[14px] bg-[#F9A90E] border border-[#F9A90E] p-5 flex flex-col justify-between">
                <CardHeader className="px-0">
                    <span className="h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] bg-white/37 flex items-center justify-center rounded-[10px]">
                        <Image src={'/icons/recorder-icon.svg'} alt="new meeting" width={30} height={30} />
                    </span>
                </CardHeader>

                <CardFooter className="flex flex-col gap-2 items-start text-white px-0">
                    <p className="text-xl font-[600] ">View Recordings</p>
                    <p className="text-md font-[400] ">Meeting recordings</p>

                </CardFooter>
            </Card>
        </section>
    )
}

export default QuickAccessCards


