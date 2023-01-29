//находим коробку под карточки (под данные шаблона)
let main = document.querySelector('main');

//получем данные шаблона каталога
let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;

//получем данные шаблона карточки
let templateCard = document.getElementById('tmpl-card').innerHTML;

//вызываем функцию при закрузке страницы
renderCatalog();

//функция отрисовки каталога
function renderCatalog() {
    //очищаем страницу
    clearPage();

    let json = sendRequestGET("https://replit.com/@Rodion91/Shop#main.php");

    //раскодируем данные
    let data = JSON.parse(json);    

    //рисуем данные на экран
    for (let i = 0; i < data['data'].length; i++) {
        //выводим данные шаблона
        main.innerHTML += templateCatalog.replace('${title}', data['data'][i]["attributes"]["titles"]["en_jp"])
                                         .replace('${id}', data['data'][i]['id'])
                                         .replace('${photo}', data['data'][i]["attributes"]["posterImage"]["small"]);
    
    document.querySelector('main').classList.add('flex-box');
    document.querySelector('main').classList.remove('main-card');
    document.querySelector('main').classList.remove('center-main');
    }
}

//функция отрисовки карточки
function renderCard(id) {
    //очищаем страницу
    clearPage();

    let json = sendRequestGET("https://replit.com/@Rodion91/Shop#main.php" + id);

    //раскодируем данные
    let data = JSON.parse(json);

    main.innerHTML += templateCard.replace('${title}', data['data']["attributes"]["titles"]["en_jp"])
                                  .replace('${photo}', data['data']["attributes"]["posterImage"]["small"])
                                  .replace('${Текст}', data['data']["attributes"]["description"])
                                  .replace('${Rating}', data['data']["attributes"]["averageRating"])
                                  .replace('${episodeCount}', data['data']["attributes"]["episodeCount"])
                                  .replace('${episodeLength}', data['data']["attributes"]["episodeLength"])
                                  .replace('${ageRatingGuide}', data['data']["attributes"]["ageRatingGuide"])
                                  .replace('${status}', data['data']["attributes"]["status"]);
    
    //удалим класс, чтобы было в одну строчку
    document.querySelector('main').classList.remove('flex-box');
    document.querySelector('main').classList.add('main-card');
    document.querySelector('main').classList.remove('center-main');
}

//функция очистки страницы
function clearPage() {
    main.innerHTML = '';
}

//функция для отправки запросов
function sendRequestGET(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    //отдает данные(результат)
    return xhr.responseText;
}

//создаем функцию для выведения данных о сайте
function renderSait() {
    //очищаем страницу
    clearPage();

    document.querySelector('main').innerHTML += document.getElementById('aboutus').innerHTML.replace('${Us}', arr1['datawe'][0]["attributes1"]["aboutus"])
                                                                                            .replace('${Spons}', arr1['datawe'][0]["attributes1"]["spons"])
                                                                                            .replace('${Desstiny}', arr1['datawe'][0]["attributes1"]["destiny"]);

    //удалим класс, чтобы было в одну строчку
    document.querySelector('main').classList.remove('flex-box');
    document.querySelector('main').classList.add('main-card');
    document.querySelector('main').classList.add('center-main');
}

//создаем функцию для выведения данных контакты
function renderCont() {
    //очищаем страницу
    clearPage();

    document.querySelector('main').innerHTML += document.getElementById('contacts').innerHTML.replace('${Tel}', arr2['datacon'][0]["attributes2"]["tel"])
                                                                                             .replace('${Emaill}', arr2['datacon'][0]["attributes2"]["email"])
                                                                                             .replace('${Teleg}', arr2['datacon'][0]["attributes2"]["telegram"]);
    
    //удалим класс, чтобы было в одну строчку
    document.querySelector('main').classList.remove('flex-box');
    document.querySelector('main').classList.add('main-card');
    document.querySelector('main').classList.add('center-main');
}




$(document).ready(function(){
    $('.slider').slick({
        arrows: true, //отображение стрелок
        dots: true, //отображение точек
        adaptiveHeight: true, //слайдер подстраивается по высоте под высоту активного слайда
        slidesToShow: 4, //сколько слайдов будет показано в одном ряду
        slidesToScroll: 1, //сколько слайдов пролистывается по одному нажатию на стрелку
        speed: 1000, //скорость прокрутки (в мс)
        easing: 'linear', //тип анимации
        infinite: true, //будет ли слайдер пролистываться бесконечно
        initialSlide: 0, //какой слайдер будет начальным
        autoplay: false, //автоматическое пролистывание
        autoplaySpeed: 1000, //интервал автопролистывания
        pauseOnFocus: true, //прекращение автопролистывания при focus
        pauseOnHover: true, //прекращение автопролистывания при hover
        pauseOnDotsHover: true, //прекращение автопролистывания при hover на точках
        draggable: false, //возможность перетаскивать слайды мышью на ПК
        swipe: true, //возможность свайпать слайды через тачскрин
        touchThreshold: 2, //необходимый размах свайпа для активации пролистывания
        touchMove: true, //возможность двигать слайды туда-сюда пальцем
        waitForAnimate: true, //будет ли скорость пролистывания быстрее, чем заданная в анимации, при более быстрых кликах/свайпах
        centerMode: false, //будет ли главный слайд показываться в центре, а не в начале
        variableWidth: false, //будет ли вся ширина видимой части заполнена слайдерами до предела без промежутков между ними
        rows: 1, //количество этажей слайдера
        slidesPerRow: 1, //количество колонок при rows > 1
        vertical: false, //вертикальное направление слайдера
        verticalSwiping: false, //переключение горизонтального свайпа на вертикальный
        responsive: [
            {
                breakpoint: 768, //ширина окна, начиная с которой активируются новые значения тех свойств, которые перечислены выше (аналог @media в css)
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});