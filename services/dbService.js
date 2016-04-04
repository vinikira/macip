'USE STRICT';
app.factory("dbService", function($http){
  var fs = require("fs");
  var caminho = process.env.HOME|| process.env.USERPROFILE;
  fs.existsSync(caminho+"/.macip") || fs.mkdirSync(caminho+"/.macip");
  var connection = connection = new(require('nosqlite').Connection)(caminho+"/.macip");
  var db = connection.database("database");
  db.exists(function (exists) {
    if (!exists) {
      console.log("n existe");
      db.create(function(err){
        if(err) console.log(err);
      });
    }
  });
  return db;
});
