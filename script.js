function days_between(date1, date2, return_format) {
    // кол-во миллисекунд
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
    const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

    const differenceMs = Math.abs(date1 - date2);

    if (return_format == 'дней'){
        return Math.round(differenceMs / ONE_DAY);
    }
    else if (return_format == 'месяцев'){
        return Math.round(differenceMs / ONE_MONTH);
    }
    else if (return_format == 'лет'){
        return Math.round(differenceMs / ONE_YEAR);
    }
    else {return 'Выберите период из списка'}
}

var date = new Date();
const renderCalendar = () => {

    date.setDate(1);

    const monthDays = document.querySelector('.days');

    // на какой по порядку день заканчивается месяц 
    const lastDay  = new Date(date.getFullYear(), 
                            date.getMonth() + 1, 
                            0).getDate();
    // на какой по порядку день заканчивается предыдущий месяц
    const prevLastDay = new Date(date.getFullYear(), 
                                date.getMonth(), 
                                0).getDate();

    // индекс первого дня месяца чтобы сдвинуть начало календаря
    // -1 потому что американцы тупые 
    if (date.getDay() == 0){
        var firstDayIndex = 6;
    }
    else {
        var firstDayIndex = date.getDay() - 1;
    }

    // костыль из-за тупых американцев
    const lastDay_ = new Date(date.getFullYear(), 
                                    date.getMonth() + 1, 
                                    0);

    if (lastDay_.getDay() == 0){
        var lastDayIndex = 6;
    }
    else {
        var lastDayIndex = lastDay_.getDay() - 1;
    }

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];

    // выводим месяц на страницу
    document.querySelector('.date h1').innerHTML = months[date.getMonth()] + ', ' + date.getFullYear() ;

    const options = {
        weekday: 'long',
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    // выводим читабельную дату на русском 
    document.querySelector('.return-date p').innerHTML = new Date().toLocaleDateString('ru-RU', options);

    let days = '';

    // выводим видимые дни прошлого месяца
    for (let x = firstDayIndex; x > 0; x--){
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
    
    function pad(n) {return n<10 ? '0'+n : n};

    // выводим дни текущего месяца
    for (let i = 1; i <= lastDay; i++){
        if (i === new Date().getDate() && 
            date.getMonth() === new Date().getMonth()&&
            date.getFullYear() === new Date().getFullYear())

            {
                days += `<div class='today'>${i}</div>`;
                let the_day = date.getFullYear()+'-' + pad(date.getMonth()+1)+'-'+ pad(i);
                // праздники на сегодня
                getHolidayNames(the_day).then(function(res){
                    var eventsDay = document.querySelector('.events-list p');
                    
                    if (res.length < 1){
                        res = 'Сегодня праздника нет'
                    }
                    eventsDay.innerHTML = res;
                    });
            }
            else 
            {
                days += `<div id='this-month${i}' onclick="show_events_day(${date.getFullYear()},
                                                                           ${date.getMonth()+1}, 
                                                                            ${i})">${i}</div>`;
            }
        
        monthDays.innerHTML = days;
    }

    // выводим видимые дни след месяца
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
    
}

// месяц назад
document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

// вернуться в сегодня
document.querySelector('.return-date').addEventListener('click', () => {
    date = new Date();
    renderCalendar();
});

// месяц вперед
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// считаем период
document.querySelector('.calc-diff').addEventListener('click', () => {
    var datestart = document.getElementById('start');
    var dateend = document.getElementById('end');
    var period = document.getElementById('periods');

    document.getElementById('result').value = days_between(datestart.valueAsNumber, dateend.valueAsNumber, period.value);
});

renderCalendar()

