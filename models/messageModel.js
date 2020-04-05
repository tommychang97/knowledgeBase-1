let pg = require("../util/postgres");

const getMessages = conversation => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM messages INNER JOIN users ON messages.senderid = users.userid OR messages.receiverid = users.userid WHERE conversationid = ${conversation.id} ORDER BY messages.date DESC;`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const createMessage = message => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO messages (conversationid, senderid, receiverid, body, date) VALUES (${message.conversationid}, ${message.senderid}, ${message.receiverid}, $$${message.body}$$, 'now()')`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

module.exports = {
    getMessages: getMessages,
    createMessage: createMessage
};
