//::::::::::::::::::::   Handler   ::::::::::::::::::::::
var wlog = require('../routes/wlog'); // module perso creation d'un lod
var url = require('url');
var toolfile = require ('../routes/toolfile'); // module perso lecture d'un fichier

//::::::::::::::::::::   Handler   ::::::::::::::::::::::

/**
 * GET home page.
 */
exports.index = function(req, res){
  var http = require ('http');
  
  var options = {
    host: '192.168.0.66',
    port: 8080,
    path: '/json.htm?type=devices&rid=3',
    method: 'GET',
    headers:{
      accept: 'application/json'
    }
    };
    
  //curl http://192.168.0.66:8080/json.htm?type=devices&rid=3
var req =   http.request(options, function(response){
 //   res.send(lesmodules);
    response.on('data',function(chunk){
        console.log('BODY'+chunk);
    });
  }).on('error', function(e){
    console.log('erreur = '+e.message);
  });
  
  // write data to request body
req.end();

 };



/**
* Affiche les modules d'une pieces
*/
exports.liredevices = function(req,res){
  	var config = require ('./config.js').settings;
	var myFile = config.fileDevices; //'./public/json/pieces.json';

    toolfile.readContent(myFile, function (err,content) {
	console.log('<-  Url '+url.parse(req.url).pathname);
	
	lesModules = JSON.parse(content);
	myobj = lesModules.result;
//	console.log("=>  ",myobj[0],'=========================');
	
	//for (item in myobj){
	//	console.log('- ',myobj[item].Name);
	//}
	
  wlog.writeLog(req.params.id,function(err){});
  
   //res.send(lesModules.result);
   res.render('devices_all', { modules: myobj, type_piece : 'Liste modules domotics'});
})
};
