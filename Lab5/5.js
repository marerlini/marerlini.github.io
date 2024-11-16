var blockY = document.getElementById('header2');
var block5 = document.querySelector('.block_5');
document.querySelector('.block_1').innerHTML += `<div id="pictures" style="display: none;" class="pictures"></div>`;;
var pictures = document.getElementById('pictures')

blockY.addEventListener('mouseup', function() {
    var selection = window.getSelection().toString();
    if (selection) {
        toggleImageForm(true);
    }
});

function createImageForm() {
    var formHtml = `
        <div class="imageForm" id="imageForm" style="display: none;">
            <input type="text" id="imageUrl" placeholder="Введіть URL зображення">
            <button id="saveImage">Зберегти зображення</button>
            <button id="deleteImages">Видалити всі зображення</button>
        </div>
    `;
    block5.innerHTML += formHtml;

    document.getElementById('saveImage').addEventListener('click', saveImage);
    document.getElementById('deleteImages').addEventListener('click', deleteImages);
}
function toggleImageForm(show) {
    var imageForm = document.getElementById('imageForm');
    if (!imageForm) {
        createImageForm();
        imageForm = document.getElementById('imageForm');
    }
    imageForm.style.display = show ? 'block' : 'none';
}

function saveImage() {
    var imageUrl = document.getElementById('imageUrl').value;
    pictures.style.display = 'block';
    if (imageUrl) {
        var images = JSON.parse(localStorage.getItem('images')) || [];
        images.push(imageUrl);
        localStorage.setItem('images', JSON.stringify(images));
        addImageToBlock4(imageUrl);
    }
}

function addImageToBlock4(imageUrl) {
    var img = document.createElement('img');
    img.src = imageUrl;
    img.style.display = 'block';
    pictures.appendChild(img);
}

function deleteImages() {
    localStorage.removeItem('images');
    var images = pictures.getElementsByTagName('img');
    while (images[0]) {
        images[0].parentNode.removeChild(images[0]);
    }
    pictures.style.display = 'none';
}

// Відображення збережених зображень при завантаженні сторінки
var savedImages = JSON.parse(localStorage.getItem('images')) || [];
savedImages.forEach(addImageToBlock4);
