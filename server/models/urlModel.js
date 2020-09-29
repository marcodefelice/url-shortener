const mongoose = require('mongoose')
const ids = require ('short-id')

//configure short-id length
ids.configure({
    length: 3
})

const urlModel = new mongoose.Schema({
  fullUrl: {
      type: String,
      required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  _id: {
    type: String,
    required: true,
    //default: ids.generate()
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('urlModel', urlModel)
    