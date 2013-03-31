
var express = require('express');

// pass the express to the connect redis module
// allowing it to inherit from express.session.Store
//var RedisStore = require('connect-redis')(express);
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var app = express();

//app.use(express.favicon());

//product and /home/products are static html, script, jpg files
app.use(express.static(__dirname + '/static'));
app.use(express.static(process.cwd() + '/home/products'));

//use a sceret key
app.use(express.cookieParser('store 4 lucy'));
//app.use(express.session( {secret: 'store 4 lucy'} ));
// Populates req.session
app.use(express.session(
    { 
        /*cookie: {
            path: "/",
            httpOnly: true,
            maxAge: null
        },  */      
        key: 'store4lucy', 
        secret: 'store 4 lucy', 
        store: sessionStore })

);
///app.use(express.cookieSession());


var product = require('./facade/product');
var auth = require('./auth/auth');


//get product summary by home page (index.html)
app.post('/getProductSummary', product.getProductSummary);

//get product detail by deail button on home page(index.html)
app.post('/q', product.getProductByID);

app.post('/auth', auth.login);


app.listen(80);

console.log("app listening on port 80.");