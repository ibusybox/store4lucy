var express = require('express');
var app = express();

var requestHandles = require('./requesthandles');

//product and /home/products are static html, script, jpg files
app.use(express.static(__dirname + '/static'));
app.use(express.static(process.cwd() + '/home/products'));

//login
//app.get('/login', )

//get product summary by home page (index.html)
app.post('/getProductSummary', requestHandles.queryProductSummary);

//get product detail by deail button on home page(index.html)
app.post('/q', requestHandles.queryProductByID);


app.listen(80);

console.log("app listening on port 80.");