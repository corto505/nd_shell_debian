//::::::::::::::::::::   Handler   ::::::::::::::::::::::
var wlog = require('../routes/wlog'); // module perso creation d'un lod
var url = require('url');
var toolfile = require ('../routes/toolfile'); // module perso lecture d'un fichier

//::::::::::::::::::::   Handler   ::::::::::::::::::::::

/************************************************
 * GET home page.
 ***********************************************/
exports.index = function(req, res){
  
      // res.render('menu');
    requete_http('/json.htm?type=status-temp',function(chunk){
      res.json(JSON.parse(chunk));
    })
    
  };
 
 
/************************************************
 * execut une requte HTTP sur le sserveur Domoticz
 ***********************************************/
function requete_http (url,callback){
  
  var http = require ('http');
  var config = require ('./config.js').settings;
  
  var options = {
    host: config.domoticz.host,
    port: config.domoticz.port,
    path: url,
    method: config.domoticz.method,
    headers:{
      accept: 'application/json'
    }
    };
    
  //curl http://192.168.0.66:8080/json.htm?type=devices&rid=3
  var req = http.request(options, function(response){
	response.on('data',function(chunk){
	  console.log('BODY'+chunk);
	  callback(chunk);
	});
	
  }).on('error', function(e){
	console.log('erreur = '+e.message);
	return callback;
  });
  
 req.end();
  
}

/************************************************
* Affiche les modules d'une pieces
***********************************************/
exports.liredevices = function(req,res){
    var config = require ('./config.js').settings;
    var myFile = config.files.fileDevices; //'./public/json/pieces.json';

    toolfile.readContent(myFile, function (err,content) {
	console.log('<-  Url '+url.parse(req.url).pathname);
	    
	lesModules = JSON.parse(content);
	myobj = lesModules.result;
	//console.log("=>  ",myobj[0],'=========================');
	    
	//for (item in myobj){
	  //console.log('- ',myobj[item].Name);
	//}
	    
	wlog.writeLog(req.params.id,function(err){});
   
    
      //res.send(lesModules.result);
      res.render('devices_all', {
	 modules: myobj,
	 type_piece : 'Liste modules domotics',
	 lettreHouse : config.lettreHouse
	 
       });
     });

};


/***********************************************
* Creer un nouveau fichier json au format perso
* X10 ˆ partir d'un flux domoticz
***********************************************/
exports.updatedevices = function(req,res){
  var fs = require ('fs');
  var config = require ('./config.js').settings;
  var myFile = config.files.fileDevices; //'./public/json/pieces.json';
  var myFileConvert = config.files.fileDevicesNode; //'./public/json/pieces.json';
  var module = {};
  var separe ='';
  
  toolfile.readContent(myFile, function (err,content) { //On recupere les infos de domoticz
  console.log('<-  Url '+url.parse(req.url).pathname);
    
  var lesModules = JSON.parse(content);
  myobj = lesModules.result;
    
      var stream = fs.createWriteStream(myFileConvert);
       stream.write('['); 
      for (item in myobj){
	  
	  if (myobj[item].Used=1 ) {      
	    module.piece = 'RfxCom';
	    module.nom = myobj[item].Name;
	    module.actif = 'oui';
	    
	    if(myobj[item].SwitchType=='Dimmer')
	      module.type_module='lampe'
	    else
	      module.type_module = 'appareil'
	      
	    if(myobj[item].SubType=='X10')
	      module.code = config.lettreHouse+myobj[item].Unit
	    else
	       module.code = myobj[item].Unit
	  }
	  
	  stream.write(separe+JSON.stringify(module));
	  separe = ',\n';
	//console.log(module);
	  // moduleUse.push(JSON.stringify(moduleUse));
	 // console.log('T => '+JSON.stringify(moduleUse));
      }
      stream.write(']');
      stream.end();
    });
   

    res.send('ok');
    //res.render('devices_all', {
     // modules: myobj,
      //type_piece : 'Liste modules domotics',
      //lettreHouse : config.lettreHouse,
    //});
 // });
};
