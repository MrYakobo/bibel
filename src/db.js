const in_memory = location.search.includes("in_memory")

function join_channel(payload_handler) {
	if (in_memory) return

    const base = import.meta.env.VITE_API_URL
    const source = new EventSource(`${base}/events`)
    source.onmessage = (e) => {
        const { filename, content } = JSON.parse(e.data)
        payload_handler(filename, content)
    }

    return source
}

export { join_channel }
