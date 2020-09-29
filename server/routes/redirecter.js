const { update } = require('../models/urlModel')
const UrlModel = require('../models/urlModel')


exports.shortToLong = async (req, res) => {
    const param = req.params.shortcode
    const exists = await UrlModel.findById(param)
    if(exists){
        exists.clicks++ 
        await exists.save()
        return res.redirect(exists.fullUrl)
    }else{
        res.render('404')
    }
}
