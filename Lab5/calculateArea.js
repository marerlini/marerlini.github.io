// Функція для обчислення площі ромба
function calculateArea(d1, d2) {
    var area = (d1 * d2) / 2;
    var block5 = document.querySelector('.block_5');
    var resultElement = document.createElement('p');
    resultElement.innerText = 'Площа ромба: ' + area;
    block5.appendChild(resultElement);
}
var d1= 10;
var d2=5;
calculateArea(d1, d2);