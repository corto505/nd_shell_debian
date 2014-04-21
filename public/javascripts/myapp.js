//:::::::::::   ANGULAR  :::::::::::::::::
var app = angular.module('domo',[]);

//  page index  Gestion des thermo
app.controller('ctrlThermo', function ($scope,$http){
  
  /**   Lecture des thermo via Domoticz  **/
  $http.get('/devices/temp')
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
  $http.get('/tdb')
    .success (function(data){
	   $scope.lesBouttons  = data;  
    })
    .error(function(data){
	//$scope.prime = "erreur ";
    });

});

// page all_module
app.controller('ctrlModule', function ($scope,$http){
  
  /**   Lecture fichier json pour les bouttons  **/
  $http.get('/devices/listeinter')
    .success (function(data){
	
	//console.log('===>  Controler');
	   $scope.listeModules  = data;
	   
    })
    .error(function(data){
	//$scope.prime = "erreur ";
    });

});

//:::::::::::::  JQUERY :::::::::::::::::
$(document).ready( function() {

    //:::::::              EVENT ON CLICK                 :::::::
     
     //----    affiche la div Menu -----
    $('#btnMenu').click(function (){
          $('.tabxxx').fadeOut('slow', function (){
                $('#tabMenu').fadeIn();
            });
    });
   
   //-----    affiche la div Meteo  ------
   $('#btnMeteo').click(function (){
          $('.tabxxx').fadeOut('slow', function (){
                $('#tabMeto').fadeIn();
            });
    });
   //-----    affiche la div Horloge  ------
   $('#btnClock').click(function (){
          $('.tabxxx').fadeOut('slow', function (){
                $('#tabClock').fadeIn();
            });
    });
   
    $( ".trigger" ).on( "click", function() {
	$( ".result" ).load( "ajax/test.jade" );
    });

 
    // ********   Test de bouton  ***********
    $('#btnd').click(function(){
       var name = $(this).attr('name');
       var typebtn = $(this).attr('typebtn');

       alert(name+" - "+typebtn);
    });


    //*******   Ajax : Btn ON|OFF  bouton module **********
    $(".btn_appareil").click( function() {
    
       //alert('This is a custom alert box', 'Alert Dialog');
        var name = $(this).attr('name');
        var typebtn = $(this).attr('typebtn');
          //alert(name+" - "+typebtn);
        $.ajax({
          type: "GET",
              url: "/ajax_appareil/index?name="+name+"&typebtn="+typebtn,
          error:function(msg){
           alert( "Error !: " + msg );
          },
          success:function(data){
              //affiche le contenu du fichier dans le conteneur dédié
              $('#retour').text(data);
              socket.emit('messclient',{message : 'app = '+name+' -> '+typebtn}); // on envoi un mess au serveur IO
          }
        });


    });

  //*******   Ajax : Btn ON|OFF  bouton module **********
    $(".btn_lampe").click( function() {
    
       //alert('This is a custom alert box', 'Alert Dialog');
        var name = $(this).attr('name');
        var typebtn = $(this).attr('typebtn');
          //alert(name+" - "+typebtn);
        $.ajax({
          type: "GET",
              url: "/ajax_lampe/index?name="+name+"&typebtn="+typebtn,
          error:function(msg){
           alert( "Error !: " + msg );
          },
          success:function(data){
              //affiche le contenu du fichier dans le conteneur dédié
              $('#retour').text(data);
              socket.emit('messclient',{message : 'lmp = '+name+' -> '+typebtn}); // on envoi un mess au serveur IO
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