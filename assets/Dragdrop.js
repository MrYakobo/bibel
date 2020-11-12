/**
 * Dragdrop directive.
 */

let arrays = []
let drakes = []

Vue.directive("dragdrop", {
    bind(container, binding, vnode) {
        let orderProperty = vnode.data.attrs ? vnode.data.attrs.order : undefined
        let items = binding.value || []
        let dragIndex

        let drake = dragula([container])
            .on("drag", (el, source) => {
                dragIndex = findDomIndex(source, el)
            })
            .on("drop", (el, target) => {
                move(items, dragIndex, findDomIndex(target, el))
                if (orderProperty) reorder(items, orderProperty)
            })

        addDrake(items, drake)
    },

    unbind(container, binding, vnode) {
        drake.destroy()
    },
})

/**
 * Find the index of an DOM element within a given container.
 */
function findDomIndex(container, el) {
    return Array.prototype.indexOf.call(container.children, el)
}

/**
 * Move an array item from one index to another.
 * The given array is transformed, not returned.
 */
function move(array, fromIndex, toIndex) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])
}

/**
 * Reorder the items of an array from 0 to `array.length`.
 * The new order is stored on the given `orderProperty`.
 * The given array is transformed, not returned.
 */
function reorder(array, orderProperty) {
    let newOrder = 0
    array.forEach((item) => {
        _.set(item, orderProperty, newOrder++)
    })
}

/**
 * Register a drake instance based on the reference of the given array.
 */
function addDrake(array, drake) {
    if (arrays.indexOf(array) >= 0) return
    arrays.push(array)
    drakes.push(drake)
}

/**
 * Retrieve a drake instance based on the reference of the given array.
 */
function getDrake(array) {
    let drakeIndex = arrays.indexOf(array)
    if (drakeIndex >= 0) return drakes[drakeIndex]
}
