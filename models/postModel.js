let pg = require("../util/postgres");

const getPosts = thread => {
  return new Promise((resolve, reject) => {
      var offset = thread.page * 10;
      pg.query(
          `SELECT * FROM threads INNER JOIN posts ON threads.threadid = posts.threadid WHERE threads.threadid = ${thread.id} ORDER BY threads.threadid OFFSET ${offset} ROWS FETCH NEXT 5 ROWS ONLY;`
      ).then((res, err) => {
          if (err) {
              reject(err);
          }
          resolve(res.rows);
      });
  });
};

const addPost = post => {
  return new Promise((resolve, reject) => {
      pg.query(
          `INSERT INTO posts (threadid,title,body,date) VALUES (${post.threadid}, $$${post.title}$$,$$${post.body}$$,'now()')`
      ).then((res, err) => {
          if (err) {
              reject(err);
          }
          resolve(res);
      });
  });
};

module.exports = {
  getPosts: getPosts,
  addPost: addPost,
};
