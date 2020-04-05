'use strict';

const moment = require('moment');

const momentFuc = {
    formatDateMonthYear: (datetime) => {
        return moment(datetime).format('DD MMM YYYY');
    },
    formatMonthDate: (datetime) => {
        return moment(datetime).format('MMM DD');
    },
    formatTimeStamp: (datetime) => {
        return moment(datetime).format('h:mm A');
    },
};

module.exports = momentFuc;
