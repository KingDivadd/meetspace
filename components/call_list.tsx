// @ts-nocheck

'use client'
import React, { useState, useEffect } from 'react'
import {useGetCalls} from '@/hooks/useGetCall'
import { useRouter } from 'next/navigation'
import { Call, CallState } from '@stream-io/video-react-sdk'
import { CallRecording } from '@stream-io/node-sdk'
import MeetingCard from './meeting_card'
import Loader from './loader'
import { toast } from "sonner"

const CallList = ({type}: {type: 'ended' |'upcoming'|'recording'}) => {
    const router = useRouter()
    const {ended_calls, is_loading, call_recordings, upcoming_calls} = useGetCalls()
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    
    const get_calls = () =>
        {
        switch (type) {
            case 'ended':
                return ended_calls
            case 'upcoming':
                return upcoming_calls
            case 'recording':
                return recordings
        
            default:
                return []
        }
    }
    
    const get_no_call_message = () =>{
        switch (type) {
            case 'ended':
                return 'No Prevoius Calls'
            case 'upcoming':
                return "No Upcoming Calls"
            case 'recording':
                return "No Recordings"
        
            default:
                return ''
        }
    }

    useEffect(() => {
        try {
            const fetch_recordings = async()=>{
                const call_data = await Promise.all(call_recordings.map((meeting)=> meeting.queryRecordings()))
    
                const recordings = call_data
                .filter(call => call.recordings.length > 0  )
                .flatMap(call => call.recordings)
    
                setRecordings(recordings)
            }
            
            if (type == 'recording') fetch_recordings();
        } catch (err) {
            console.log(err)            
            toast('Try again later')
        }

    }, [type, call_recordings])

    const calls = get_calls()

    const no_calls_message = get_no_call_message()

    if (is_loading) return (
        <div className="w-full h-[calc(100vh - 160px)] ">
            <Loader />
        </div>
    )

    return (
        <div className="w-full grid gap-[15px] sm:gap-[25px] grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording, ind:number)=>{

                console.log(meeting.start_time, meeting.end_time)
                return(
                    <MeetingCard 
                        // key={type !== 'recording' ?(meeting as Call).id : (meeting as CallRecording).id} 
                        key={ind}
                        type={type}
                        icon={
                            type === 'ended' ? '/icons/calender-backward-icon.svg': type == 'upcoming' ? '/icons/calender-forward-icon.svg' : 'icons/video-icon.svg'
                        }
                        title={ (meeting as Call).state?.custom.description.substring(0, 20) || meeting.filename.substring(0, 20) || "No Description"}
                        date={type !== 'recording' ? meeting.state.startsAt.toLocaleString() : meeting.start_time.toLocaleString()}
                        end_date={type == 'recording' && meeting.end_time.toLocaleString()}
                        is_previous_meeting={type == 'ended'}
                        button_icon_1={type == 'recording' ? '/icons/play-icon.svg': ''}
                        button_text_1={type == 'recording' ? 'Play' : 'Start' }
                        button_icon_2={type == 'recording' ? '/icons/share-icon.svg': '/icons/copy-icon.svg'}
                        button_text_2={type == 'recording' ? 'Share' : 'Copy Invitation' }
                        handle_click={type == 'recording' ? ( ()=> router.push(`${meeting.url}`)) : ( ()=> router.push(`/meeting/${meeting.id}`))}
                        link={type == 'recording' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                    />
                )
            })
            :
            (<p className="mt-50 text-lg font-[500] text-white w-full text-center">{no_calls_message}</p>)
            
            }
        </div>
    )
}

export default CallList