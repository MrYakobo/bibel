import { render } from "@testing-library/vue"
import { expect } from "vitest"
import MyComponent from '../display/DispCardHtml.vue'

describe("paginate", () => {
    test("it can paginate all bible words", () => {
        let reference = { book: "1 Mos", chapter: "abc", verses: "1-1000" }
        let props = {
            translation: "sfb15",
            book: reference.book,
            chapter_and_verse: `${reference.chapter}:${reference.verses}`,
            text: "very long text".repeat(100),
            progress: 0,
            show: true
        }
        const { container } = render(MyComponent, { props })
        expect(container.scrollWidth).toBeGreaterThan(0)
        expect(container.clientWidth).toBeGreaterThan(0)
        expect(container.scrollHeight).toBeGreaterThan(0)
        expect(container.clientHeight).toBeGreaterThan(0)
    })
})