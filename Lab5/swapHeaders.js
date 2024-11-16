// Функція для обміну текстом заголовків
function swapHeaders(header1, header2) {
    var tempText = header1.innerText;
    header1.innerText = header2.innerText;
    header2.innerText = tempText;
}
swapHeaders(document.getElementById('header1'),document.getElementById('header2'));

