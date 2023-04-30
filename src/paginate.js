function split(str, regex, groups) {
    return str.replace(regex, groups).split("|")
}

function paginate(longText, maxChunkSize) {
    // https://stackoverflow.com/a/18915014/4898830
    let sentences = split(longText, /(\.+|\;|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|")
    let chunk = ""
    let chunks = []

    function mogen_detection(sentence) {
        // if we are already mogen, accept it
        let chunk_is_mogen = chunk.length + sentence.length + 1 >= maxChunkSize
        if (chunk_is_mogen && chunk.length > 0) {
            chunks.push(chunk)
            chunk = ""
        }

        // we are not mogen. build on the chunk
        chunk = chunk + sentence + " "
    }

    for (const sentence of sentences) {
        // we don't want to create a chunk that is too long
        // however, if this single sentence is already >= maxChunkSize,
        // we need to split it further (a so-called 'crisis split')
        let sentence_needs_further_splitting = sentence.length >= maxChunkSize

        if (sentence_needs_further_splitting) {
            // this will make more sentences and handle those
            // we don't do this recursively because my dataset doesn't require it :)
            let new_sentences = split(sentence, /([,;-–])/gm, "$1|")
            for (const new_sentence of new_sentences) {
                mogen_detection(new_sentence)
            }
            continue
        }

        mogen_detection(sentence)
    }

    // make sure we push the last one as well, if it exists
    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks
}

export default paginate