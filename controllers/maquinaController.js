"use strict";

app.controller("maquinaController", function ($scope, $location, dbService){
  $scope.regexMac = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  $scope.listarMaquinas = function(){
    dbService.all(function(err, doc){
      if(err) throw err;
      $scope.maquinas = doc;
      $scope.$apply();
    });
  }
  $scope.salvar = function(){
    if($scope.maquina.id){
      var id = $scope.maquina.id;
      var alt = angular.copy($scope.maquina);
      delete alt.id;
      delete alt.$$hashKey;
      dbService.put(id, alt, function(err){
        if(err) throw err;
        console.log("Atualizado: "+id);
        $scope.listarMaquinas();
      });
    }else{
      dbService.post($scope.maquina, function(err, id){
        if(err) throw err;
        console.log("Salvo sob id: "+ id);
        $scope.listarMaquinas();
      });
    }
    $scope.maquina = {};
    $("#modalMaquina").modal("hide");
  }
  $scope.editar = function(maquina){
    $scope.maquina = maquina;
    $("#modalMaquina").modal("show");
  }
  $scope.excluir = function(maquina){
    bootbox.dialog({
      message: "Tem certeza que deseja remover a máquina "+maquina.numero+"?",
      title: "Atenção!!!",
      buttons: {
        sim: {
          label: "Sim",
          className: "btn-primary",
          callback: function() {
            dbService.delete(maquina.id, function(err){
              if(err) throw err;
              console.log("Apagado com sucesso: "+maquina.id);
              $scope.listarMaquinas();
            });
          }
        },
        nao: {
          label: "Não",
          className: "btn-danger",
          callback: function() {
            return;
          }
        }
      }
    });
  }
});
