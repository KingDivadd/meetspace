'use client'
import React, {useState} from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

import {  Card,   CardFooter,  CardHeader,  } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";


export function NewMeetingDialog() {
    const router = useRouter()
    const {user, isLoaded} = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        datetime: new Date(),
        description: '',
        link: ''
    })
    const [call_details, setCall_details] = useState<Call>()


    const handle_submit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = async(e)=>{
        e.preventDefault()
        if (!client || !user) return;

        try {
            const meeting_id = crypto.randomUUID();
            const call = client.call('default', meeting_id)

            if (!call) throw new Error("Failed to create call");
            
            const startsAt = values.datetime.toISOString() || new Date(Date.now()).toISOString()

            const description = values.description || 'Instant meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })

            setCall_details(call)

            if (!values.description) {
                toast('Meeting created successfully')
                router.push(`/meeting/${call.id}`)
            }
        } catch (err) {
            console.log(err);
            toast('Failed to create meeting')
        }
        
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="min-w-[260px] h-[250px] sm:h-[260px] rounded-[14px] bg-[#FF742E] border border-[#FF742E] p-5 flex flex-col justify-between">
                    <CardHeader className=" px-0">
                        <span className="h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] bg-white/37 flex items-center justify-center rounded-[10px]">
                            <Image src={'/icons/plus-icon.svg'} alt="new meeting" width={30} height={30} />
                        </span>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2 items-start text-white px-0">
                        <p className="text-xl font-[600] ">New Meeting</p>
                        <p className="text-md font-[400] ">Setup a new recording</p>

                    </CardFooter>
                </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] bg-[#1C1F2E] border-0 text-[#ECF0FF]">
                <DialogHeader>
                    <DialogTitle className="text-white">Start an Instant Meeting</DialogTitle>
                    <DialogDescription className="text-[#ECF0FF] font-[400]"></DialogDescription>
                </DialogHeader>

                <button type="submit" onClick={handle_submit} className='bg-[#0E78F9] hover:opacity-90 w-full rounded-[5px] h-[50px] mt-10'>Start Meeting</button>

            </DialogContent>
        </Dialog>
    )
}
