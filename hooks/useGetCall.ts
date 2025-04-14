import { useEffect, useState } from "react"
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk"
import {useUser} from '@clerk/nextjs'


export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([])
    const [is_loading, setIs_loading] = useState(false)
    const client = useStreamVideoClient()
    const {user} = useUser()


    useEffect(() => {
        let isMounted = true;
    
        const load_calls = async () => {
            if (!client || !user) return;
    
            setIs_loading(true);
    
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ],
                    },
                });
    
                if (isMounted) {
                    setCalls(calls);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching calls:", error);
                }
            } finally {
                if (isMounted) {
                    setIs_loading(false);
                }
            }
        };
    
        load_calls();
    
        return () => {
            isMounted = false;
        };
    }, [client, user?.id]);
    
    const now = new Date()

    const ended_calls = calls.filter(({state: {startsAt, endedAt}}: Call) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt )
    }) ;
    const upcoming_calls = calls.filter(({state: {startsAt}}: Call) =>{
        return (startsAt && new Date(startsAt) > now)
    })
    

    return {
        ended_calls, 
        upcoming_calls, 
        call_recordings: calls,
        is_loading
    }
}