const connection = require("../model/DBconect");

class BaseController {


    querySQL(sql){
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) =>{
                if (err){
                    reject(err);
                }
                resolve(result);
            })
        })

    }
}

module.exports = BaseController;
