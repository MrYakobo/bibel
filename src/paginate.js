function get_p(paragraph) {
    return {
        sw: paragraph.scrollWidth,
        cw: paragraph.clientWidth,
        sh: paragraph.scrollHeight,
        ch: paragraph.clientHeight
    }

}
function is_overflowing_right_now(paragraph) {
    const overflow_x = paragraph.scrollWidth > paragraph.clientWidth
    const overflow_y = paragraph.scrollHeight > paragraph.clientHeight

    return overflow_x || overflow_y
}

async function is_overflowing_with_text(paragraph_selector, text) {
    const paragraph = document.querySelector(paragraph_selector)
    paragraph.textContent = text
    await new Promise(r => setTimeout(r, 100))

    return is_overflowing_right_now(paragraph_selector)
}

async function paginate_new(longtext, paragraph_selector) {
    // to be used with an hidden element, that has the same styling as the main container

    let sentences = longtext.split(" ")
    let chunk = ""
    let chunks = []

    let last_p = null

    const paragraph = document.querySelector(paragraph_selector)

    for (const word of sentences) {
        // we don't want to create a chunk that is too long
        // if we are overflowing before adding the sentence, push the chunk

        const new_chunk = chunk + word + " "
        paragraph.textContent = new_chunk

        await new Promise(r => setTimeout(r, 0))

        const would_the_new_chunk_overflow = is_overflowing_right_now(paragraph)

        if (would_the_new_chunk_overflow && chunk.length > 0) {
            // accept chunk as-is and move on
            console.log("accepting", chunk.trim(), get_p(paragraph), last_p)
            chunks.push(chunk.trim())
            chunk = word + " "
            continue
        }

        // if new chunk won't overflow the container, continue iterating
        console.log("append", word, get_p(paragraph), last_p)
        last_p = get_p(paragraph)
        chunk = new_chunk
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        console.log("accepting last chunk:", chunk)
        chunks.push(chunk)
    }

    return chunks.filter(chunk => chunk.length > 0)
}

export { paginate_new, is_overflowing_right_now }