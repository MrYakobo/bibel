import pick from 'lodash.pick'

function range(start, end) {
    // https://stackoverflow.com/a/33457557/
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
function versetxt_to_lst(txt) {
    // 1-4 => [1,2,3,4]
    // 1 => [1]
    let parts = txt.split("-")
    if (parts.length == 1 || parts[1] == "")
        return parts

    try {
        let [lo, hi] = parts.map(a => parseInt(a))
        return range(lo, hi)
    }
    catch (e) {
        // parseint error or RangeError, it's cool man
    }
}

function get_bible_text(bibledb, selected_book, selected_chapter, selected_verses) {
    let chapter = bibledb[selected_book][selected_chapter]
    let verses = versetxt_to_lst(selected_verses)

    let selection = Object.values(pick(chapter, verses))
    return selection.join(" ")
}

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
    // we're taking both the container selector and the paragraph selector.
    // the container is checked for overflow, the paragraph is used for setting the text

    // let sentences = longtext.replace(/(\.+|\!|\?|,|:)(\"*|\'*|\)*|}*|]*|”*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|")
    let sentences = longtext.split(" ")
    let chunk = ""
    let chunks = []

    for (const sentence of sentences) {
        // console.log("sentence",sentence)
        // we don't want to create a chunk that is too long
        // if we are overflowing before adding the sentence, push the chunk

        const theoretical_new_chunk = chunk + sentence + " "
        const would_this_sentence_overflow_the_chunk = is_overflowing(hidden_container_selector, paragraph_selector, theoretical_new_chunk)

        // sometimes, we begin with a sentence that is too long in itself.
        // that is a failure of the regex; but we'd rather skip an empty chunk
        // therefore, we have the chunk.length > 0 check

        if (would_this_sentence_overflow_the_chunk && chunk.length > 0) {
            // don't add it; use the old chunk instead
            // console.log("accepting chunk", chunk)
            chunks.push(chunk.trim())
            chunk = sentence + " "
            continue
        }

        // if it won't overflow the container; it's ok to add it
        chunk = theoretical_new_chunk
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks.filter(chunk => chunk.length > 0)
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

export { paginate_new, versetxt_to_lst, get_bible_text }