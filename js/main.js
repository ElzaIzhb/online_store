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

    //вызываем функцию при загрузке страницы
    renderHomePage();

    //функция отрисовки Главной страницы
    function renderHomePage() {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateHomePage;
    }

    //функция отрисовки Каталога
    function renderCatalog() {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/");

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
                                                           .replace('${category_img}', data[i]['photo'])
                                                           .replace('${category_id}', data[i]['category_id']) //СЕЙЧАС ВМЕСТО id КАТЕГОРИИ отрисовывается  id КАРТОЧКИ
                                                           .replace('${category_title}', data[i]['category']);
        
        // document.querySelector('main').classList.add('flex-box');
        // document.querySelector('main').classList.remove('main-card');
        // document.querySelector('main').classList.remove('center-main');
        }
    }

    //функция отрисовки набора товаров внутри Категории
    function renderCardsInCategory(category_id) {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCategoryNav.replace('${category_title}', data[category_id]['category'])
                                             .replace('${category_title}', data[category_id]['category']);



        //создаем флекс-контейнер ВНУТРИ main, куда будет отрисовываться содержимое (если отрисовывать сразу в main, верстка слетит)
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);

        //рисуем данные на экран
        for (let i = 0; i < data.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCategory.replace('${category_id}', data[i]['category_id']) //ЗАМЕНИТЬ data[i]['id'] НА id КАТЕГОРИИ
                                                            .replace('${card_id}', data[i]['id'])
                                                            .replace('${price}', Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data[i]['price'])
                                                            .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                            .replace('${category_id}', data[i]['category_id']) //ЗАМЕНИТЬ data[i]['id'] НА id КАТЕГОРИИ
                                                            .replace('${card_id}', data[i]['id'])
                                                            .replace('${goods_title}', data[i]['name']);
        
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

        let json = sendRequestGET("http://localhost:8091/");

        //раскодируем данные
        let data = JSON.parse(json);

        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data[category_id]['category'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${price}', Math.round(parseInt(data[card_id]['price']) - (parseInt(data[card_id]['price']) * (data[card_id]['sale'] ? (parseInt(data[card_id]['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data[card_id]['price'])
                                      .replace('${sale}', (data[card_id]['sale']) ? data[card_id]['sale'] : '0')
                                      .replace('${goods_description}', data[card_id]['consist']);
        
            // if (main.getElementsByClassName('sale-num bigger')[card_id].innerHTML === '-0%') {
            //     document.getElementsByClassName('crossed-out-price')[card_id].style.display = 'none';
            //     document.getElementsByClassName('sale-num')[card_id].style.display = 'none';
            // }
                            
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
