function send() {

    let name = document.getElementById('name').value;
    let e_mail = document.getElementById('e-mail').value;
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    let data = "name=" + encodeURIComponent(name) + "&e-mail=" + encodeURIComponent(e_mail) + "&login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password);

    // создаём объкт который умеет отправлять запросы
    let requestObj = new XMLHttpRequest();

    // собираем ссылку для запроса
    let link = 'http://localhost:8091';
    
    //конфигурируем объект
    requestObj.open('POST', link, true);

    requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // отправляем запрос
    requestObj.send(data);

}



    