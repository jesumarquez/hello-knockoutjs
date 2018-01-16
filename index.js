var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8080,
    usersStorage = {'users': [{'name':'a1', 'enabled': true}, {'name': 'a2', 'enabled': false}]}

app.use(express.static('public'))
app.use('/scripts', express.static(__dirname + '/node_modules/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/user', function (req, res) {
    res.json(usersStorage) 
})

app.post('/user', function(req, res){
    usersStorage.users.push(JSON.parse(req.body.user))
    res.json(usersStorage)
})

app.listen(port, function () {
    console.log('Server is running in http://localhost:' +  port)
})