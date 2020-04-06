let pg = require('../util/postgres');
const getSession = (userid) => {
    console.log('execeuting get sessino', userid);
    return new Promise((resolve, reject) => {
        pg.query(`SELECT * FROM sessions WHERE userid = ${userid}`)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

module.exports = {
    getSession,
};
