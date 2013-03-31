
// first:
// $ npm install redis
// $ redis-server

var express = require('express');
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();

var app = express();

app.use(express.logger('dev'));

// Required by session() middleware
// pass the secret for signed cookies
// (required by session())
app.use(express.cookieParser('keyboard cat'));

// Populates req.session
app.use(express.session( {secret: 'store 4 lucy', store: sessionStore} ));

app.use('/', function(req, res){
  var body = '';
  if (req.session.views) {
    ++req.session.views;
    res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
  } else {
    req.session.regenerate( function(){
        req.session.views = 1;
        body += '<p>First time visiting? view this page in several browsers :)</p>';
        res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
    } );
  }
});

app.listen(3000);
console.log('Express app started on port 3000');
