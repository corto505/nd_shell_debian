/**
* Lit le fichier json !  liste des modules p/ piece
*/
function readContent (myFile,callback){
	var fs = require ('fs');
  
	console.log('-  Verification du fichier =>'+myFile);
  
	if (fs.existsSync(myFile)){
		console.log('-  lecture du fichier');
    
		fs.readFile(myFile, 'utf8',function(err, content){
			if (err) return callback(err)
			callback(null, content)
		})
	} else {console.log('*!!* Erreur de fichier'); }
};


exports.index2 = function(req,res){
	console.log('Entrer dans scenari ');
	
	  res.render('menu', { title: 'Piece' });
};


/**************************************
*  Retoune la liste des fichiers du 
*   dossier /public/scenari
*  dans pas web => {liste[{file : "name1"}, {file : "name_2}...}]
**************************************/
exports.index = function (req ,res ) {
	var fs = require ('fs');
	var util = require ('util');
	var config = require ('./config.js').settings;
	var folderScenari = config.sceneFolder; 
	var scenariObjet = {
		liste : []
	};
	//var scenariTab = new array();
	
	fs.readdir (folderScenari, function (error , directoryObject){
		for(var i in directoryObject){
			console.log ('file => '+directoryObject[i]);
			scenariObjet.liste.push ({
					name : directoryObject[i].substr(0,directoryObject[i].indexOf('-')),
					file : directoryObject[i].replace('.json','')
				});
		}
		
	//	console.log ('json => '+util.inspect(scenariObjet.liste,false,null));
		res.render('scenari_list', { directoryObject: scenariObjet.liste });
	});
	
};


/**************************
*  Joue le scenarion de demande
*  via le fichier (nom passe ds l'url)')
***************************/
exports.jouer = function(req,res){
  var url = require('url');
  var laCommande ;
  
  var config = require ('./config.js').settings;
	var folderScenari = config.sceneFolder; 
	var myFile = folderScenari+req.params.id+".json";
  var tps;
  
   // declaration execution du script shell
      var sys = require('sys');
      var exec = require('child_process').exec;
      var child;
      
      
  // lecture et traitement du fichier
  readContent( myFile,function (err,content) {
      console.log('<-  Url '+url.parse(req.url).pathname);
      
      laCommande = JSON.parse(content);

      console.log("-  ",laCommande);
      
     for (var i in laCommande){
         var item = laCommande[i];
         console.log("->  ",item.cde);
          //exec ls
         child = exec(item.cde, function (error, stdout, stderr){
            sys.print('stdout: '+stdout);
            sys.print('stderr: ' + stderr);
         });
         
         tps = setTimeout("",1000);
      };
  });
  
  clearTimeout(tps);
  
  res.writeHead(302, {
      'Location': '../scenari'
       //add other headers here...
  });
  res.end();
  
};


/**************************
*  Affiche le contenu d'un scenario
* 
*  via le fichier (nom passe ds l'url)')
***************************/
exports.voir = function(req,res){
  var url = require('url');
  
  var config = require ('./config.js').settings;
  var folderScenari = config.sceneFolder; 
  var myFile = folderScenari+req.params.id+".json";

  // lecture et traitement du fichier
  readContent( myFile,function (err,content) {
      console.log('<-  file '+myFile);
      
      leScenario = JSON.parse(content);

      console.log("-  ",leScenario);
      
     res.render('scenario', { scenarioObject: leScenario, titre : 'Contenu scénario '+req.params.id });
  });
  
};
