const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(process.env.LOCAL_SQLITE, (err) => {
    if(err){
        console.error(err.message)
        throw err
    }else{
        db.run(`CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            longurl TEXT,
            clicks INTEGER
        )`,
        (err) => {
            if(err){
                console.error(err.message)
               
            }
        })
    }
})

module.exports = db