//::::::::::::::::::::   Handler   ::::::::::::::::::::::
var wlog = require('../routes/wlog');
var url = require('url');
var toolfile = require ('../routes/toolfile'); // module perso lecture d'un fichier


//::::::::::::::::::::   Handler   ::::::::::::::::::::::

/****************************************
 * GET home page. (Thermo , TDB , Horloge)
 * Thermo se fait via ANGULAR, horloge plug JS,
 * TDB lecture fichier Json
 *****************************************/
exports.index = function(req, res){
  res.render('menu', { title: 'Piece' });
 };

// affiche le tableau de bord => contenu = angular

exports.affichetdb = function(req, res){
	console.log(' affiche le tablea de bord');
   res.render('tdb', { title: 'Tableau debord' });
 };
 
 
/**************************
* Affiche les boutons du tableau de bord
* à partir d'un fichier /public/json => Traite par ANGULAR
*  routes  = /tdb
***************************/
exports.lireBtnTdb = function(req,res){
	var config = require('./config.js').settings;
	var myFile = config.files.fileTdb;
	
	toolfile.readContent(myFile, function(err,content){
	
		lesBtn = JSON.parse(content);
		//console.log(' Boutton => '+lesBtn);
		
		res.json(lesBtn);	  
	});
	
}

/**************************
* Appel la page Gestion des modules par pieces
* PARAM / nom_de_lapiece
* routes /piece/:nom
***************************/
exports.lirepiece = function(req,res){
	var paramid = req.params.nom;
	
	if (paramid =='all'){
		paramid='';
		//console.log('==> param '+paramid);
		res.render('modules_all', { nomPiece:paramid });
	}else{
		res.render('modules', { nomPiece:paramid });
	}
	
};

//::::::::::::::::::::   *** TEST  ****   Handler   ::::::::::::::::::::::

/**
 * Test : affiche la page index.
 */
exports.test = function(req, res){

	res.send('Module test');

  //res.render('slider', { title: 'Les pièces' });
};

/**
 *  gestion de led viad http
 *
 ***/
exports.led = function (req,res){
	var gpio = require ("pi-gpio");
	var etat = parseInt(req.params.etat);
	
	gpio.open(7,"output", function(err){
		gpio.write(7,etat,function(){
			console.log('commande envoyée :'+etat);
			gpio.close(7);
		});
	});
	res.send('requete envoyée');
};

/**
*  Gestion des relai via un mcp23017
* PB declanche un relay direct avec le new le set et get je ne vois pas
$ comment passer le N° du relay
*/
exports.relay = function (req,res){
	var mcp23017 = require ("mcp23017");
	var adresse = 0x20;
	var mcp = new mcp23017(adresse,'/dev/i2c-1');

	mcp.setGpioAPinValue(0,1);
	mcp.setGpioAPinValue(0,0);

	console.log(mcp.getGpioBPinValue(0));
	res.send('requete envoyée');
}

/**
*  Autre essai  avec i2C ?? result toujuos vide ?
*/
exports.relay2 = function (req,res){

	var rasp2c = require("rasp2c");
	//dectect device
	rasp2c.detect(function (err,result){
		if (err){
			 console.log("err : detect 2c");
		}else{
			console.log('detect : ok');

			console.log(result);
		}
	});

	rasp2c.dump('0x20','0x11-0x15',function (err,result){
		if (err){
			 console.log("err : dump 2c");
		}else{
			console.log('dump : ok');

			console.log(result);
		}
	});

	rasp2c.set('0x20','0x14','OxFD',function (err,result){
		if (err){
			 console.log("err : set 2c");
		}else{
			console.log('set : ok');

			console.log(result);
		}
	});
	res.send('requete envoyée');
}

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

