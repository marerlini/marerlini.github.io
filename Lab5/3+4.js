function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

document.querySelector('.block_5').innerHTML += `
<div class="form" id="form">
                <h2>Введіть 10 чисел</h2>
                <form id="numberForm">
                    <label>
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                        <input type="number">
                    </label>
                    <button type="button" onclick="findMinMax()">Знайти мінімальне та максимальне значення</button>
                </form>
            </div>
`;

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

function saveBorderColor(color) {
    localStorage.setItem('borderColor', color);
}

function setBorderColor() {
    var color = localStorage.getItem('borderColor');
    if (!color) {
        color = 'black';
    }
    return color;
}

document.querySelector('.block_2').innerHTML += `
<div class="color_pic" tabindex="0">
                <label for="borderColor">Вкажіть колір рамки</label>
                <input type="color" id="borderColor" name="borderColor">
            </div>
`;
window.onload = function() {
    var blocks = document.querySelectorAll('.block_1, .block_2, .block_3, .block_4, .block_5, .block_6');
    var block2 = document.querySelector('.block_2');
    var colorInput = document.getElementById('borderColor');

    block2.setAttribute('tabindex', '0');

    block2.addEventListener('focus', function() {
        var color = setBorderColor();
        blocks.forEach(function(block) {
            block.style.borderColor = color;
            block.style.borderStyle = 'solid';
            block.style.borderWidth = '1px';
        });
    });

    block2.addEventListener('blur', function() {
        blocks.forEach(function(block) {
            block.style.borderWidth = '0';
        });
    });

    colorInput.addEventListener('input', function() {
        var color = colorInput.value;
        saveBorderColor(color);
        blocks.forEach(function(block) {
            block.style.borderColor = color;
        });
    });

    // Код для перевірки кукіс
    var minValue = getCookie("minValue");
    var maxValue = getCookie("maxValue");
    var formDiv = document.getElementById("form");

    if (minValue && maxValue) {
        var deleteCookies = confirm('Мінімальне значення: ' + minValue + ', Максимальне значення: ' + maxValue + '. Видалити дані з кукіс?');

        if (deleteCookies) {
            eraseCookie("minValue");
            eraseCookie("maxValue");
            location.reload();
        } else {
            alert('У вас є збережені кукіс. Перезавантажте веб-сторінку, якщо хочете продовжити використання цих значень.');
        }
    } else {
        formDiv.style.display = 'block';
    }
}

