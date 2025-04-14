'use client'
import React, {useState} from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

import {  Card,   CardFooter,  CardHeader,  } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { toast } from "sonner"


export function JoinMeetingDialog() {
    const [meeting_link, setMeeting_link] = useState('')

    const handle_change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =(e)=>{
        setMeeting_link(e.target.value)
    }

    const handle_submit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = (e:any)=>{
        e.preventDefault()
        try {
            if(!meeting_link){
                toast('Please provide the meeting link')
                return;
            }
            toast(meeting_link)
        } catch (error) {
            console.log(error)
        }
    }

    const handle_paste = async (e:any) => {
        e.preventDefault()
        try {
            const text = await navigator.clipboard.readText()
            if (!text) {
                toast('Clipboard is empty')
                return
            }
            setMeeting_link(text)
            toast('Pasted from clipboard')
        } catch (err) {
            console.error('Failed to read clipboard: ', err)
            toast('Failed to read from clipboard')
        }
    }
    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="min-w-[260px] h-[250px] sm:h-[260px] rounded-[14px] bg-[#0E78F9] border border-[#0E78F9] p-5 flex flex-col justify-between">
                    <CardHeader className=" px-0">
                        <span className="h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] bg-white/37 flex items-center justify-center rounded-[10px]">
                            <Image src={'/icons/plus-icon.svg'} alt="new meeting" width={30} height={30} />
                        </span>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2 items-start text-white px-0">
                        <p className="text-xl font-[600] ">Join Meeting</p>
                        <p className="text-md font-[400] ">via invitation link</p>

                    </CardFooter>
                </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] bg-[#1C1F2E] border-0 text-[#ECF0FF]">
                <DialogHeader>
                    <DialogTitle className="text-white">Join Meeting</DialogTitle>
                    <DialogDescription className="text-[#ECF0FF] font-[400]">
                    </DialogDescription>
                </DialogHeader>

                <form  className="grid gap-5 py-4">
                    <div className="flex flex-col items-start justify-start  gap-4">
                        <Label htmlFor="meeting_link" className="text-right text-[#ECF0FF]"> Meeting Link </Label>
                        <span className="h-[45px] flex items-center justify-between gap-2 w-full">
                            <input name="meeting_link" id="meeting_link" onChange={handle_change} value={meeting_link} className="flex-1 h-[45px] p-[10px] rounded-[5px] bg-[#252A41] outline-none resize-none" />

                            <button className="h-full bg-[#0E78F9] text-white rounded-[5px] px-5 nowrap" onClick={handle_paste}>Paste</button>
                        </span>
                    </div>

                    <button type="submit" onClick={handle_submit} className='bg-[#0E78F9] hover:opacity-90 w-full rounded-[5px] h-[50px] mb-[-15px]'>Join Meeting</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
