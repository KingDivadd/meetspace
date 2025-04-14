import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from '@/components/end_call_button'
import Loader from './loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const Meeting_room = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [show_participant, setShow_participant] = useState(true)
    const search_params = useSearchParams()
    const is_personal_room = !!search_params.get('personal')
    const {useCallCallingState} = useCallStateHooks()

    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) return <Loader /> 

    const CallLayout = ()=>{
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />

            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />

            default:
                return <SpeakerLayout participantsBarPosition="right" />
                
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] ">
                    <CallLayout />
                </div>
                <div className= {cn (" h-[calc(100vh-86px)] hidden ml-2 bg-slate-800 p-[10px] rounded-sm", {'block':show_participant})}>
                    <CallParticipantsList onClose={()=> setShow_participant(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
                <CallControls />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className='cursor-pointer rounded-full duration-200 hover:bg-slate-600 px-2.75 py-2.75 '>
                            <LayoutList size={20} className='text-white'  />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border border-slate-500 bg-slate-600 text-white'>
                        {['Grid', 'Speaker-left', 'Speaker-right'].map((item, ind)=>{
                            return(
                                <div key={ind} className="cursor-pointer " onClick={()=> setLayout(item.toLowerCase() as CallLayoutType)}>
                                    <DropdownMenuItem className='bg-transparent'> {item} </DropdownMenuItem>
                                    {ind != 2 && <DropdownMenuSeparator className='border border-gray-500 text-white' />}
                                </div>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button onClick={()=> setShow_participant(!show_participant)} className="">
                    <div className="cursor-pointer duration-200 hover:bg-slate-600 px-3 py-3 rounded-full">
                        <Users size={20} className='text-white' />
                    </div>
                </button>

                {!is_personal_room && <EndCallButton />}


            </div>
        </section>
    )
}

export default Meeting_room