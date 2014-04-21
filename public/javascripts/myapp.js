//:::::::::::   ANGULAR  :::::::::::::::::
var app = angular.module('domo',[]);

//  page index  Gestion des thermo
app.controller('ctrlThermo', function ($scope,$http){
  
  /**   Lecture des thermo via Domoticz  **/
  $http.get('/devices')
    .success (function(data){
	   $scope.meteo  = data.result;  
   })
    .error(function(data){
	$scope.prime = "erreur ";
    });

});

//    Page index  gestion des boutons
app.controller('ctrlBtn', function ($scope,$http){
  
  /**   Lecture fichier json pour les bouttons  **/
  $http.get('/lesbouttons')
    .success (function(data){
	   $scope.lesBouttons  = data;  
    })
    .error(function(data){
	//$scope.prime = "erreur ";
    });
    
    
});

// page all_module
app.controller('ctrlModule', function ($scope,$http,filterFilter){
  
  /**   Lecture fichier json pour les bouttons  **/
  $http.get('/devices/listeinter')
    .success (function(data){
	
	//console.log('===>  Controler'+$scope.nomPiece);
	   $scope.listeModules  = filterFilter(data,{Name : $scope.nomPiece} );
	   
    })
    .error(function(data){
	//$scope.prime = "erreur ";
    });
    
    /*xxxxxxxxxxxxxxxx*/
    $scope.pipo = function(code){
	console.log('===> On a clique: '+code);
	
	/**   Lecture des thermo via Domoticz  **/
  $http.get('/devices/sendcde/11/Off')
    .success (function(data){
	 console.log('===> commande envoyee'+JSON.parse(data));  
   })
    .error(function(data){
	$scope.prime = "erreur ";
    });
    
    };

});

//:::::::::::::  JQUERY :::::::::::::::::
$(document).ready( function() {

    //:::::::              EVENT ON CLICK                 :::::::
     
     
   //-----    affiche la div Meteo  ------
   $('#btnMeteo').click(function (){
          $('#tabClock').fadeOut('slow', function (){
                $('#tabMeto').fadeIn();
            });
    });
   //-----    affiche la div Horloge  ------
   $('#btnClock').click(function (){
          $('#tabMeto').fadeOut('slow', function (){
                $('#tabClock').fadeIn();
            });
    });
   
 
    // ********   Test de bouton  ***********
    
    $( ".trigger" ).on( "click", function() {
	$( ".result" ).load( "ajax/test.jade" );
    });
    
    $('#btnd').click(function(){
       var name = $(this).attr('name');
       var typebtn = $(this).attr('typebtn');

       alert(name+" - "+typebtn);
    });


    //*******   Ajax : Btn ON|OFF  bouton module **********
    $(".btn_appareil").click( function() {
    
       alert('This is a custom alert box', 'Alert Dialog');
        var idbtn = $(this).attr('name');
        var typebtn = $(this).attr('typebtn');
          //alert(name+" - "+typebtn);
        $.ajax({
          type: "GET",
              url: "http://192.168.0.66:8080/json.htm?type=command&param=switchlight&"+idbtn+"=9&switchcmd="+typebtn+"&level=0",
          error:function(msg){
           alert( "Error !: " + msg );
          },
          success:function(data){
              //affiche le contenu du fichier dans le conteneur dédié
              $('#retour').text(data);
            //  socket.emit('messclient',{message : 'app = '+name+' -> '+typebtn}); // on envoi un mess au serveur IO
          }
        });


    });


//*******   Ajax : Btn vnstat **********
    $(".btnStat").click( function() {
    
       //alert('This is a custom alert box', 'Alert Dialog');
        var name = $(this).attr('name');
        $.ajax({
          type: "GET",
              url: "/vnstat/"+name,
          error:function(msg){
           alert( "Error !: " + msg );
          },
          success:function(data){
              //affiche le contenu du fichier dans le conteneur dédié
              $('#retour').text(data);
          }
        });


    });
    
    
     //------- CALENDRIER  ---------
   var madate = new Date();
   var nomDesJours = new Array('dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi');
   var indicejour = madate.getDay();
   var lejour = madate.getDate();
 
   $('#jour').html(lejour);
   $('#mois').html(nomDesJours[indicejour]);


//***********  MENU PUSH LEFT  **************

$('#simple-menu').sidr();	
	
	


});