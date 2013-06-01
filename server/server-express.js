
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

//set up file upload https://github.com/aguidrevitch/jquery-file-upload-middleware
var upload = require('jquery-file-upload-middleware');
upload.configure({
        uploadDir: __dirname + '/static/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });
app.use('/upload', upload.fileHandler());
app.use('/product/upload', upload.fileHandler());

//use body parser
app.use( express.bodyParser( /*{uploadDir: __dirname + '/uploads'}*/ ) );

var product = require('./facade/product');
var auth = require('./auth/auth');
var utils = require('./utils');
var PI = require('./facade/pi');
var order = require('./facade/order');

function getIndexSmapleHTML(request, response){
    utils.getHomePage(function( err, data ){
        if ( err ){
            response.writeHead(505);
        }else{
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
        }
        response.end();
    });    
}


//root is redirect to /product
app.get('/', function(request, response){
    response.redirect('/product');
});

//authoricate routers
app.post('/auth', auth.login);


//prodct routers
//product index page
app.get('/product', getIndexSmapleHTML);
app.get('/product/q/id_list/html', getIndexSmapleHTML);
//get product summary by home page (index.html)
app.get('/product/q/id_list/json', product.getProductByIDList);

//get product detail by deail button on home page(index.html)
app.get('/product/q/id/html', getIndexSmapleHTML);
app.get('/product/q/id/json', product.getProductByID);

//get all categories of product
app.get('/product/q/categories', product.getAllCategoriesOfProduct);

app.get('/product/q/compatible_brand', product.getCompatibleBrand);

app.get('/product/export/quatation/html', product.getProductExportPage);

app.get('/product/new/html', getIndexSmapleHTML);
app.post('/product/new/json', product.newProduct);

//app.post('/product/upload', product.uploadProductImage);

//app.get('/product/q/?type=model');

//app.get('/product/q/type/?model=iPhone5');


//PI routers
//PI home page
app.get('/pi', getIndexSmapleHTML);
//get PI by count
app.get('/pi/q/count/json', PI.queryPIByCount);
app.get('/pi/q/count/html', getIndexSmapleHTML);

//get PI by PI No.
app.get('/pi/q/no/json', PI.queryPIDetailByNOWithProductContent);
app.get('/pi/q/no/html', getIndexSmapleHTML);


app.get('/order', getIndexSmapleHTML);
app.get('/order/q/count/json', order.queryOrderByCount);
app.get('/order/q/count/html', getIndexSmapleHTML);


app.listen(80);

console.log("app listening on port 80.");