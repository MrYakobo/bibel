function paginate(txt, horizon, maxlen) {
    function is_punctionation(s) {
        return ".!?".split("").includes(s)
    }
    var pages = []
    var page = []

    var arr = txt.split(" ")

    if (arr.length < maxlen) return [txt]

    for (var i = 0; i < arr.length; i++) {
        var w = arr[i]
        page.push(w)
        if ((is_punctionation(w.slice(-1)) && page.length >= maxlen - horizon) || page.length >= maxlen + horizon) {
            pages.push(page.join(" "))
            page = []
        }
    }

    // if we have one last chunk left, push that
    if (page.length > 0) {
        pages.push(page.join(" "))
    }

    //no empty slides plz
    return pages.filter((s) => s.trim() != "")
}