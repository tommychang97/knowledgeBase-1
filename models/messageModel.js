let pg = require("../util/postgres");

const getMessages = conversation => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM messages WHERE conversationid = '${conversation.id}' ORDER BY date, conversationid ASC;`
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
            `INSERT INTO messages (conversationid, subject1id, subject2id, body, date) VALUES ('${message.conversationid}', '${message.subject1id}', '${message.subject2id}', '${message.body}', 'now()')`
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
