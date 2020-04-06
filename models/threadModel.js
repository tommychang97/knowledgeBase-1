let pg = require('../util/postgres');

const getThreads = (page) => {
    return new Promise((resolve, reject) => {
        const offset = page * 10;
        pg.query(
            `SELECT * FROM threads INNER JOIN users on threads.userid = users.userid ORDER BY threadid DESC OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const addThread = (thread) => {
    console.log('addthread');
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO threads (userid,title,body,date,subject) VALUES (${thread.userid}, $$${thread.title}$$,$$${thread.body}$$,'now()', $$${thread.subject}$$)`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

const getThreadsBySubject = (searchResult) => {
    const offset = searchResult.page * 10;
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM threads INNER JOIN users ON threads.userid = users.userid WHERE subject = '${searchResult.subject}' ORDER BY threadid DESC OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY;`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};
const getThreadsByTitle = (searchResult) => {
    const offset = searchResult.page * 10;
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM threads INNER JOIN users ON threads.userid = users.userid WHERE title
             like '%${searchResult.title}%' ORDER BY threadid DESC OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY;`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const getThreadById = (id) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM threads INNER JOIN users ON threads.userid = users.userid WHERE threads.threadid = ${id};`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const getThreadsFromUser = (user) => {
    const offset = user.page * 10;
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM threads INNER JOIN users ON threads.userid = users.userid WHERE threads.userid = ${user.id} ORDER BY threadid DESC OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY;`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

module.exports = {
    getThreads,
    addThread,
    getThreadById,
    getThreadsBySubject,
    getThreadsByTitle,
    getThreadsFromUser,
};
