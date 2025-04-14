'use client'
import { useUser } from '@clerk/nextjs'
import { StreamTheme, StreamCall } from '@stream-io/video-react-sdk'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Meeting_room from '@/components/meeting_room'
import Meeting_setup from '@/components/meeting_setup'
import {getCallById} from '@/hooks/useGetCallById'
import Loader from '@/components/loader'
 
const Meeting = () => {
    const [id, setId] = useState('')
    const path = usePathname()
    const {user, isLoaded} = useUser()
    const [is_setup_complete, setIs_setup_complete] = useState(false)

    const split_path = path.split('/')

    const {call, is_call_loading} = getCallById(split_path[split_path.length - 1])

    if (!isLoaded || is_call_loading) return <Loader />

    // useEffect(() => {
    //     const split_path = path.split('/')
    //     setId(split_path[split_path.length - 1])

    // }, [])

    return (
        <main className="bg-[#161925] text-white w-full h-screen">
            <StreamCall call={call}>
                <StreamTheme>
                    {is_setup_complete ? 
                        (<Meeting_room />)
                        :
                        (<Meeting_setup setIs_setup_complete={setIs_setup_complete} />)
                    }
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting