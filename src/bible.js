function bibletsv_to_lookuptable(txt) {
    /*
          plain text to lookup table
          the data file looks like this:
          Första Moseboken	1 Mos	1	1	1	I begynnelsen skapade Gud himmel och jord.
  
          the columns are book_name, book_abbr, book_num, chapter_num, verse_num, verse
          the lookup table (js object) looks like this:
          {
              "Första Moseboken": {
                  "1": {
                      "1": "I begynnelsen skapade Gud himmel och jord."
                  }
              }
          }
          which makes lookup of verses trivial
      */
    let obj = {};
    let lines = txt.split("\n");
    for (let line of lines) {
      if (line == "") continue;
  
      let [book_name, book_abbr, book_num, chapter_num, verse_num, verse] =
        line.split("\t");
      obj[book_name] = obj[book_name] || {};
      obj[book_name][chapter_num] = obj[book_name][chapter_num] || {};
      obj[book_name][chapter_num][verse_num] = verse;
    }
    return obj;
  }
  
  export {bibletsv_to_lookuptable}