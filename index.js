var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    users = {'users': [{'name':'a1'}, {'name': 'a2'}]};

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/users', function (req, res) {
    res.send(users); 
})

app.listen(port, function () {
    console.log('Server is running in http://localhost:' +  port);
})