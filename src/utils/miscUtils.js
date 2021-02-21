//date, time utils

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

//number utils

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
