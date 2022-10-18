const selectRoute = document.querySelector("#route");
const selectForward = document.querySelector("#time_forward");
const selectBackward = document.querySelector("#time_backward");
const calcButton = document.querySelector("#calc_button");
const ticketCount = document.querySelector("#num");
const result = document.querySelector("#result");

const COST_TICKET_ONEWAY = 700;
const COST_TICKET_BOTHWAYS = 1200;
const TIME_TRAVEL = 50;

const FROM_A_TO_B = [
    "2021-08-21 18:00:00",
    "2021-08-21 18:30:00",
    "2021-08-21 18:45:00",
    "2021-08-21 19:00:00",
    "2021-08-21 19:15:00",
    "2021-08-21 21:00:00",
];

const FROM_B_TO_A = [
    "2021-08-21 18:30:00",
    "2021-08-21 18:45:00",
    "2021-08-21 19:00:00",
    "2021-08-21 19:15:00",
    "2021-08-21 19:35:00",
    "2021-08-21 21:50:00",
    "2021-08-21 21:55:00",
];

const timeZone = (-new Date().getTimezoneOffset() / 60) - 3;

const getDate = (dataTime, offset = 0) => {
    const date = new Date(dataTime);
    date.setMinutes(date.getMinutes() + offset);
    return date;
};

const timesForward = FROM_A_TO_B.map(date => getDate(date, timeZone));
const timesBackward = FROM_B_TO_A.map(date => getDate(date, timeZone));

const getFormatDate = (date) => {
    return date.toLocaleString("ru-RU", { hour: "numeric", minute: "numeric" });
};

const renderTimesOption = (timesData) => {
    return timesData.map(time => `<option value="${time}">${getFormatDate(time)}</option>`).join("");
};

const calcTimeBackward = () => {
    const forwardTime = getDate(selectForward.value).getTime() + TIME_TRAVEL * 60 * 1000;
    return timesBackward.filter(time => time.getTime() > forwardTime);
};

const renderOptionList = (ticket) => {
    if (ticket === "forward") {
        selectRoute.getElementsByTagName('option')[0].selected = true;
        selectForward.style.display = 'inline-block';
        selectForward.innerHTML = renderTimesOption(timesForward);
        selectBackward.innerHTML = "";
        selectBackward.style.display = 'none';
    }
    if (ticket === "backward") {
        selectBackward.style.display = 'inline-block';
        selectBackward.innerHTML = renderTimesOption(timesBackward);
        selectForward.innerHTML = "";
        selectForward.style.display = 'none';
    }
    if (ticket === "twoways") {
        if (!selectForward.value) {
            selectForward.style.display = 'inline-block';
            selectForward.innerHTML = renderTimesOption(timesForward);
        }
        selectBackward.style.display = 'inline-block';
        selectBackward.innerHTML = renderTimesOption(calcTimeBackward());
    }
};
renderOptionList("forward");

selectRoute.addEventListener("change", (e) => renderOptionList(e.target.value));
selectForward.addEventListener("change", () => {
    if (!selectBackward.value) return;
    renderOptionList("twoways");
});

calcButton.addEventListener("click", () => {
    if (ticketCount.value == 0 || ticketCount.value == "") return;
    const totalTicketsSum = selectRoute.value == "twoways" ? ticketCount.value * COST_TICKET_BOTHWAYS : ticketCount.value * COST_TICKET_ONEWAY;
    const totalDuration = selectRoute.value == "twoways" ? TIME_TRAVEL * 2 : TIME_TRAVEL;
    const startTravelTime = selectRoute.value == "backward" ? selectBackward.value : selectForward.value;
    const endTravelTime = getEndTravelTime(selectRoute.value);
    

    result.innerHTML = `Вы выбрали ${ticketCount.value} ${convertTicketFormat(ticketCount.value)} по маршруту ${getDirection(selectRoute, Object.values(selectRoute.options))} стоимостью ${totalTicketsSum}р.\n 
    Это путешествие займёт у вас ${totalDuration} минут.\n
    Теплоход отправляется в ${getFormatDate(getDate(startTravelTime))}, а прибудет в ${getFormatDate(getDate(endTravelTime))}.`

});

const getDirection = (currentRoute, options) => {
    const filteredOption = options.filter(opt => opt.value === currentRoute.value);
    return filteredOption[0].innerHTML;
}

const getEndTravelTime = (route) => {
    if (route === "forward") return getDate(selectForward.value, TIME_TRAVEL);
    return getDate(selectBackward.value, TIME_TRAVEL);
}

const convertTicketFormat = (value) => {
    const nameTickets = ['билет', 'билета', 'билетов'];
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return nameTickets[2];
    if (num > 1 && num < 5) return nameTickets[1];
    if (num == 1) return nameTickets[0];
    return nameTickets[2];
}

