let pg = require('../util/postgres');
const getUser = (email) => {
    return new Promise((resolve, reject) => {
        pg.query(`SELECT * FROM users WHERE email = '${email}'`)
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
};

const getUserPage = (userid) => {
    const data = {};
    return new Promise((resolve, reject) => {
        pg.query(`SELECT * FROM users WHERE userid = ${userid}`)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                data['userInfo'] = res.rows[0];
                pg.query(
                    `SELECT threads.threadid, threads.title, threads.body, threads.date, threads.subject, threads.replycount, users.imageurl, users.userid FROM users INNER JOIN threads ON users.userid = threads.userid WHERE threads.userid = ${userid}`
                )
                    .then((res, err) => {
                        if (err) {
                            reject(err);
                        }
                        data['userThreads'] = res.rows;
                        resolve(data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

const signUp = (registerInfo) => {
    return new Promise((resolve, reject) => {
        if (registerInfo.birthdate === '') {
            var query = `INSERT INTO users (firstname,lastname,password,email,imageurl,description,dob,country) VALUES 
            ($$${registerInfo.firstname}$$,$$${registerInfo.lastname}$$,$$${registerInfo.password}$$,$$${registerInfo.email}$$,$$${registerInfo.imageUrl}$$,$$${registerInfo.description}$$,null,$$${registerInfo.country}$$)`;
        } else {
            var query = `INSERT INTO users (firstname,lastname,password,email,imageurl,description,dob,country) VALUES 
            ($$${registerInfo.firstname}$$,$$${registerInfo.lastname}$$,$$${registerInfo.password}$$,$$${registerInfo.email}$$,$$${registerInfo.imageUrl}$$,$$${registerInfo.description}$$,'${registerInfo.birthdate}',$$${registerInfo.country}$$)`;
        }
        pg.query(query)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

const deleteUserSession = (user) => {
    return new Promise((resolve, reject) => {
        pg.query(`DELETE FROM sessions WHERE userid = ${user.id}`)
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
};

const createUserSession = (user) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO sessions (userid, sessionid) VALUES (${user.id}, '${user.sessionid}');`
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
};

const editProfile = (user) => {
    let query;
    return new Promise((resolve, reject) => {
        if (user.birthdate === '') {
            query = `UPDATE users SET firstname = $$${user.firstname}$$, lastname = $$${user.lastname}$$, imageurl = $$${user.imageurl}$$, country = $$${user.country}$$
            , dob = null, description = $$${user.description}$$ WHERE userid = ${user.id}`;
        } else {
            query = `UPDATE users SET firstname = $$${user.firstname}$$, lastname = $$${user.lastname}$$, imageurl = $$${user.imageurl}$$, country = $$${user.country}$$
            , dob = '${user.birthdate}', description = $$${user.description}$$ WHERE userid = ${user.id}`;
        }
        pg.query(query)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

const incrementLike = (user) => {
    return new Promise((resolve, reject) => {
        pg.query(`UPDATE users SET likes = likes + 1 WHERE userid = ${user.id}`)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};
const incrementPosts = (user) => {
    return new Promise((resolve, reject) => {
        pg.query(`UPDATE users SET posts = posts + 1 WHERE userid = ${user.id}`)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

const incrementMessages = (user) => {
    return new Promise((resolve, reject) => {
        pg.query(`UPDATE users SET messages = messages + 1 WHERE userid = ${user.id}`)
            .then((res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

module.exports = {
    getUserPage,
    getUser,
    deleteUserSession,
    createUserSession,
    signUp,
    editProfile,
    incrementLike,
    incrementPosts,
    incrementMessages,
};
