$(document).ready(function() {

			//$('#my-input').bind("slider:changed", function (event,data){
			//	$('#output').html(parseInt(data.value.toFixed(3)*31));
				//alert(data.value);
			//});
	

$('#simple-menu').sidr();
	

});


function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}
