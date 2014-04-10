//::::::::::::::::::::   Handler   ::::::::::::::::::::::
var wlog = require('../routes/wlog');
var url = require('url');
var toolfile = require ('../routes/toolfile'); // module perso lecture d'un fichier


//::::::::::::::::::::   Handler   ::::::::::::::::::::::

/****************
 * GET home page.
 ***************/
exports.index = function(req, res){
 // wlog.writeLog('Acces menu',function(err){ console.log('=> ecrit log ');  });
  res.render('menu', { title: 'Piece' });
 };

/****************
*  Affiche une page avec une horloge
*****************/
exports.horloge = function (req,res){
  res.render('horloge');
};


/**************************
* Affiche les modules d'une pieces
***************************/
exports.lirepiece = function(req,res){
	var config = require ('./config.js').settings;
	var myFile = ''
	var paramid = req.params.id;
	
	console.log(' param => '+paramid);
	
	if (paramid=='dmtcz') {
		myFile = config.files.fileDevicesNode; //'./public/json/pieces.json';
	}else
		myFile = config.files.filePieces; //'./public/json/pieces.json';
		
	toolfile.readContent( myFile,function (err,content) {
		console.log('<-  Url '+url.parse(req.url).pathname);
		
		lesModules = JSON.parse(content);
	
		//console.log("conent : \n  ",lesModules);
		wlog.writeLog(req.params.id,function(err){});
	  
	   if ((paramid == 'all') || (paramid=='dmtcz') ){
		res.render('modules_all', { modules: lesModules, type_piece : 'all', title:req.params.id });
	    } else {
		res.render('modules', { modules: lesModules, type_piece : req.params.id, title:req.params.id });
	  }
})
	
};

//::::::::::::::::::::   *** TEST  ****   Handler   ::::::::::::::::::::::

/**
 * Test : affiche la page index.
 */
exports.test = function(req, res){
  res.render('slider', { title: 'Les pièces' });
};

/**
 *  gestion de led viad http
 *
 ***/
exports.led = function (req,res){
	var gpio = require ("pi-gpio");
	var etat = parseInt(req.params.etat);
	
	gpio.open(11,"output", function(err){
		gpio.write(11,etat,function(){
			console.log('commande envoyée :'+etat);
			gpio.close(11);
		});
	});
	res.send('requete envoyée');
};
/**
*  Test tableau json 
*/
exports.index2 = function (req,res){
  var personnes = [
	{name:'Shuriken',price:100},
	{name:'Ashiko',price:690},
	{name:'Chigiriki',price:250},
	{name:'Naginata',price:900},
	{name:'Katana',price:1000},
];
  console.log(personnes);
  res.render('modules',{personnes:personnes});
  
};

