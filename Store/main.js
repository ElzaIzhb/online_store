// создаём объкт который умеет отправлять запросы
let requestObj = new XMLHttpRequest();

// собираем ссылку для запроса
let link = 'http://localhost:8091/';

//конфигурируем объект
requestObj.open('GET', link, false);

// отправляем запрос
requestObj.send();

let array = JSON.parse(requestObj.responseText);

console.log(array);