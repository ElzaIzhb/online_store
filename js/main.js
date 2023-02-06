    //находим коробку под карточки (под данные шаблона)
    let main = document.getElementById('container');

    //получем данные шаблона Главной страницы
    let templateHomePage = document.getElementById('tmpl-home-page').innerHTML;

    //получаем данные шаблона шапки Каталога
    let templateCatalogNav = document.getElementById('tmpl-catalog-nav').innerHTML;

    //получем данные шаблона Каталога
    let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;

    //получаем данные шаблона шапки Категории
    let templateCategoryNav = document.getElementById('tmpl-category-nav').innerHTML;

    //получем данные шаблона Категории
    let templateCategory = document.getElementById('tmpl-category').innerHTML;

    //получем данные шаблона Карточки
    let templateCard = document.getElementById('tmpl-card').innerHTML;

    //получем данные шаблона Корзины
    let templateBasket = document.getElementById('tmpl-basket').innerHTML;

    //вызываем функцию при загрузке страницы
    renderHomePage();

    //функция отрисовки Главной страницы
    function renderHomePage() {
        //очищаем страницу
        clearPage();

        //let json = sendRequestGET("http://localhost:8091/?all");

        //раскодируем данные
        //let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateHomePage;

        main.style.padding = '0';

        //чтобы слайдер не ломался
        $(function(){
            $('.slider').slick({
                arrows: true, //отображение стрелок
                dots: true, //отображение точек
                adaptiveHeight: false, //слайдер подстраивается по высоте под высоту активного слайда
                slidesToShow: 2, //сколько слайдов будет показано в одном ряду
                slidesToScroll: 1, //сколько слайдов пролистывается по одному нажатию на стрелку
                speed: 1000, //скорость прокрутки (в мс)
                easing: 'linear', //тип анимации
                infinite: true, //будет ли слайдер пролистываться бесконечно
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
                        breakpoint: 1020,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        });

    }

    //функция отрисовки Каталога
    function renderCatalog() {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/?allcategories");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCatalogNav;

        //создаем флекс-контейнер ВНУТРИ main, куда будет отрисовываться содержимое (если отрисовывать сразу в main, верстка слетит)
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //рисуем данные на экран
        for (let i = 0; i < data.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCatalog.replace('${category_id}', data[i]['category_id']) //СЕЙЧАС ВМЕСТО id КАТЕГОРИИ отрисовывается  id КАРТОЧКИ
                                                           .replace('${category_img}', data[i]['category_img'])
                                                           .replace('${category_id}', data[i]['category_id']) //СЕЙЧАС ВМЕСТО id КАТЕГОРИИ отрисовывается  id КАРТОЧКИ
                                                           .replace('${category_title}', data[i]['category']);
        
        }
    }

    //функция отрисовки набора товаров внутри Категории
    function renderCardsInCategory(category_id) { //id в БД начинается с 1
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/?allcategories");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCategoryNav.replace('${category_title}', data[category_id -1]['category']) // сдвиг на единицу, т.к в ДБ отсчет id с 1, а в массиве  - с 0
                                             .replace('${category_title}', data[category_id -1]['category']);

        //console.log(category_id);
        //console.log(data[category_id - 1]['category']);

        //отправляем отдельный запрос для получения данных из сджойненных таблиц goods и categories, выстроенных по category id
        let json2 = sendRequestGET("http://localhost:8091/?category_id=" + category_id);

        //раскодируем данные
        let data2 = JSON.parse(json2);  
        
        //создаем флекс-контейнер ВНУТРИ main, куда будет отрисовываться содержимое (если отрисовывать сразу в main, верстка слетит)
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //рисуем данные на экран
        for (let i = 0; i < data2.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCategory.replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${card_id}', i)
                                                            .replace('${goods_img}', data2[i]['photo'])
                                                            .replace('${price}', Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data2[i]['price'])
                                                            .replace('${sale}', (data2[i]['sale']) ? data2[i]['sale'] : '0')
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${card_id}', i)
                                                            .replace('${goods_title}', data2[i]['name']);
        
            if (main.getElementsByClassName('sale-num')[i].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[i].style.display = 'none';
                document.getElementsByClassName('sale-num')[i].style.display = 'none';
            }
        }
    }

    //функция отрисовки Карточки
    function renderCard(category_id,card_id) {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/?category_id=" + category_id);

        //раскодируем данные
        let data = JSON.parse(json);

        console.log(category_id,card_id);

        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data[card_id]['category'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_img_big}', data[card_id]['photo'])
                                      .replace('${price}', Math.round(parseInt(data[card_id]['price']) - (parseInt(data[card_id]['price']) * (data[card_id]['sale'] ? (parseInt(data[card_id]['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data[card_id]['price'])
                                      .replace('${sale}', (data[card_id]['sale']) ? data[card_id]['sale'] : '0')
                                      .replace('${goods_description}', data[card_id]['consist']);
                                     
            //если скидки нет
            if (main.getElementsByClassName('sale-num bigger')[0].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[0].style.display = 'none';
                document.getElementsByClassName('sale-num')[0].style.display = 'none';
            }
        
        main.style.padding = '40px';
    }
    
    //функция добавления товаров в корзину
    function addToBasket() {

        //записываем в переменные данные о товаре (id, фото, название, цена, скидка)

        //делаем из этого массив

        //превращаем его в джейсон

        //отправляем постом на сервер




    }


    //функция отрисовки Корзины
    function renderBasket() {
        //очищаем страницу
        clearPage();

        /*
        //отправляем запрос на сервер и получаем данные по добавленным в корзину товарам (СНАЧАЛА ПРОПИСАТЬ ФУНКЦИЮ addToBasket)
        let json = sendRequestGET("http://localhost:8091/get/basket");

        //раскодируем данные
        let data = JSON.parse(json);

        console.log();


        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data[card_id]['category'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_img_big}', data[card_id]['photo'])
                                      .replace('${price}', Math.round(parseInt(data[card_id]['price']) - (parseInt(data[card_id]['price']) * (data[card_id]['sale'] ? (parseInt(data[card_id]['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data[card_id]['price'])
                                      .replace('${sale}', (data[card_id]['sale']) ? data[card_id]['sale'] : '0')
                                      .replace('${goods_description}', data[card_id]['consist']);
                                     
            //если скидки нет
            if (main.getElementsByClassName('sale-num bigger')[0].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[0].style.display = 'none';
                document.getElementsByClassName('sale-num')[0].style.display = 'none';
            }
            */
        
        //отрисовываем в main шаблон Корзины (ПОКА БЕЗ ДОБАВЛЕННЫХ ТОВАРОВ)
        main.innerHTML += templateBasket;

        main.style.padding = '40px';
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

    function renderAkc() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('akc').innerHTML;
    }

    function renderDelivery() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('delivery').innerHTML;
    }

    function renderCont() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('contacts').innerHTML;
    }

    function renderReviews() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('reviews').innerHTML;
    }
