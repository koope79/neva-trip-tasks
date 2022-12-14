## Task layout 1

Ссылки:

- [Приложение Neva Trip App](https://neva-trip-layout-1.vercel.app/)
- [Репозиторий](https://github.com/koope79/neva-trip-layout_1)

## Task layout 2

1. Первым решением проблемы может являться преобразование каждой строки таблицы в отдельный блок. Данная реализация обуславливается использованием медиа-запроса на `max-width: 364px` экрана, в котором содержаться инструкции по преобразованию ячеек таблицы в блочный элемент.
2. Ещё одним решением данной проблемы является добавлением для класса `.blog` свойства `box-sizing: border-box`, а также для ячеек таблицы свойства `word-break: break-word`, за счёт чего обуславливается разбиение слов в произвольном месте, если не будет найдено более подходящее для переноса строки место.
3. Другим менее предпочтительным решением является уменьшение размер текста в ячейках в медиа-запросе. Данное решение является менее предпочтительным, так как не решает проблему появления горизонтального скролла в полной мере, а также может негативно сказываться на читабельности контента таблицы при использовании множества медиа-запросов под самые мальнькие экраны мобильных устройств.

Все решения более детально описаны в файле `style.css`.

## Task JS 1

Таблица `nevaorders`.

![Image text](https://github.com/koope79/neva-trip-tasks/blob/main/task_js_1/nevaorders_table.png)

Таблица `ticketType`.

![Image text](https://github.com/koope79/neva-trip-tasks/blob/main/task_js_1/tickettype_table.png)

Из таблицы убраны поля, которые отвечают за цены и количество билетов для типов “Взрослый” и “Детский”. Добавлено поле ticket_type_id, которое ссылается на таблицу TicketType. Создана таблица TicketType с полями:
- Id - идентификатор типа билета
- Event_id - идентификатор события
- name - название типа билета
- price - цена билета

При необходимости в таблицу TicketType могут быть добавлены другие типы билетов со своей расценкой и названием. При покупке билетов, для каждого типа билетов на событие создаётся новая запись, в которой указывается тип билета, код события, уникальный код билета (barcode_ticket), уникальный код заказа (barcode), а также идентификатор пользователя, который приобрёл эти билеты. Расчёт цены билетов может производиться на основании выбранного типа билета. В случае покупки нескольких билетов с разным типом общую сумму заказа можно рассчитать по столбцу barcode (уникальный номер заказа), выборка по которому также включает информацию о количестве билетов данного заказа согласно полю barcode_ticket.

## Task JS 2

[Ссылка на репозиторий](https://github.com/koope79/neva-trip-tasks/tree/main/task_js_2)
