let pg = require("../util/postgres");

const getConversations = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM conversations WHERE subject1id = ${user.id} OR subject2id = ${user.id};`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const createConversation = users => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO conversations (subject1id, subject2id, topic) VALUES 
            (${users.firstuserid}, ${users.seconduserid}, $$${users.topic}$$)`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            pg.query(
                `SELECT * FROM conversations WHERE subject1id = ${users.firstuserid} ORDER BY subject1id DESC LIMIT 1`
            ).then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            }).catch(function(error) {
                console.log(error);
            });
        });
    });
};

module.exports = {
    getConversations: getConversations,
    createConversation: createConversation
};
