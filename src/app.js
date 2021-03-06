const express = require('express')
const path = require('path')
const ejs = require('ejs')
const axios = require('axios')
const bodyParser = require('body-parser')


const app = express()
var port = process.env.PORT || 3000

const viewPath = path.join(__dirname,'./views')
console.log(viewPath)

app.use(bodyParser.urlencoded({extended:true}))


app.set('view engine', 'ejs')
app.set('views', viewPath)

const APIkey = '16004459-b53de54a959e38e06433e038c'

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    var imageResult = req.body.imageInput
    res.redirect('/images/'+imageResult)
})

app.get('/images/:id', (req, res) => {
    var searchImage = req.params.id

    axios.get(`https://pixabay.com/api/?key=16004459-b53de54a959e38e06433e038c&q=${searchImage}&image_type=photo&pretty=true`)
    .then(function(response){
        const data = response.data.hits
        res.render('results', {images: data})  
    }).catch(function (err){
        console.log(err)
        res.send('cant get image')
    })

})

app.listen(port, () => {
    console.log('server is up and running on port ' +port)
})