function is_overflowing_right_now(paragraph_selector) {
    const paragraph = document.querySelector(paragraph_selector)

    const overflow_x = paragraph.scrollWidth > paragraph.clientWidth
    const overflow_y = paragraph.scrollHeight > paragraph.clientHeight

    return overflow_x || overflow_y
}

function is_overflowing_with_text(paragraph_selector, text) {
    const paragraph = document.querySelector(paragraph_selector)
    paragraph.textContent = text

    return is_overflowing_right_now(paragraph_selector)
}

function paginate_new(longtext, paragraph_selector) {
    // to be used with an hidden element, that has the same styling as the main container

    let sentences = longtext.split(" ")
    let chunk = ""
    let chunks = []

    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        // console.log("sentence",sentence)
        // we don't want to create a chunk that is too long
        // if we are overflowing before adding the sentence, push the chunk

        const theoretical_new_chunk = chunk + sentence + " "
        const would_this_sentence_overflow_the_chunk = is_overflowing_with_text(paragraph_selector, theoretical_new_chunk)

        // sometimes, we begin with a sentence that is too long in itself.
        // that is a failure of the regex; but we'd rather skip an empty chunk
        // therefore, we have the chunk.length > 0 check

        if (would_this_sentence_overflow_the_chunk && chunk.length > 0) {
            // Check if breaking the chunk will create an horunge
            const next_sentence = sentences[i + 1];
            const would_next_sentence_overflow = is_overflowing_with_text(paragraph_selector, chunk + next_sentence + " ");

            if (would_next_sentence_overflow) {
                // If breaking the chunk creates an orphan, skip it and start a new one
                chunks.push(chunk.trim())
                chunk = sentence + " "
            } else {
                // If breaking the chunk doesn't create an orphan, add the next sentence to the current chunk
                chunk += sentence + " "
            }

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

export { paginate_new, is_overflowing_right_now}