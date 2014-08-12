/***
*  Test exec script shell avec retour page html
*/
function execShell (myScript,callback){
  var sys = require('sys');
  var exec = require('child_process').exec;
  var child;

   console.log(' -------- '+myScript);
  //exec ls
  child = exec(myScript, function (error, stdout, stderr){   // ps aux   - "vnstat -d"
  //sys.print('stdout: '+stdout);
  //sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('!****!  exec error: '+ error); 
    return callback(stderr);
  }
  callback(null,stdout);
  });
};

exports.vnstat = function (req,res){
    var ordre = req.params.id;
    var myScript = 'xx';

    switch (ordre) {
      case 'heure':
        myScript = 'i2cdetect -y 1'; //vnstat -h';
        break;
      case 'jour':
        myScript = 'vnstat -d';
        break;
      case 'mois':
        myScript = 'vnstat -m';
        break;
      case 'semaine':
        myScript = 'vnstat -w';
        break;
      case 'short':
        myScript = 'vnstat -s';
        break;
      case 'home':
        myScript = '';
        break;
      case 'cron':
        myScript = 'crontab -l';
        break;
      case 'gpio':
        myScript = 'gpio readall';
        break;
      case 'dd':
        myScript = 'df -h';
        break;
      default:
       myScript = 'xx';
        break;
    }
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    if (myScript !='xx'){
           execShell(myScript, function (err,content) {
       console.log(content);
      // res.render('vnstat',{states: content,title:'vnstat '+ordre}); 
       res.send(content);
    });
    } else
      res.render('vnstat',{title:'vnstat '+ordre}); 
   
    

};

/**
*  Activation des relais
*
*/

exports.test = function (req,res){
  var idRelay = req.params.id;
  var rang = '0X14'; // rangee de relais

  if(idRelay >=9){
      rang = '0X15';
      idRelay = idRelay - 8;
  }
  if (idRelay > 1){
       idRelay = 1 << (idRelay-1);
  }

  console.log('id => '+idRelay);
  var code = 255 ^ idRelay; 

  execShell("i2cset -y 1 0x20 "+rang+" 0x"+code.toString(16), function (err,content){
        console.log(content);

  });

   
  setTimeout(function(){
      execShell("i2cset -y 1 0x20 "+rang+" 0xFF", function (err,content){
        console.log(content);
      });
  },2000);


  

};