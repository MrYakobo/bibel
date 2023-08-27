function is_overflowing(container_selector, paragraph_selector, text) {
    const paragraph = document.querySelector(paragraph_selector)
    paragraph.textContent = text

    const container = document.querySelector(container_selector)
    const overflow_x = container.scrollWidth > container.clientWidth
    const overflow_y = container.scrollHeight > container.clientHeight

    return overflow_x || overflow_y
}

function paginate_new(longtext, hidden_container_selector, paragraph_selector) {
    // to be used with an hidden element, that has the same styling as the main container

    let sentences = longtext.replace(/(\.+|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|")
    let chunk = ""
    let chunks = []

    for (const sentence of sentences) {
        // we don't want to create a chunk that is too long
        // if we are overflowing before adding the sentence, we are mogen

        const chunk_is_mogen = is_overflowing(hidden_container_selector, paragraph_selector, chunk)
        if (chunk_is_mogen && chunk.length > 0) {
            // push the chunk and empty our local acc variable.
            chunks.push(chunk)
            chunk = ""
        }

        // we are either mogen and have an empty chunk here, OR
        // we are not mogen. either way, build on the chunk; so that no sentence gets lost
        chunk = chunk + sentence + " "
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks
}

function paginate(longText, maxChunkSize) {
    // https://stackoverflow.com/a/18915014/4898830
    let sentences = longText.replace(/(\.+|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|")
    let chunk = ""
    let chunks = []

    for (const sentence of sentences) {
        // we don't want to create a chunk that is too long
        // if we are already mogen, accept it
        let chunk_is_mogen = chunk.length + sentence.length + 1 >= maxChunkSize
        if (chunk_is_mogen && chunk.length > 0) {
            // push the chunk and empty our local acc variable.
            chunks.push(chunk)
            chunk = ""
        }

        // we are either mogen and have an empty chunk here, OR
        // we are not mogen. either way, build on the chunk; so that no sentence gets lost
        chunk = chunk + sentence + " "
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks
}

export { paginate, paginate_new }