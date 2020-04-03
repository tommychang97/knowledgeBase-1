let pg = require("../util/postgres");

const getPosts = thread => {
  return new Promise((resolve, reject) => {
      var offset = thread.page * 10;
      pg.query(
          `SELECT * FROM "thread" INNER JOIN "post" ON thread.threadid = post.threadid WHERE thread.threadid = '${thread.id}'ORDER BY "ID" OFFSET '${offset}' ROWS FETCH NEXT 10 ROWS ONLY;`
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
          `INSERT INTO "post" (threadid,title,body,date,subject) VALUES ('${post.threadid}', '${post.title}','${post.body}','${post.date}', '${post.subject}')`
      ).then((res, err) => {
          if (err) {
              reject(err);
          }
          resolve(res.rows);
      });
  });
};

module.exports = {
  getPosts: getPosts,
  addPost: addPost,
};
