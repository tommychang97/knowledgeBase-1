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
            `DELETE FROM "Sessions" WHERE ID = '${user.ID}'`
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
            `INSERT INTO "Sessions" (userID, sessionID) VALUES ('${user.userID}', '${user.sessionID}');`
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

module.exports = {
    getUser: getUser,
    deleteUserSession: deleteUserSession,
    createUserSession: createUserSession,
    signUp: signUp
};
