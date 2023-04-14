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
            chunks.push(chunk)
            chunk = ""
            continue
        }

        // we are not mogen. build on the chunk
        chunk = chunk + sentence + " "
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks
}

export default paginate