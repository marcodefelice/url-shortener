const validUrl = require('valid-url')
const urlExists = require('url-exists')
const UrlModel = require('../models/urlModel')

const ids = require ('short-id')
//configure short-id length
ids.configure({
    length: 4
})

exports.post = (req, res, baseUrl) => {
    const userUrl = req.body.data
    if(validUrl.isUri(userUrl)){
        //check if url is really online
        if(urlExists(userUrl, async (err, exists) => {
            if(exists){
                /* implement saving in db */
                var id = ids.generate()
                var check = await UrlModel.findById(id)
                if(check != null){
                    id = id + ids.generate()
                    var recheck = await UrlModel.findById(id)
                    if(recheck != null){
                        ids.configure({
                            length: 5
                        })
                        id = id + ids.generate()
                    }
                }
                const record = new UrlModel({
                    _id: id,
                    fullUrl: userUrl,
                    shortUrl: baseUrl + id
                })

                //check if shortcode already exists

                await record.save()
                res.status(201).json({shortenedUrl: `${record.shortUrl}`})
            }else{
                res.status(404).json({urlNotExists: `${userUrl} non risulta essere un link attivo.`})
            }
        }));
    }else{
        res.status(400).json({badFormattedUrl: `Inserire una Url valida, ${userUrl} non è un formattato correttamente.`})
    }
    
}
