'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

const EndCallButton = () => {
    const router = useRouter()

    const call = useCall()

    const {useLocalParticipant} = useCallStateHooks()

    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId == call.state.createdBy.id;

    if (!isMeetingOwner) return null;


    return (
        <button onClick={async () => {
            call.endCall()
            router.push('/')
        }} className="px-4 py-2 rounded-sm bg-red-700 hover:opacity-90">End call</button>
    )
}

export default EndCallButton