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

        //let json = sendRequestGET("http://localhost:8091/?all");

        //раскодируем данные
        //let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateHomePage;

        main.style.padding = '0';

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

        let json = sendRequestGET("http://localhost:8091/?all");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCategoryNav.replace('${category_title}', data[category_id - 1]['category']) // сдвиг на единицу, т.к в ДБ отсчет id с 1, а в массиве  - с 0
                                             .replace('${category_title}', data[category_id - 1]['category']);

        console.log(category_id);

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
                                                            .replace('${card_id}', data2[i]['id'])
                                                            .replace('${goods_img}', data2[i]['photo'])
                                                            .replace('${price}', Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data2[i]['price'])
                                                            .replace('${sale}', (data2[i]['sale']) ? data2[i]['sale'] : '0')
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${card_id}', data2[i]['id'])
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

        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data[category_id]['category'])
                                      .replace('${goods_title}', data[card_id]['name'])
                                      .replace('${goods_title}', data[card_id]['name'])
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

    /*
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
 */