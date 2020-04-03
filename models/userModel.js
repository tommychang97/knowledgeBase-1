let pg = require("../util/postgres");
const getUser = email => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM "Users" WHERE email = '${email}'`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        }).catch(function(error) {
            console.log(error);
        });
    });
};

const signUp = registerInfo => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO "Users" (firstname,lastname,password,email,imageurl,description,dob,country) VALUES 
            ('${registerInfo.firstname}','${registerInfo.lastname}','${registerInfo.password}','${registerInfo.email}','${registerInfo.imageUrl}','${registerInfo.about}','${registerInfo.birthdate}','${registerInfo.country}')`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }).catch(function(error) {
            console.log(error);
        });
    });
};


const deleteUserSession = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `DELETE FROM "Sessions" WHERE "ID" = '${user.id}'`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        }).catch(function(error) {
            console.log(error);
        });
    });
};

const createUserSession = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO "Sessions" (id, sessionID) VALUES ('${user.id}', '${user.sessionid}');`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        }).catch(function(error) {
            console.log(error);
        });
    });
};

const editProfile = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `UPDATE "users" SET firstname = '${user.firstname}', lastname = '${user.lastname}, imageurl = '${user.imageurl}', country = '${user.country}'
            , dob = '${user.country}', description = '${user.description}' 
             WHERE "ID" = '${user.id}'`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }).catch(function(error) {
            console.log(error);
        });
    });
}

const incrementLike = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `UPDATE "users" SET likes = likes + 1 WHERE "ID" = '${user.id}`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }).catch(function(error) {
            console.log(error);
        });
    });
}
const incrementPosts = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `UPDATE "users" SET posts = posts + 1 WHERE "ID" = '${user.id}`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }).catch(function(error) {
            console.log(error);
        });
    });
}


const incrementMessages = user => {
    return new Promise((resolve, reject) => {
        pg.query(
            `UPDATE "users" SET messages = messages + 1 WHERE "ID" = '${user.id}`
        ).then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }).catch(function(error) {
            console.log(error);
        });
    });
}

module.exports = {
    getUser: getUser,
    deleteUserSession: deleteUserSession,
    createUserSession: createUserSession,
    signUp: signUp,
    getProfile: getProfile,
    incrementLike: incrementLike,
    intcrementPosts: incrementPosts,
    incrementMessages: incrementMessages
};
