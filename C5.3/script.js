let inputIn = document.querySelector('.input-in')
let button = document.querySelector('button')
let cardsPic = document.querySelector('.cards')


button.onclick = function () {
    check()
}
function check() {
    if (!Number(inputIn.value)) {
        console.log('Ошибка! Введите число')
    } else {
        let inputInNum = Number(inputIn.value)
        0 < inputInNum && inputInNum < 11 ? getPics(inputInNum, makeCard) : console.log('Число вне диапазона от 1 до 10')
    }
}
function getPics(num, callback) {
    const xhr = new XMLHttpRequest()
    const URL = `https://picsum.photos/v2/list?limit=${num}`
    console.log('Запрос для фото: ', URL)

    xhr.open('GET', URL, true)

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(`Статус ответа ${xhr.status}`)
        } else {
            const result = JSON.parse(xhr.response)
            console.log('Массив с фото: ', result)
            if (callback) {
                callback(result)
            }
        }
    }

    xhr.onerror = () => console.log(`Ошибка загрузки ${xhr.status}`)

    xhr.send()
}
function makeCard(arr) {
    let cards = ''

    arr.forEach(item => {
        const cardBlock = `
		<div class='card'>
		<img scr='${item.download_url}' class='card-img'>
		<p>${item.author}</p>
		</div>`

        console.log(`Ссылка на ${+item.id + 1} фото в карточке: ${item.download_url}`)
        cards += cardBlock
    })

    cardsPic.innerHTML = cards
}