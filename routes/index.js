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
 // wlog.writeLog('Acces menu',function(err){ console.log('=> ecrit log ');  });
  res.render('menu', { title: 'Piece' });
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
	console.log(' Boutton => '+lesBtn);
		
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
	
	res.render('modules_all', { title:req.params.id });
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

