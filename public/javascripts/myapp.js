$( ".trigger" ).on( "click", function() {
    $( ".result" ).load( "ajax/test.jade" );
});

$(document).ready( function() {

  	var socket = io.connect('http://192.168.101.70:3000');// voir egalement Layout.jade

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
    
//***********  SLIDER (Annuler)  **************

//$('.my-input').bind("slider:changed", function (event,data){
//	$('#output').html(parseInt(data.value.toFixed(3)*31));
	//alert(data.value);
//});

//***********  MENU PUSH LEFT  **************

$('#simple-menu').sidr();	
	
	
// *********  Test de socket  ************
	$(document).ready( logAuChargement());
  
  function logAuChargement(){
    socket.emit('login',{name : 'sarah'});
  };
  
  //Btn login de la barre de menu
	$('#btnlogin').click(function (event){ // envoi client
	alert('send login');
	//	socket.emit('login',{name : 'sarah'});
	});
  // reponse du serveur 
  socket.on('replogin',function(mess){ //reponse serveur
  	//alert('retour du serveur: '+mess);
  });
  
   // reponse serveur message_client  ex : cmd X10
	socket.on('repserv',function(mess){ //reponse serveur
			
		var pipo = JSON.stringify(mess);
		//alert('retour du serveur');
    var tmplt = $('#tmplt').html();
    $('tmplt').remove();
    
    $('.zlog').append(tmplt.replace('xxxxx',mess.h+':'+mess.m+'   '+mess.message+' ('+mess.user.name+')'));
		//$('#retourio').text(mess.repMessage);
	});

});