let container = '';

function sendRequest() {

    let msg = document.getElementById('msg').value;

    let tmpl_mes = document.getElementById('tmpl_mes');

    // создаём переменную с текущем временем, датой, месяцем, годом
    let today = new Date();

    // создаём переменную, куда записываем только время и отрезаем секунды
    let now = today.toLocaleTimeString().slice(0,-3);

    container+= tmpl_mes.innerHTML.replace('${message}', msg)
                                  .replace('${date}', now);

    console.log(container);

    document.getElementById('chat-box__body').innerHTML = container;     
    
}






    