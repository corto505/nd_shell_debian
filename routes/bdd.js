var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('modules.sqlite3');

var creates_modules =" CREATES TABLE IF NOT EXISTS modules (id_module INT primary key,name varchar(30),Type_module varchar(21), description TEXT);",
    get_modules = "SELECT name, type_module, description from modules ORDER BY name",
    add_module = "INSERT INTO modules (id_module, name, type_modules,description) VALUES (?,0)",
    toggle_module = "UPDATE modules SET name=? WHERE id_module=?" ;

 db.run(create_modules);
 
exports.add = function (req,res){

  u = url.parse(req.url, true);
  
  db.run(add_module,u.query['name']);
  db.get("SELECT las_insert_rowid() as id", function(err,row){
   // res.end(u.query['callback']);
    console.log('New modules: '+u.query['name']);
  });
};


exports.liste = function(){
  
  res.write(u.query['callback']  + '(');
  
  var lesModules = {"modules" : []};
  db.each(get_modules,
    function(err,row){
      lesModules['modules'].push({'id' : row.id_modules, 'name' : row.name, 'type_module' : row.type_module 'description' : row.description });
    }, function (){
      res.end (JSON.stringify(lesModules) + ')');
    }
  );
};