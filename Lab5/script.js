// Функція для обміну текстом заголовків
function swapHeaders(header1, header2) {
    var tempText = header1.innerText;
    header1.innerText = header2.innerText;
    header2.innerText = tempText;
}
swapHeaders(document.getElementById('header1'),document.getElementById('header2'));


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


// Функція для встановлення кукіс
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Функція для отримання кукіс
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Функція для видалення кукіс
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// Функція для визначення мінімального та максимального значення
function findMinMax() {
    var form = document.getElementById('numberForm');
    var numbers = [];
    var allNum = true;

    for (var i = 0; i < form.elements.length - 1; i++) { // Виключаємо кнопку
        var value = form.elements[i].value;

        if (value === "") {
            allNum = false;
            break;
        } else {
            numbers.push(parseFloat(value));
        }
    }

    if (allNum) {
        var min = Math.min(...numbers);
        var max = Math.max(...numbers);
        alert('Мінімальне значення: ' + min + ', Максимальне значення: ' + max);

        // Зберегти мінімальне та максимальне значення в кукіс на 7 днів
        setCookie("minValue", min, 7);
        setCookie("maxValue", max, 7);

    } else {
        alert('Введи всі числа, будь ласка!');
    }
}

// Перевірка наявності кукіс при завантаженні сторінки
window.onload = function() {
    var minValue = getCookie("minValue");
    var maxValue = getCookie("maxValue");
    var formDiv = document.getElementById("form");

    if (minValue && maxValue) {
        // formDiv.style.display = 'none'; // Приховуємо форму
        var deleteCookies = confirm('Мінімальне значення: ' + minValue + ', Максимальне значення: ' + maxValue + '. Видалити дані з кукіс?');

        if (deleteCookies) {
            eraseCookie("minValue");
            eraseCookie("maxValue");
            location.reload(); // Оновлюємо сторінку для відображення початкового стану
        } else {
            alert('У вас є збережені кукіс. Перезавантажте веб-сторінку, якщо хочете продовжити використання цих значень.');
        }
    } else {
        formDiv.style.display = 'block'; // Відображаємо форму при відсутності кукіс
    }
}


// Зберігаємо колір рамки в localStorage
function saveBorderColor(color) {
    localStorage.setItem('borderColor', color);
}

// Встановлюємо колір рамки з localStorage
function setBorderColor() {
    var color = localStorage.getItem('borderColor');
    if (color) {
        var blocks = document.querySelectorAll('.block_1, .block_2, .block_3, .block_4, .block_5, .block_6');
        blocks.forEach(function(block) {
            block.style.borderColor = color;
            block.style.borderStyle = 'solid';
            block.style.borderWidth = '1px';
        });
    }
}

// Виклик функції для встановлення кольору рамки при завантаженні сторінки
window.onload = function() {
    setBorderColor();

    // Додаємо подію focus для зміни кольору рамки у блоці color_pic
    var colorPic = document.querySelector('.color_pic');
    var colorInput = document.getElementById('borderColor');
    colorInput.addEventListener('input', function() {
        var color = colorInput.value;
        saveBorderColor(color);
        var blocks = document.querySelectorAll('.block_1, .block_2, .block_3, .block_4, .block_5, .block_6');
        blocks.forEach(function(block) {
            block.style.borderColor = color;
            block.style.borderStyle = 'solid';
            block.style.borderWidth = '1px';
        });
    });

    colorPic.addEventListener('focus', function() {
        var color = colorInput.value;
        colorPic.style.borderColor = color;
        saveBorderColor(color);
    }, true); // true для обробки події при спливанні (capture phase)
}

// Додаємо атрибут tabindex для блоку color_pic, щоб він міг отримати focus
document.addEventListener("DOMContentLoaded", function() {
    var colorPic = document.querySelector('.color_pic');
    colorPic.setAttribute('tabindex', '0');
});
