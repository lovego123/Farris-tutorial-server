var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();


/**
 * 跨域设置
 */
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();
});


/**
 * 处理静态托管
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 处理body
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/**
 * 路由处理
 */
var index = require('./routes/index');
app.use('/', index);

var xsdds = require('./routes/xsdds');
app.use('/xsdds',  xsdds);

var mqueue = require('./routes/mqueue');
app.use('/mqueue',  mqueue);

var monitor = require('./routes/monitor');
app.use('/monitor',  monitor);

app.listen(8080);
console.log('Server is listening : 8080');