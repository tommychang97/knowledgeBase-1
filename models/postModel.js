let pg = require('../util/postgres');

const getPosts = (thread) => {
    return new Promise((resolve, reject) => {
        const offset = thread.page * 10;
        pg.query(
            `SELECT users.imageurl, posts.body from posts INNER JOIN threads on posts.threadid = threads.threadid INNER JOIN users on posts.userid = users.userid
            WHERE threads.threadid = ${thread.id} ORDER BY threads.threadid OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const addPost = (post) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO posts (userid,threadid,body,date) VALUES (${post.id},${post.threadid},$$${post.body}$$,'now()')`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};
module.exports = {
    getPosts,
    addPost,
};
