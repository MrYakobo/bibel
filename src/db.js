import { createClient } from '@supabase/supabase-js'

const event = 'updates'

function join_channel(subscribed_handler, payload_handler) {
    const supabase_url = import.meta.env.VITE_CHANNEL_URL
    const ANON_KEY = import.meta.env.VITE_CHANNEL_KEY
    const room = 'any'

    const supabase = createClient(supabase_url, ANON_KEY, {
        realtime: {
            params: {
                eventsPerSecond: 10,
            },
        },
    })

    const channel = supabase.channel(room)
    channel
        .on('broadcast', { event }, (p) => { payload_handler(p) })
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                subscribed_handler(channel, event)
            }
        })

    return channel
}

function write(channel, payload) {
    console.log("WRITING PAYLOAD", { channel, payload })
    channel.send({ type: 'broadcast', event, payload })
}

export { write, join_channel }