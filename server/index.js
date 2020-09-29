require('dotenv').config()
const express = require('express')
const path = require('path')
const db = require('./db/db')
const routes = require('./routes/')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname + '/../app/')))
db.conn()
//set template engine to ejs
app.set('view engine', 'ejs')

//set urlencoded extended to false to use querystring library
app.use(express.urlencoded({ extended: true}))

//set views
app.set('views', path.join(__dirname + '/../app/views'))

//set main route
app.get('/', (req, res) => {
    res.render('index')
})

//set post view
const baseUrl = process.env.LOCAL_BASE_URL
app.post('/', async (req, res) => {
    //get user value and save in db and send response to client
    routes.shortener.post(req, res, baseUrl)
})

//redirect short url to long url route
app.get('/:shortcode', (req, res) => {
    //get the requested short url and check if exits in database and redirect, if not send 404
    routes.redirecter.shortToLong(req, res)
})


app.listen(process.env.LOCAL_PORT)

