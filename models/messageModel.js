let pg = require("../util/postgres");

const getMessage = conversation => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM "message" WHERE conversationid = '${conversation.id}'  ORDER BY date, conversationid ASC;`
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
            `INSERT INTO "message" (conversationid, subject1id, subject2id, body, date) VALUES ('${message.conversationid}', '${message.subject1id}', '${message.subject2id}', '${message.body}', '${message.date}')`
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
