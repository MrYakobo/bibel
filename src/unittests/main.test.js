import { render } from "@testing-library/vue"
import UUtComponent from '../display/DispCardHtml.vue'
import { get_bible_text, paginate_new } from "../paginate"
import { bibletsv_to_lookuptable } from "../bible"
import text from './biblestring'
import { expect } from "vitest"

function set_text(container, text) {
  container.querySelector("#curr_slide_text").textContent = text
}

function is_overflowing(container) {
  const overflow_x = container.scrollWidth > container.clientWidth
  const overflow_y = container.scrollHeight > container.clientHeight

  const any_zero = container.scrollWidth == 0 || container.clientWidth == 0 || container.scrollHeight == 0 || container.clientHeight == 0
  console.log(container.scrollWidth, container.clientWidth, container.scrollHeight, container.clientHeight)
  // console.log(any_zero)
  if (any_zero) {
    return true
  }

  return overflow_x || overflow_y
}

/*
    My optimal testing would look like this:
    1. I want to simulate "import bible words" locally; but with real bible.tsv files. Those should be prefetched
    2. I want to ensure that NONE of those bible words overflow the DispCard.
*/

function get_text_and_paginate(bibledb, book, chapter, verses) {
  //   {
  //     "Första Moseboken": {
  //         "1": {
  //             "1": "I begynnelsen skapade Gud himmel och jord."
  //         }
  //     }
  // }
  let bible_text = get_bible_text(bibledb, book, chapter, verses)
  let slides = paginate_new(bible_text, "#hidden_dispcard #curr_slide", "#hidden_dispcard #curr_slide_text")
  return slides
}

function get_bible() {
  let db = bibletsv_to_lookuptable(text)
  return db
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function render_hidden(props) {
  render(UUtComponent, { attrs: { id: "hidden_dispcard" }, props })
}

describe("paginate", () => {
  test.skip("it can paginate all bible words", async () => {
    let bibledb = get_bible()
    let reference = { book: "1 Mos", chapter: "abc", verses: "1-1000" }
    let props = {
      translation: "sfb15",
      book: reference.book,
      chapter_and_verse: `${reference.chapter}:${reference.verses}`,
      text: "",
      progress: 0,
      show: true
    }
    render_hidden(props)

    for (const [book_name, book] of Object.entries(bibledb)) {
      for (const [chapter_num, chapter] of Object.entries(book)) {
        let reference = { book: book_name, chapter: chapter_num, verses: "1-1000" }
        let props = {
          translation: "sfb15",
          book: reference.book,
          chapter_and_verse: `${reference.chapter}:${reference.verses}`,
          text: "",
          progress: 0,
          show: true
        }
        const { container } = render(UUtComponent, { props })

        let slides = get_text_and_paginate(bibledb, reference.book, reference.chapter, reference.verses)

        for (const slide of slides) {
          set_text(container, slide)
          await sleep(1000)
          expect(is_overflowing(container.querySelector("#curr_slide_text"))).toBeFalsy()
        }
      }
    }
  })
})