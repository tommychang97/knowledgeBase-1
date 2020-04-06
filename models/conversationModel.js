const pg = require('../util/postgres');

const getConversations = (user) => {
    var image = [];
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT users.imageurl FROM users INNER JOIN conversations on users.userid = conversations.receiverid WHERE conversations.senderid = ${user.id} ORDER BY conversationid DESC`
        ).then((res, err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    image.push(res.rows[i]['imageurl']);
                }
            }
        });
        pg.query(
            `SELECT * FROM users INNER JOIN conversations on users.userid = conversations.senderid WHERE senderid = ${user.id} OR receiverid = ${user.id} ORDER BY conversationid DESC`
        )
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                for (var i = 0; i < res.rows.length; i++) {
                    if (res.rows[i]['senderid'] == user.id) {
                        res.rows[i]['imageurl'] = image.shift();
                    }
                }
                console.log(res.rows);
                resolve(res.rows);
            })
            .catch(function (error) {
                console.log(error);
            });
    }).catch(function (error) {
        console.log(error);
    });
};

const createConversation = (users) => {
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
            )
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
    });
};

module.exports = {
    getConversations,
    createConversation,
};
