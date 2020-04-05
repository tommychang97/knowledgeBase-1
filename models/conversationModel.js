let pg = require("../util/postgres");

const getConversations = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM conversations INNER JOIN users WHERE senderid = ${user.id} OR receiverid = ${user.id};`
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
            `INSERT INTO conversations (senderid, receiverid, topic, conversationdate) VALUES 
            (${users.senderid}, ${users.receiverid}, $$${users.topic}$$, 'now()')`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            pg.query(
                `SELECT * FROM conversations WHERE senderid = ${users.senderid} ORDER BY senderid DESC LIMIT 1`
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
