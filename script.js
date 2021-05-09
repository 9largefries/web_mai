const date = new Date();

const renderCalendar = () => {
    date.setDate(1);
    const monthDays = document.querySelector('.days');

    // на какой по порядку день заканчивается месяц 
    const lastDay  = new Date(date.getUTCFullYear(), 
                            date.getUTCMonth() + 1, 
                            0).getDate();
    // на какой по порядку день заканчивается предыдущий месяц
    const prevLastDay = new Date(date.getUTCFullYear(), 
                                date.getUTCMonth(), 
                                0).getDate();

    // индекс первого дня месяца чтобы сдвинуть начало календаря
    // -1 потому что американцы тупые 
    if (date.getDay() == 0){
        firstDayIndex = 6;
    }
    else {
        firstDayIndex = date.getDay() - 1;
    }

    // костыль из-за тупых американцев
    const lastDay_ = new Date(date.getUTCFullYear(), 
                                    date.getUTCMonth() + 1, 
                                    0);

    if (lastDay_.getDay() == 0){
        lastDayIndex = 6;
    }
    else {
        lastDayIndex = lastDay_.getDay() - 1;
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
    document.querySelector('.date h1').innerHTML = months[date.getMonth()];

    options = {
        weekday: 'long',
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    // выводим читабельную дату на русском 
    document.querySelector('.date p').innerHTML = new Date().toLocaleDateString('ru-RU', options);

    let days = '';

    // выводим видимые дни прошлого месяца
    for (let x = firstDayIndex; x > 0; x--){
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    // выводим дни текущего месяца
    for (let i = 1; i <= lastDay; i++){
        if (i === new Date().getDate() && 
            date.getMonth() === new Date().getMonth())
            {
                days += `<div class='today'>${i}</div>`;
            }
            else 
            {
                days += `<div>${i}</div>`;
            }
        
        monthDays.innerHTML = days;
    }

    // выводим видимые дни след месяца
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }

}


document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar()

