var url = require ('url');
var querystring = require ('querystring');

exports.myajax = function(req,res){
	var params = querystring.parse(url.parse(req.url).query);
	console.log('<- name: '+params['name']);
	console.log('<- type: '+params['typebtn']);
	res.send('<h1> ceci est un test ajax'+params['name']+' - '+params['typebtn']+'</h1>');
}

  /**
  * Execute un ordre X via Mochad
  * exemple : http://192.168.0.70:3000/ajax/index?name=M12&typebtn=ON
  * ordre = [on | off]  all_lights_on  |  all_lights_off  |  all_units_off
  * bright 0 à 31 |  dim 0 à 30  | 
  */
  exports.cmdx10_app = function(req,res){
  // Recupere les param de l URL
	var params = querystring.parse(url.parse(req.url).query);
  var nomBtn = params['name']; //nom btn => M10, M9 etc...
  var typeBtn =  params['typebtn'];// Typebtn =  ON | OFF
  var typeOut = params['sortie'];// => y/n , y=send page html,  n=> send txt
  
	console.log('<-  name: '+nomBtn+ '  - type: '+params['typebtn'] ); 
	 
   // execution du script shell
  var sys = require('sys');
  var exec = require('child_process').exec;
  var child;

  //exec ls
  child = exec('echo pl "'+nomBtn+' '+typeBtn+' " | nc localhost 1099', function (error, stdout, stderr){
  sys.print('stdout: '+stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {  
      console.log('->  !**! exec error: '+ error); 
  } else {
      console.log('->  exec ok: '); 
      if (typeOut !== null) {
          res.send(stdout); // via page html
      } else {
          res.send('okx10') // via client http divers
      }
  }
  
  });
 
}

  /**
  * Execute un ordre X via Mochad
  * exemple : http://192.168.0.70:3000/ajax/index?name=M12&typebtn=ON
  * ordre = [on | off]  all_lights_on  |  all_lights_off  |  all_units_off
  * bright 0 à 31 |  dim 0 à 30  | 
  */
  exports.cmdx10_lmp = function(req,res){
  // Recupere les param de l URL
	var params = querystring.parse(url.parse(req.url).query);
  var nomBtn = params['name']; //nom btn => M10, M9 etc...
  var typeBtn =  params['typebtn'];// Typebtn =  ON | OFF
  var dimLampe =  params['dimLampe'];// Dim 0..31
  var typeOut = params['sortie'];// => y/n , y=send page html,  n=> send txt
  var laCde;
  
  if (nomBtn=='all') {
	  	laCde = 'echo PL " M all_light_off " | nc localhost 1099';
	} else {
      if(typeof (dimLampe) !='undefined'){
        laCde = 'echo pl "'+nomBtn+' DIM '+dimLampe+' " | nc localhost 1099'; //intensite
      } else {
        laCde = 'echo pl "'+nomBtn+' '+typeBtn+' " | nc localhost 1099';
      }
	}
	
	console.log('<-  '+laCde ); 
	 
   // execution du script shell
  var sys = require('sys');
  var exec = require('child_process').exec;
  var child;

  //exec ls
  child = exec(laCde, function (error, stdout, stderr){
  sys.print('stdout: '+stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {  
      console.log('->  !**! exec error: '+ error); 
  } else {
      console.log('->  exec ok: '); 
      if (typeOut !== null) {
          res.send(stdout); // via page html
      } else {
          res.send('okx10') // via client http divers
      }
  }
  
  });
 
}

