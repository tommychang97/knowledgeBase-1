var Handlebars = require('express-handlebars');

const helpers = {
    inc: (value) => {
        return parseInt(value, 10) + 1;
    },
    dec: (value) => {
        return value ? parseInt(value, 10) - 1 : 0;
    },
};

module.exports.helpers = helpers;
