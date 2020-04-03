let pg = require("../util/postgres");

const getThreads = page => {
  return new Promise((resolve, reject) => {
      var offset = page * 10;
      pg.query(
          `SELECT * FROM "thread" ORDER BY "ID" OFFSET '${offset}' ROWS FETCH NEXT 10 ROWS ONLY`
      ).then((res, err) => {
          if (err) {
              reject(err);
          }
          resolve(res.rows);
      });
  });
};

const addThread = thread => {
  return new Promise((resolve, reject) => {
      pg.query(
        `INSERT INTO "thread" (userid,title,body,date,subject) VALUES ('${thread.userid}', '${thread.title}','${thread.body}','${thread.date}', '${thread.subject}')`
      ).then((res, err) => {
          if (err) {
              reject(err);
          }
          resolve(res.rows);
      });
  });
};

const getSearchedThreads = searchResult => {
    var offset = searchResult.page * 10;
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM "thread"  WHERE topic = '${searchResult.topic}' ORDER BY "ID" OFFSET '${offset}' ROWS FETCH NEXT 10 ROWS ONLY;`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

module.exports = {
  getThreads: getThreads,
  addThread: addThread,
  getSearchedThreads:getSearchedThreads
};
