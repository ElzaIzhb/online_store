function send() {

    let name = document.getElementById('name').value;
    let e_mail = document.getElementById('e-mail').value;
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    let data = [];

    data.push(name);
    data.push(e_mail);
    data.push(login);
    data.push(password);

    // создаём объкт который умеет отправлять запросы
    let requestObj = new XMLHttpRequest();

    // собираем ссылку для запроса
    let link = 'http://localhost:8091/?personal';
    
    //конфигурируем объект
    requestObj.open('POST', link, false);
    
    // отправляем запрос
    requestObj.send(data);

}



    