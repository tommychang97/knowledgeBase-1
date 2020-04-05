'use strict';

const moment = require('moment');

const momentFuc = {
    formatDateMonthYear: (datetime) => {
        console.log(datetime);
        return moment(datetime).format('DD MMM YYYY');
    },
    formatMonthDate: (datetime) => {
        console.log(datetime);

        return moment(datetime).format('MMM DD');
    },
    formatTimeStamp: (datetime) => {
        console.log(datetime);

        return moment(datetime).format('h:mm A');
    },
};

module.exports = momentFuc;
