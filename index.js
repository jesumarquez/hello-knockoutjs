var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8080,
    usersStorage = {'users': [{id: 1, name:'a1', enabled: true}, {id: 2, name: 'a2', enabled: false}]}

app.use(express.static('public'))
app.use('/scripts', express.static(__dirname + '/node_modules/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/user', function (req, res) {
    res.json(usersStorage) 
})

app.post('/user', function(req, res){
    var user = JSON.parse(req.body.user)
    user.id = usersStorage.users.length + 1
    usersStorage.users.push(user)
    res.json(usersStorage)
})

app.put('/user', function (req, res) {
    var u = JSON.parse(req.body.user)
    var user = usersStorage.users.find(function (element) {
        return element.id === u.id
    })
    user.name = u.name
    user.enabled = u.enabled
    res.json(usersStorage)    
})

app.listen(port, function () {
    console.log('Server is running in http://localhost:' +  port)
})