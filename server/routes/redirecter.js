const database = require('../db/database')

exports.shortToLong = async (req, res) => {
    let urlToRedirect = req.params.shortcode
    let sql = 'SELECT * FROM urls where id = ?'
    database.get(sql, [urlToRedirect], (err, row) => {
        if(err){
            return console.error(err.message)
        }else{
            let clicks = row.clicks++
            database.run(`UPDATE urls set clicks = COALESCE(?,clicks) where id = ?`, [clicks, urlToRedirect], function(err, result) {
                if(err){
                    return console.error(err.message)
                }
            })
            res.status(302).redirect(row.longurl)
        }
    })
}
