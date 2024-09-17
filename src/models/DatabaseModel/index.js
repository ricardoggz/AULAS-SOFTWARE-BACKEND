const mysql = require('mysql')

class DatabaseModel{
    host ='mysql-himfg.alwaysdata.net'
    user ='himfg'
    database ='himfg_aulas'
    password ='eskatepunK_10'
    port =3306
    pool
    constructor(){
        this.pool = new mysql.createPool({
            host: this.host,
            user: this.user,
            database : this.database,
            password: this.password,
            port: this.port
        })
    }
}

module.exports={
    DatabaseModel
}