var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server is running in http://localhost:' +  port);
})