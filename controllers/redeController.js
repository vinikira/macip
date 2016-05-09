'use strict';
var holymac = require('holymac');
var cmd = require('cmd-exec').init();

app.controller("redeController", function($scope, $location, dbService) {
  $scope.escanearRede = function() {
      $("#modalLoad").modal("show");
      dbService.all(function(err, maqs) {
        holymac.all(function(err, data) {
        if (err) console.log(err);
        data.forEach(function(val) {
          maqs.forEach(function(val2) {
            if (val.mac === val2.mac) {
              val2.ip = val.ip;
              return false;
            }
          });
        });
        $scope.maquinas = maqs;
        $scope.$apply();
        $("#modalLoad").modal("hide");
      });
    });
  }
  $scope.acessarPc = function(maquina, viewOnly) {
    var os = process.platform;
    var comando = '';
    if (/linux/i.test(os)) {
      var op = viewOnly ? '-viewonly' : '';
      comando = 'vncviewer ' + op + ' ' + maquina.ip;
    } else if (/win/i.test(os)) {
      var op = viewOnly ? '-viewOnly="yes"' : '';
      comando = 'cd %ProgramFiles%\\TightVNC && tvnviewer.exe ' + op + ' ' + maquina.ip;
    }
    cmd.exec(comando, function(err, res) {
      if (err) console.log(err);
    });
  }
});
