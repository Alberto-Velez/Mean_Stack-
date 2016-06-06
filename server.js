var express = require('express'),
app= express(),
engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert');
bodyParser = require('body-parser');



var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup





// catch 404 and forward to error handler

MongoClient.connect('mongodb://localhost:27017/munchies', function(err, db){

  assert.equal(null, err);
      console.log("Successfully connected to MongoDB.");


app.get('/', function(req, res){
res.render('index.html' );

});

app.get('/name', function(req, res){
db.collection('names').find().toArray(function(err, docs) {
            if (!err) {

                console.log(docs);
                res.json(docs);


}
else{
  console.log(err);
}
})
});


   app.post('/calls', function(req, res) {
       console.log("Post body.value is "+ req.body.value)
       response={
         "name": req.body.value
       }
db.collection("names").insert(response, {w:1}, function(err, result) {});

   });


app.use(function(req, res){
  res.sendStatus(404);
});


var server = app.listen(3000, function() {
  var port=server.address().port;
  console.log('express server listening on port %s', port);
});

});

module.exports = app;
