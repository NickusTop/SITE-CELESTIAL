const header = document.querySelector('.h1-header');
const originalText = "CELESTIAL 1.16.5";
let currentText = originalText.split('');
let interval;
let decryptingIndex = 0;
let encryptedIndexes = [];
let colorChanged = false;

// Функция для случайного выбора цвета
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Создаем элементы для каждого символа
function createTextElements() {
    header.innerHTML = '';
    currentText.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';  // Фиксируем ширину символа
        span.style.fontFamily = 'monospace';  // Используем моноширинный шрифт
        span.style.width = '1em';  // Фиксируем ширину для предотвращения изменения размера
        span.style.color = 'white'; // Все символы по умолчанию белые
        header.appendChild(span);
    });
}

// Функция для создания случайных символов
function getRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Функция для обновления текста
function updateText() {
    const spans = header.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (encryptedIndexes.includes(index) && index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 4 && index !== 5 && index !== 6 && index !== 7 && index !== 8 && index !== 9 && index !== 10 && index !== 11 && index !== 12 && index !== 13 && index !== 14 && index !== 15 && index !== 16) {
            span.style.color = getRandomColor(); // Случайный цвет для зашифрованных символов
        } else if (index < decryptingIndex) {
            span.style.color = 'white'; // Восстановленные символы становятся белыми
        }
    });
}

// Функция для шифрования
function encryptText() {
    if (decryptingIndex < currentText.length) {
        const spans = header.querySelectorAll('span');
        spans[decryptingIndex].textContent = getRandomChar(); // Заменяем символ на случайный
        encryptedIndexes.push(decryptingIndex); // Запоминаем, что этот индекс был зашифрован
        updateText();
        decryptingIndex++;
    } else {
        clearInterval(interval);
        setTimeout(startDecrypting, 2000); // Ожидаем 2 секунды и начинаем расшифровку
    }
}

// Функция для расшифровки
function decryptText() {
    if (decryptingIndex > 0) {
        decryptingIndex--;
        const spans = header.querySelectorAll('span');
        spans[decryptingIndex].textContent = originalText[decryptingIndex]; // Восстанавливаем оригинальный символ
        encryptedIndexes = encryptedIndexes.filter(i => i !== decryptingIndex); // Убираем индекс из списка зашифрованных символов
        updateText();
    } else {
        clearInterval(interval);
        setTimeout(startEncrypting, 2000); // Ожидаем 2 секунды и начинаем шифровать снова
    }
}

// Функция для начала шифрования
function startEncrypting() {
    decryptingIndex = 0;
    encryptedIndexes = []; // Очищаем список зашифрованных индексов
    colorChanged = false; // Сброс флага изменения цвета
    interval = setInterval(encryptText, 100); // Каждые 0.1 секунды изменяется один символ
}

// Функция для начала расшифровки
function startDecrypting() {
    interval = setInterval(decryptText, 100); // Каждые 0.1 секунды восстанавливается один символ
}

// Инициализация шифрования
createTextElements();
startEncrypting();
