import { useEffect, useState } from "react"
import {Call, useStreamVideoClient} from '@stream-io/video-react-sdk'

export const getCallById = (id: string | string[]) =>{
    const [call, setCall] = useState<Call>()
    const [is_call_loading, setIs_call_loading] = useState(true)

    const client = useStreamVideoClient()

    useEffect(() => {
        if (!client) return;

        const load_call = async () => {
            const {calls} = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })   

            if (calls.length > 0 ) setCall(calls[0]);

            setIs_call_loading(false)
        }

        load_call()
    }, [client, id])

    return {call, is_call_loading}
}