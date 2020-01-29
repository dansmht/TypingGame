document.ondragstart = () => false
document.onselectstart = () => false
document.oncontextmenu = () => false

const URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.querySelector('.quote-display')
const quoteInputElement = document.querySelector('.quote-input')
const timerElement = document.querySelector('.timer')

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('.quote-character')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (!character) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.textContent) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })

    if (correct) renderNextQuote()
})

function getRandomQuote() {
    return fetch(URL)
        .then(res => res.json())
        .then(data => data.content)
        .catch(e => console.error(e))
}

async function renderNextQuote() {
    quoteDisplayElement.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>'
    quoteInputElement.value = null
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.className = 'quote-character'
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerDate()
    }, 1000)
}

function getTimerDate() {
    return Math.floor((new Date - startTime) / 1000)
}

renderNextQuote()
