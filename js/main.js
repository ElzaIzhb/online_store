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

    //получем данные шаблона товаров внутри Корзины
    let templateGoodsInBasket = document.getElementById('tmpl_goods-in-basket').innerHTML;

    //получем данные шаблона личного кабинета
    let templatePerson = document.getElementById('tmpl-person').innerHTML;

    //очищение хранилища для тестов
    //localStorage.clear();

    //не теряем значение счетчика Корзины при обновлении страницы
    if (localStorage.getItem('total_quantity') != null) {

        let json = localStorage.getItem('total_quantity');
        console.log(json);
        
        //достаем из хранилища сохраненное значение
        document.getElementById('counter').innerHTML = localStorage.getItem('total_quantity');
        
        //и делаем счетчик видимым
        document.getElementById('counter').classList.remove('hidden');

    } else {

        //снова скрываем счетчик
        document.getElementById('counter').classList.add('hidden');
    }

    //вызываем функцию при загрузке страницы
    renderHomePage();

    //функция отрисовки личного кабинета
    function renderPerson() {

        //очищаем страницу
        clearPage();

        //отрисовываем в main шаблон личного кабинета
        main.innerHTML += templatePerson;
    }


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
                                                            .replace('${goods_id}', i)
                                                            .replace('${bsk_goods_id}', data2[i]['id'])
                                                            .replace('${goods_img}', data2[i]['photo'])
                                                            .replace('${goods_title}', data2[i]['name'])
                                                            .replace('${price}', Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data2[i]['price'])
                                                            .replace('${sale}', (data2[i]['sale']) ? data2[i]['sale'] : '0')
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${goods_id}', i)
                                                            .replace('${goods_title}', data2[i]['name']);
        
            if (main.getElementsByClassName('sale-num')[i].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[i].style.display = 'none';
                document.getElementsByClassName('sale-num')[i].style.display = 'none';
            }
        }
    }

    //функция отрисовки Карточки
    function renderCard(category_id,goods_id) {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/?category_id=" + category_id);

        //раскодируем данные
        let data = JSON.parse(json);

        console.log(category_id,goods_id);

        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data[goods_id]['category'])
                                      .replace('${goods_title}', data[goods_id]['name'])
                                      .replace('${goods_title}', data[goods_id]['name'])
                                      .replace('${goods_img_big}', data[goods_id]['photo'])
                                      .replace('${price}', Math.round(parseInt(data[goods_id]['price']) - (parseInt(data[goods_id]['price']) * (data[goods_id]['sale'] ? (parseInt(data[goods_id]['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data[goods_id]['price'])
                                      .replace('${sale}', (data[goods_id]['sale']) ? data[goods_id]['sale'] : '0')
                                      .replace('${bsk_goods_id}', data[goods_id]['id'])
                                      .replace('${goods_title}', data[goods_id]['name'])
                                      .replace('${goods_description}', data[goods_id]['consist']);
                                     
            //если скидки нет
            if (main.getElementsByClassName('sale-num bigger')[0].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[0].style.display = 'none';
                document.getElementsByClassName('sale-num')[0].style.display = 'none';
            }
        
        main.style.padding = '40px';
    }

    //функция фильтрации цены ОТ
    function filterPriceFrom() {

        //достаем введенное значение
        let priceFrom = document.getElementById('price-from').innerHTML;
        console.log("Введенная цена ОТ: " + priceFrom);
    }

    //функция прибавления значения к total_quantity в хранилище
    function plusOne() {

        let newValue = 0;

        //достаем сохраненное значение из хранилища
        let currentValue = parseInt(localStorage.getItem('total_quantity'));
    
        //и прибавляем 1 уже к нему, записывая в переменную
        newValue += parseInt(currentValue) + 1;
        console.log("Товаров в корзине: " + newValue);
    
        //выводим в верстке новое значение счетчика
        document.getElementById('counter').innerHTML = newValue;
    
        //записываем новое значение счетчика в local storage
        localStorage.setItem('total_quantity', newValue);
    }

    //функция добавления товаров в Корзину
    function addToBasket(goods_id, goods_name) {

        //для ОБЩЕГО СЧЕТЧИКА НА ИКОНКЕ КОРЗИНЫ проверяем, не было ли что-то уже добавлено в Корзину
        //если в хранилище пусто
        if (localStorage.getItem('total_quantity') == null ) {

            //начинаем с 0 и добавляем +1 визуально к счетчику Корзины и делаем его видимым
            let newValue = 0;
            newValue += 1;
            console.log("Товаров в корзине: " + newValue);
            document.getElementById('counter').innerHTML = newValue;

            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', newValue);

            //и делаем счетчик видимым
            document.getElementById('counter').classList.remove('hidden');
        
        //если в хранилище уже что-то лежит
        } else {
            
            //прибавляем +1 к значению в total_quantity хранилище
            plusOne();
        }


        //делаем проверку на наличие повторяющихся товаров среди выбранных юзером
        //если это первый товар, добавляемый в Корзину
        if (localStorage.getItem('basket') == null) {

            //передаем на сервер id выбранного товара, чтобы получить о нем нужные данные в виде jsona и положить в local storage
            let jsonGoodsInBasket = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);
            //console.log(jsonGoodsInBasket);

            //помещаем данный товар в хранилище
            //но сначала превращаем в массив, чтобы добавить ему ключ quantity со значением 1
            let arr = JSON.parse(jsonGoodsInBasket);
            arr[0]['quantity'] = 1;
            console.log(arr);

            //кодируем обратно в json и кладем в хранилище
            let json = JSON.stringify(arr);
            localStorage.setItem('basket', json);
            console.log('Первый товар в корзине, занесенный в хранилище: ' + localStorage.getItem('basket'));

        //если в хранилище уже что-то лежит
        } else {
            //перебираем массив хранилища, чтобы проверить, не был ли уже добавлен товар с этим id
            let arr = JSON.parse(localStorage.getItem('basket'));
            console.log(arr);

            //перебираем массив по его длине
            for (let i = 0; i < arr.length; i++) {

                //если это не первый товар с таким id
                if (arr[i]['id'] === goods_id) { //после выполнения этого условия по всей длине цикла отберутся все повторяющиеся товары. Но как быть с остальными? Нужно также собрать все те, которые не прошли это условие, но нужны

                    console.log('В следующей строке массив с повторяющимся товаром');
                    console.log(arr);
                    console.log('повторяется товар с id' + arr[i]['id']);

                    //мы прибаляем ему +1 в quantity 
                    arr[i]['quantity'] += 1;        
                    console.log(arr[i]);

                    //кодируем массив в json
                    let json = JSON.stringify(arr);

                    //и перезаписываем local storage
                    localStorage.setItem('basket', json);

                    let currentBasket = localStorage.getItem('basket');

                    console.log(currentBasket);

                    console.log(localStorage.getItem('basket').includes(arr[i]['name']));
                 
                //если это ПЕРВЫЙ товар с таким id (доп. проверка на отсутствие вхождения в хранилище товара с таким названием)
                } else if (localStorage.getItem('basket').includes(goods_name) == false) {

                    //передаем на сервер id выбранного товара, чтобы получить о нем нужные данные в виде jsona и положить в local storage
                    let jsonGoodsInBasket = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);

                    //превращаем в массив, чтобы добавить ему ключ quantity со значением 1
                    let uniqueGoods = JSON.parse(jsonGoodsInBasket);

                    uniqueGoods[0]['quantity'] = 1;
                    console.log(uniqueGoods);

                    //вносим его в хранилище, добавив к уже лежащим там товарам
                    //для сложения преобразуем json в массив, т.к. простая склейка нескольких jsonов делает их нечитабельными
                    let currentGoods = JSON.parse(localStorage.getItem('basket'));

                    //теперь в currentGoods лежит общий массив из всех добавленных в Корзину товаров
                    currentGoods.push.apply(currentGoods, uniqueGoods);

                    console.log(currentGoods);

                    //кодируем его обратно в json, чтобы положить в хранилище
                    let currentGoodsJson = JSON.stringify(currentGoods);

                    console.log(currentGoodsJson);

                    //кладем закодированный массив в хранилище
                    localStorage.setItem('basket', currentGoodsJson);
                   
                }
            }
        }
        


/* НАЧАЛО ПРЕДЫДУЩЕГО +- РАБОЧЕГО КОДА (БЕЗ УЧЕТА ОБРАБОТКИ ПОВТОРЯЮЩИХСЯ КАРТОЧЕК)


        //передаем на сервер id выбранного товара, чтобы получить о нем нужные данные в виде jsona и положить в local storage
        let jsonGoodsInBasket = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);
        //console.log(jsonGoodsInBasket);

        //let arrBasket = JSON.parse(jsonGoodsInBasket);
        //console.log(arrBasket);

        //если это первое добавление в корзину
        if (localStorage.getItem('basket') === null) {

            //помещаем данный товар в хранилище
            localStorage.setItem('basket', jsonGoodsInBasket);
            console.log('Первый товар в корзине, занесенный в хранилище: ' + localStorage.getItem('basket'));

        //если в хранилище уже лежат выбранные товары, 
        } else {

            //добавляем новые к уже выбранным, достав их из хранилища
            //для сложения преобразуем json в массив, т.к. простая склейка нескольких jsonов делает их нечитабельными
            let currentGoods = JSON.parse(localStorage.getItem('basket'));

            //теперь в currentGoods лежит общий массив из всех добавленных в Корзину товаров
            currentGoods.push.apply(currentGoods, JSON.parse(jsonGoodsInBasket));

            console.log(currentGoods);

            //кодируем его обратно в json, чтобы положить в хранилище
            let currentGoodsJson = JSON.stringify(currentGoods);

            console.log(currentGoodsJson);

            //кладем закодированный массив в хранилище
            localStorage.setItem('basket', currentGoodsJson);

        }
*/ //КОНЕЦ ПРЕДЫДУЩЕГО +- РАБОЧЕГО КОДА (БЕЗ УЧЕТА ОБРАБОТКИ ПОВТОРЯЮЩИХСЯ КАРТОЧЕК)






        //раскодируем необходимые данные о товаре
        //let chosenGoodsData = JSON.parse(json);

    //отправляем на сервер id выбранного товара, чтобы получить о нем нужные данные для заполнения шаблона карточки товара в Корзине
    //sendRequestPOST('http://localhost:8091/basket/post/', goods_id);

        
        //отправляем на сервер id выбранного товара, чтобы получить о нем нужные данные для заполнения шаблона карточки товара в Корзине
        //let json = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);

        //раскодируем данные
        //let chosenGoodsData = JSON.parse(json);

        // if(chosenGoodsData) {
        //     sendRequestPOST('http://localhost:8091/basket/post', )
        // }

        //return chosenGoodsData;
        
    }

    //функция уменьшения количества товара по клику на -
    function lessGoods(goods_id) {

        //достаем из карточки количество отрисованного товара
        let individualQuantity = document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML;

        //переменная для обновленного значения
        let newQuantity = 0;

        console.log('Товара было: ' + parseInt(individualQuantity));

        if (parseInt(individualQuantity) > 1) {

            //уменьшаем значение на единицу и записываем в новую переменную
            newQuantity = parseInt(individualQuantity) - 1;
            console.log('После убавления : ' + newQuantity);

            //передаем новое значение в верстку
            document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML = newQuantity;
            console.log('В карточке после убавления: ' + document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML);
            
            if (newQuantity == 1) {

                //если новое значение уменьшилось до единицы, делаем кнопку неактивной
                document.getElementsByClassName('less-goods')[goods_id].classList.add('disabled');

            }

            //и в хранилище
            let currentGoods = JSON.parse(localStorage.getItem('basket'));

            //переписываем значение quantity у данного товара
            currentGoods[goods_id]['quantity'] = newQuantity;

            //кодируем обратно в json, чтобы положить в хранилище
            let currentGoodsJson = JSON.stringify(currentGoods);

            //кладем перезаписанный массив в хранилище
            localStorage.setItem('basket', currentGoodsJson);
            console.log('В хранилище после убавления: ' + currentGoodsJson);
        
            //и отражаем это в верстке на счетчике
            let oldCounter = document.getElementById('counter').innerHTML;
            let currentCounter = 0;
            currentCounter = parseInt(oldCounter) - 1;
            document.getElementById('counter').innerHTML = currentCounter;
            console.log('Счетчик после убавления: ' + document.getElementById('counter').innerHTML);
         
            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', currentCounter);

            //обновляем в верстке общее количество товара в блоке "Детали заказа"
            let totalQuantity = document.getElementById('quantity-in-order').innerHTML.replace(' шт.', '');
            let newTotal = parseInt(totalQuantity) - 1;
             document.getElementById('quantity-in-order').innerHTML = String(newTotal) + ' шт.';

            //для пересчета цены умножаем изначальную цену в карточке товара на его количество
            //ЗДЕСЬ НАДО ДОСТАВАТЬ ИЗНАЧАЛЬНОЕ ЗНАЧЕНИЕ, КАК В БД
            let crossedPrice = document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML.replace(' p.', '');

            //без БД пока что вычисляем изначальную цену, разделив цену товара до скидки (в верстке зачеркнута или единственная) на кол-во товара В МОМЕНТ ДОБАВЛЕНИЯ в корзину
            let actualPrice = parseInt(crossedPrice) / parseInt(individualQuantity);
            console.log('Зачеркнутая цена: ' + parseInt(crossedPrice));
            console.log('Значение при добавлении в корзину: ' + parseInt(individualQuantity));
            //console.log('Обновленное значение: ' + parseInt(newQuantity));
            console.log('Стоимость 1 шт без скидки: ' + actualPrice);

            //переменная для обновляемой цены
            let newCrossedPrice = 0;
            //теперь умножаем вычисленную изначальную цену (т.к. не кидали запрос в БД) на ОБНОВЛЕННОЕ количество
            newCrossedPrice = parseInt(newQuantity) * parseInt(actualPrice);
            console.log('Обновленная изначальная (зачеркнутая или единственная) цена после убавления: ' + newCrossedPrice);
            document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML = newCrossedPrice + ' р.';
            console.log('Зачеркнутая после убавления: ' + document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML);

            //обновляем цену после скидки
            let finalPrice = document.getElementsByClassName('actual-price')[goods_id].innerHTML.replace(' p.', '');
            let actualFinalPrice = parseInt(finalPrice) / parseInt(individualQuantity);
            console.log('Стоимость 1 шт со скидкой (при наличии): ' + actualFinalPrice);
            let newFinalPrice = 0;
            newFinalPrice = parseInt(newQuantity) * parseInt(actualFinalPrice);
            document.getElementsByClassName('actual-price')[goods_id].innerHTML = newFinalPrice + ' р.';

            
           //обновляем в верстке общую сумму товаров в блоке "Детали заказа"
           let sum = document.getElementById('sum').innerHTML.replace(' p.', '');
           console.log(sum);
           //let oneGoodsSum = document.querySelectorAll('.actual-price')[goods_id].innerHTML.replace(' p.', '');
           //console.log(oneGoodsSum);

           let newSum = parseInt(sum) - actualPrice;
           console.log(actualPrice);
           console.log(newSum);

           document.getElementById('sum').innerHTML = newSum + ' р.';

        }
        
    }

    //функция увеличения количества товара по клику на +
    function moreGoods(goods_id) {

        //достаем из карточки количество отрисованного товара
        let individualQuantity = document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML;

        //переменная для обновленного значения
        let newQuantity = 0;

        console.log('Товара было: ' + parseInt(individualQuantity));

        if (parseInt(individualQuantity) == 1) {

            //делаем кнопку уменьшения снова активной
            document.getElementsByClassName('less-goods')[goods_id].classList.remove('disabled');
        }

        //увеличиваем значение на единицу и записываем в новую переменную
        newQuantity = parseInt(individualQuantity) + 1;
        console.log('После прибавления : ' + newQuantity);

        //передаем новое значение в верстку
        document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML = newQuantity;
        console.log('В карточке после прибавления: ' + document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML);
        
        //и в хранилище
        let currentGoods = JSON.parse(localStorage.getItem('basket'));

        //переписываем значение quantity у данного товара
        currentGoods[goods_id]['quantity'] = newQuantity;

        //кодируем обратно в json, чтобы положить в хранилище
        let currentGoodsJson = JSON.stringify(currentGoods);

        //кладем перезаписанный массив в хранилище
        localStorage.setItem('basket', currentGoodsJson);
        console.log('В хранилище после прибавления: ' + currentGoodsJson);
    
        //и отражаем это в верстке на счетчике
        let oldCounter = document.getElementById('counter').innerHTML;
        let currentCounter = 0;
        currentCounter = parseInt(oldCounter) + 1;
        document.getElementById('counter').innerHTML = currentCounter;
        console.log('Счетчик после прибавления: ' + document.getElementById('counter').innerHTML);
        
        //записываем новое значение счетчика в local storage
        localStorage.setItem('total_quantity', currentCounter);

        //обновляем в верстке общее количество товара в блоке "Детали заказа"
        let totalQuantity = document.getElementById('quantity-in-order').innerHTML.replace(' шт.', '');
        document.getElementById('quantity-in-order').innerHTML = String(parseInt(totalQuantity) + 1) + ' шт.';
         

        //для пересчета цены умножаем изначальную цену в карточке товара на его количество
        //ЗДЕСЬ НАДО ДОСТАВАТЬ ИЗНАЧАЛЬНОЕ ЗНАЧЕНИЕ, КАК В БД
        let crossedPrice = document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML.replace(' p.', '');

        //без БД пока что вычисляем изначальную цену, разделив цену товара до скидки (в верстке зачеркнута или единственная) на кол-во товара В МОМЕНТ ДОБАВЛЕНИЯ в корзину
        let actualPrice = parseInt(crossedPrice) / parseInt(individualQuantity);
        console.log('Зачеркнутая цена: ' + parseInt(crossedPrice));
        console.log('Значение при добавлении в корзину: ' + parseInt(individualQuantity));
        //console.log('Обновленное значение: ' + parseInt(newQuantity));
        console.log('Стоимость 1 шт без скидки: ' + actualPrice);

        //переменная для обновляемой цены
        let newCrossedPrice = 0;
        //теперь умножаем вычисленную изначальную цену (т.к. не кидали запрос в БД) на ОБНОВЛЕННОЕ количество
        newCrossedPrice = parseInt(newQuantity) * parseInt(actualPrice);
        console.log('Обновленная изначальная (зачеркнутая или единственная) цена после убавления: ' + newCrossedPrice);
        document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML = newCrossedPrice + ' р.';
        console.log('Зачеркнутая после убавления: ' + document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML);

        //обновляем цену после скидки
        let finalPrice = document.getElementsByClassName('actual-price')[goods_id].innerHTML.replace(' p.', '');
        let actualFinalPrice = parseInt(finalPrice) / parseInt(individualQuantity);
        console.log('Стоимость 1 шт со скидкой (при наличии): ' + actualFinalPrice);
        let newFinalPrice = 0;
        newFinalPrice = parseInt(newQuantity) * parseInt(actualFinalPrice);
        document.getElementsByClassName('actual-price')[goods_id].innerHTML = newFinalPrice + ' р.';

                   //обновляем в верстке общую сумму товаров в блоке "Детали заказа"
                   let sum = document.getElementById('sum').innerHTML.replace(' p.', '');
                   console.log(sum);
                   //let oneGoodsSum = document.querySelectorAll('.actual-price')[goods_id].innerHTML.replace(' p.', '');
                   //console.log(oneGoodsSum);
        
                   let newSum = parseInt(sum) + actualPrice;
                   console.log(actualPrice);
                   console.log(newSum);
        
                   document.getElementById('sum').innerHTML = newSum + ' р.';

    }


    //функция удаления товара из Корзины
    function delFromBasket(goods_name) {

        //достаем данные из хранилища и превращаем в массив
        let arrGoods = JSON.parse(localStorage.getItem('basket'));

        //готовим переменную, чтобы записать в нее количество удаленного товара
        let quantity = 0;

        //удаляем карточку с нужным названием (если делать через БД, нужно будет брать id вместо названия)
        for (let i = 0; i < arrGoods.length; i++) {
            if(arrGoods[i]['name'] === goods_name) {

                //записываем в переменную количество удаляемого товара
                quantity = arrGoods[i]['quantity'];

                //удаляем товар из массива
                arrGoods.splice(i, 1);
                console.log(arrGoods);
            }
        }

        //если удалены все товары из Корзины
        if (arrGoods.length === 0) {

            //чистим все хранилище
            localStorage.clear();

            //скрываем счетчик с нулем на иконке Корзины
            document.getElementById('counter').classList.add('hidden');

            //перерисовываем Корзину
            renderBasket();

        //если после удаления в Корзине еще остались товары
        } else {

            //кодируем массив в json 
            let json = JSON.stringify(arrGoods);
            console.log(json);

            //и перезаписываем хранилище
            localStorage.setItem('basket', json);
            console.log(localStorage.getItem('basket'));

            //также уменьшаем счетчик на иконке Корзины, в зависимости от значения quantity удаляемого товара
            let counter = localStorage.getItem('total_quantity');
            let intCounter = parseInt(counter);
            console.log(counter);

            //отнимаем количество удаленного товара quantity (именно через переменную, т.к. значение одного удаленного товара может быть больше 1)
            intCounter -= quantity;
            console.log(intCounter);

            //и отражаем это в верстке на счетчике
            document.getElementById('counter').innerHTML = intCounter;

            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', intCounter);

            //кодируем обратно в виде строки и перезаписываем хранилище
            localStorage.setItem('total_quantity', String(intCounter));
            console.log(localStorage.getItem('total_quantity'));

            //перерисовываем содержимое Корзины
            renderBasket();

        }
    }


    //функция отрисовки Корзины
    function renderBasket() {

        //очищаем страницу
        clearPage();

        //сначала отрисовываем общий шаблон Корзины (без карточек выбранных товаров)
        main.innerHTML += templateBasket;
    
        main.style.padding = '40px';

        //достаем общую сумму количества товаров из хранилища
        let totalQuantity = localStorage.getItem('total_quantity');

        //если Корзина не пуста
        if (totalQuantity > 0) {

            //открываем блок с деталями заказа
            document.getElementById('order-container').classList.remove('hidden');

           //достаем из хранилища добавленные в Корзину товары в виде jsonа и сразу превращаем в массив
           let data = JSON.parse(localStorage.getItem('basket'));

           console.log(data);

           //находим контейнер для отрисовки товаров внутри Корзины
           let bskContainer = document.getElementById('bsk-goods-container');

           //очищаем его
           bskContainer.innerHTML = '';

           //отрисовываем товары внутри Корзины по массиву из хранилища
           for (let i = 0; i < data.length; i++) {

               bskContainer.innerHTML += templateGoodsInBasket.replace('${goods_img_mini}', data[i]['photo'])
                                                              .replace('${bsk_goods_title}', data[i]['name'])
                                                              .replace('${bsk_goods_id}', i)
                                                              .replace('${N}', data[i]['quantity'])
                                                              .replace('${bsk_goods_id}', i)
                                                              .replace('${price}', data[i]['quantity'] == 1 ? Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))) : data[i]['quantity'] * Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                              .replace('${crssd}', data[i]['quantity'] == 1 ? data[i]['price'] : data[i]['quantity'] * data[i]['price'])
                                                              .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                              .replace('${goods_name}', data[i]['name']);
               //если скидки нет
               if (bskContainer.getElementsByClassName('actual-price')[i].innerHTML === bskContainer.getElementsByClassName('crossed-out-price')[i].innerHTML) {

                    //не показываем перечеркнутое число
                    bskContainer.getElementsByClassName('crossed-out-price')[i].style.display = 'none';
                   
               }

               //если количество товара равно единице
               if (bskContainer.getElementsByClassName('quantity-in-card')[i].innerHTML == 1) {
                    
                    //делаем неактивной кнопку "-"
                    bskContainer.getElementsByClassName('less-goods')[i].classList.add('disabled');
               }

           }

           //отрисовываем в верстке количество товара в блоке "Детали заказа"
           let quantity = document.getElementById('quantity-in-order').innerHTML;
           document.getElementById('quantity-in-order').innerHTML = String(parseInt(quantity) + parseInt(totalQuantity)) + ' шт.';

           //отрисовываем в верстке сумму товаров в блоке "Детали заказа"
           let sum = document.getElementById('sum').innerHTML;
           let allPricesArr = document.querySelectorAll('.actual-price');

           //суммируем в переменную сумму всех товаров по карточкам в Корзине
           let price = 0;
           for (let j = 0; j < allPricesArr.length; j++) {
                let innerHTML = allPricesArr[j].innerHTML;
                let value = innerHTML.replace(' p.', '');
                let intValue = parseInt(value);
                price += intValue;
           }

           document.getElementById('sum').innerHTML = String(parseInt(sum) + price) + ' р.';

        //если в Корзине ничего нет
        } else {

            //выводим надпись
            document.getElementById('bsk-goods-container').innerHTML = "Ваша корзина пуста";
            //document.getElementById('bsk-goods-container').style.color = '#B566B6';
            //document.getElementById('bsk-goods-container').style.fontWeight = 'bold';

            //выделяем жирным предложение вернуться в магазин
            document.querySelector('.back-to-store').style.fontWeight = 'bold';

            //и прячем блок с деталями заказа
            document.getElementById('order-container').classList.add('hidden');

            
        }
        
    }

        /*
        //отправляем запрос на сервер и получаем данные по добавленным в корзину товарам (СНАЧАЛА ПРОПИСАТЬ ФУНКЦИЮ addToBasket)
        let json = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);

        //раскодируем данные
        let data = JSON.parse(json);

        console.log();


        //отрисовываем в main шаблон Карточки
        for (let i = 0; i < data.length; i++)
        main.innerHTML += templateBasket.replace('${goods_img_mini}', data[i]['goods_img'])
                                      .replace('${bsk-goods-title}', data[i]['goods_name'])
                                      .replace('${price}', Math.round(parseInt(data[goods_id]['price']) - (parseInt(data[goods_id]['price']) * (data[goods_id]['sale'] ? (parseInt(data[goods_id]['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data[goods_id]['price'])
                                      .replace('${sale}', (data[goods_id]['sale']) ? data[goods_id]['sale'] : '0')
                                     
            //если скидки нет
            if (main.getElementsByClassName('sale-num bigger')[0].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[0].style.display = 'none';
                document.getElementsByClassName('sale-num')[0].style.display = 'none';
            }
        */
        //отрисовываем в main шаблон Корзины (ПОКА БЕЗ ДОБАВЛЕННЫХ ТОВАРОВ)
        //main.innerHTML += templateBasket;

        

    //функция очистки страницы
    function clearPage() {
        main.innerHTML = '';
    }

    //функция для отправки гет-запросов
    function sendRequestGET(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();

        //отдает данные(результат)
        return xhr.responseText;
    }

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

    function renderAkc(sale) {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost:8091/?sale");

        //раскодируем данные
        let data = JSON.parse(json);

        console.log(sale);

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
