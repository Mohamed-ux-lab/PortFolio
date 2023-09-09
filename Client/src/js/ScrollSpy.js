/**
 * Function exportable pour etre reuitiliser dans un autres projet
 * Pas de parametre necessaire appeler juste la function scrollSpy()
 * Les liens a doivent avoir l'id de la secction sur laquelle pointer
 * Et ces section doivent avoir un attribut [data-spy]
 * C'est tout.
 */
export function scrollSpy () {

    const ration = .6
const spies = document.querySelectorAll('[data-spy]')
let observer = null

/**
 * 
 * @param {HTMLElement} element 
 */
function activate (element){
    const id = element.getAttribute('id')
    let anchor = document.querySelector(`a[href="#${id}"]`)
    if (anchor === null){
        return
    }
    anchor.parentElement
    .querySelectorAll('.active')
    .forEach(node => node.classList.remove('active'))
    anchor.classList.add('active')
}

/**
 * 
 * @param {IntersectionObserverEntry[]} entries
 */
function callback (entries){
    entries.forEach(function (entry){
        if (entry.isIntersecting){
            activate(entry.target)
        }
    })
}

/**
 * 
 * @param {NodeListOf,<Element>} element 
 */
function observe (element){
    if (observer !== null) {
        element.forEach(element => observer.unobserve(element))
    }
    const y = Math.round(window.innerHeight * ration)
    observer = new IntersectionObserver (callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    })
    spies.forEach(element => observer.observe(element))
}

function debounce (callback, delay){
    let timer
    return function (){
        let args = arguments
        let context = this
        clearTimeout(timer)
        timer = setTimeout(function (){
            callback.apply(context, args)
        }, delay)
    }
}

 if(spies.length > 0) {
    observe(spies)
    let windowH = window.innerHeight
    window.addEventListener('resize', debounce (function () {
        if (Window.innerHeight !== window) {
            observe(spies)
            windowH = window.innerHeight
        }
    }, 500))
 }
}
scrollSpy()