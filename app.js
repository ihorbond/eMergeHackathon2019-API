'use strict';
const debug = require('debug');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

const routes = require('./routes/index');
const pitches = require('./routes/pitches');
const competitions = require('./routes/competitions');

require('dotenv').config();
require('./configs/database');

var app = express();

 app.use(cors({
   credentials: true,
   origin: [ 'http://localhost:4200' ]
 }));

const server = http.createServer(app);
const io = socketIO(server);
io.set('origins', '*:*');

require('./sockets.js')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/competitions', competitions);
app.use('/pitches', pitches);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', 3000);

server.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
