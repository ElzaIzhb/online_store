// создаём объкт который умеет отправлять запросы
let requestObj = new XMLHttpRequest();

// собираем ссылку для запроса
let link = 'http://localhost:8091/?all';

//конфигурируем объект
requestObj.open('GET', link, false);

// отправляем запрос
requestObj.send();

let array = JSON.parse(requestObj.responseText);

console.log(array);





// создаём объкт который умеет отправлять запросы
let requestObj_category = new XMLHttpRequest();

// собираем ссылку для запроса
let link_category = 'http://localhost:8091/?table=goods&category=%D0%A4%D0%BE%D0%BB%D1%8C%D0%B3%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D1%88%D0%B0%D1%80%D1%8B';
    
//конфигурируем объект
requestObj_category.open('GET', link_category, false);
    
// отправляем запрос
requestObj_category.send();
    
let array_category = JSON.parse(requestObj_category.responseText);
    
console.log(array_category);