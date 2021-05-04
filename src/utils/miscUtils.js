//#region date, time utils

//1 - for get current date to 2 format mdy and dmy
export let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today.getDateMDY = function () {
    return mm + '-' + dd + '-' + yyyy;
}
today.getDateDMY = function () {
    return dd + '-' + mm + '-' + yyyy;
}

//2 - for get time ago from current time
// 2011-10-05T14:48:00.0
const MONTH_NAMES = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} vào lúc ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} vào lúc ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. vào lúc ${hours}:${minutes}`;
}

export function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'vừa xong';
    } else if (seconds < 60) {
        return `${seconds} giây trước`;
    } else if (seconds < 90) {
        return 'khoảng 1 phút trước';
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (isToday) {
        return getFormattedDate(date, 'Hôm nay,'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Hôm qua,'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}

//#end regions





//#region number utils: for convert number from 1000 to 1k, 1000000 to 1M, ...
var ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
];

export function formatNumber(n) { //conver from 1000 to 1k, and more ...
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return (n / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return n.toString();
}

//#endregion