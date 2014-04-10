
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var majax = require('./routes/ajax_rt');
var mscene = require('./routes/scenari_rt');
var mshell = require('./routes/shell_rt');
var domoticz = require('./routes/domoticz');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/heure', routes.horloge);
//app.get('/users', user.list);
//app.get('/shell',mshell.test);
app.get('/vnstat/:id',mshell.vnstat);
//app.get('/cron',mshell.readCrontab);
app.get('/ajax_appareil/*',majax.cmdx10_app);
app.get('/ajax_lampe/*',majax.cmdx10_lmp);
app.get('/piece/:id',routes.lirepiece);
app.get('/scenari',mscene.index);
app.get('/scenari/:id',mscene.jouer);
app.get('/scenari/voir/:id',mscene.voir); //voir le contenu d'un scenario
app.get('/led/:etat',routes.led); //affichage dune led etat = 0 ou 1
app.get('/devices/',domoticz.liredevices);
app.get('/devices/ask',domoticz.index);

var httpServeur = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  
});


//:::::::::::::   gestion des sockets  :::::::::::::
var io = require ('socket.io').listen(httpServeur, {log : false});
var messages = [];
var maxMess = 10;

io.sockets.on('connection', function (socket){
	console.log('=> io : connection client');
	
	var me;
	// on affiches les anciens messages pour les new users
	for (var k in messages){
		socket.emit('repserv', messages[k]);
    console.log('***** '+messages[k].message);
	}
	
	
	/**
	*   je me connecte
	*/
	socket.on('login',function(user){
		console.log(user);
		me = user;
		me.name = user.name;
		io.sockets.emit('replogin',{repMessage : 'login accepté'});
	});
	
	/***
	*  On a recu un messsage
	*/
  socket.on('messclient', function (messcli){
  	//console.log('+1 '+messcli.message);
  	messcli.user = me;
  	date = new Date();
  	messcli.h = date.getHours();
  	messcli.m = date.getMinutes();
  	
  	messages.push(messcli);
  	if (messages.lenght > maxMess ) {
  		messages.shift();
  	}
    io.sockets.emit('repserv',messcli); // on retourn le mess à ts les clients
  });
});

