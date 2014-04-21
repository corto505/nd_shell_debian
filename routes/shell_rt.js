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
        myScript = 'vnstat -h';
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
      default:
       myScript = 'xx';
        break;
    }
    
    if (myScript !='xx'){
           execShell(myScript, function (err,content) {
       // console.log(content);
      // res.render('vnstat',{states: content,title:'vnstat '+ordre}); 
       res.send(content);
    });
    } else
      res.render('vnstat',{title:'vnstat '+ordre}); 
   
    

};


exports.test = function (req,res){
  var sys = require('sys');
  var exec = require('child_process').exec;
  var child;

  //exec ls
  child = exec("vnstat -d", function (error, stdout, stderr){   // ps aux
  sys.print('stdout: '+stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: '+ error); 
  }
  res.render('index',{states: stdout}); 
  });
};