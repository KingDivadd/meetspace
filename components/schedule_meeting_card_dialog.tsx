'use client'
import React, {useState} from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog"
import {  Card,   CardFooter,  CardHeader,  } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import router from "next/router";


export function ScheduleMeetingDialog() {
    const [new_meeting, setNew_meeting] = useState({description: '', datetime: ''})
    const [meeting_created, setMeeting_created] = useState(false)
    const [meeting_link, setMeeting_link] = useState('')
    const {user, isLoaded} = useUser()
    const client = useStreamVideoClient()
    const [call_details, setCall_details] = useState<Call>()


    const handle_change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setNew_meeting({...new_meeting, [name]:value})

        console.log(value)
    }

    const handle_submit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = async(e:any)=>{
        e.preventDefault()
        try {
            if(new_meeting.description && new_meeting.datetime){
                toast('Meeting created')
                setMeeting_created(true)
                // ---------
                e.preventDefault()
                if (!client || !user) return;

                try {
                    const meeting_id = crypto.randomUUID();
                    const call = client.call('default', meeting_id)

                    if (!call) throw new Error("Failed to create call");
                    
                    const startsAt = new Date(new_meeting.datetime).toISOString()

                    const description = new_meeting.description 

                    await call.getOrCreate({
                        data: {
                            starts_at: startsAt,
                            custom: {
                                description,
                            }
                        }
                    })

                    setCall_details(call)

                    if (!new_meeting.description) {
                        toast('Meeting created successfully')
                        // router.push(`/meeting/${call.id}`)
                    }
                } catch (err) {
                    console.log(err);
                    toast('Failed to create meeting')
                }
                // ------
            }else{
                toast("Please provide the description, date and meeting time.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const meetin_link = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call_details?.id}`

    const handle_clear_meeting:React.MouseEventHandler<HTMLButtonElement> =(e)=>{
        setMeeting_created(false)
    }

    const handle_click:React.FormEventHandler<HTMLButtonElement> = ()=>{
        navigator.clipboard.writeText(meetin_link);
        toast('Link copied')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="min-w-[260px] h-[250px] sm:h-[260px] rounded-[14px] bg-[#830EF9] border border-[#830EF9] p-5 flex flex-col justify-between ">
                    <CardHeader className=" px-0">
                        <span className="h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] bg-white/37 flex items-center justify-center rounded-[10px]">
                            <Image src={'/icons/plus-icon.svg'} alt="new meeting" width={30} height={30} />
                        </span>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2 items-start text-white px-0">
                        <p className="text-xl font-[600] ">Schedule Meeting</p>
                        <p className="text-md font-[400] ">Plan your meeting</p>

                    </CardFooter>
                </Card>
            </DialogTrigger>
            
            {meeting_created ? 
            <DialogContent className="sm:max-w-[425px] bg-[#1c1f2e] text-[#ecf0ff] border-0">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <div className="w-full flex flex-col items-center justify-center gap-10">
                    <span className="w-full flex flex-col items-center justify-center gap-3">
                        <Image src={'/icons/badge-icon.svg'} alt="badge" width={72} height={72} />
                        <p className="text-xl font-[600] ">Meeting Created</p>
                    </span>

                    <span className="w-full flex flex-col items-center justify-center gap-5">
                        <button className="h-[45px] w-full rounded-[5px] bg-[#0E78F9] hover:opacity-90 duration-300 flex items-center justify-center gap-2" onClick={handle_click}>
                            <Image src={'/icons/copy-icon.svg'} alt="copy" width={18} height={18} />
                            <p className="text-md font-[500]">Copy Invitation</p>
                        </button>

                        <DialogClose asChild>
                            <button className="h-[45px] w-full rounded-[5px] bg-[#252A41] hover:opacity-90 duration-300 flex items-center justify-center gap-2" onClick={handle_clear_meeting}>
                                Close
                            </button>
                        </DialogClose>

                    </span>



                </div>
            </DialogContent>
            :
            <DialogContent className="sm:max-w-[425px] bg-[#1C1F2E] border-0 text-[#ECF0FF]">
                <DialogHeader>
                    <DialogTitle className="text-white">Create Meeting</DialogTitle>
                    <DialogDescription className="text-[#ECF0FF] font-[400]">
                        Enter the description, date and time when the meeting will hold.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handle_submit} className="grid gap-5 py-4">
                    <div className="flex flex-col items-start justify-start  gap-4">
                        <Label htmlFor="description" className="text-right text-[#ECF0FF]"> Description </Label>
                        <textarea name="description" id="description" onChange={handle_change} value={new_meeting.description} className="w-full h-[90px] p-[10px] rounded-[5px] bg-[#252A41] outline-none resize-none"></textarea>
                    </div>
                    <div className="flex flex-col items-start justify-start  gap-4">
                        <Label htmlFor="datetime" className="text-right text-[#ECF0FF]"> Date </Label>
                        <input type="datetime-local" name="datetime" id="datetime" onChange={handle_change} className="h-[50px] w-full bg-[#252A41] px-[10px] outline-none" />
                    </div>

                    <button type="submit" onSubmit={handle_submit} className='bg-[#0E78F9] hover:opacity-90 w-full rounded-[5px] h-[50px] mb-[-15px]'>Schedule Meeting</button>
                </form>
            </DialogContent>}
        </Dialog>
    )
}
