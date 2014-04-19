exports.settings = 
{
	files: 
	{	
		filePieces : './public/json/pieces.json',
		logFile	   : '/public/logApp.log',
		sceneFolder : './public/scenari/',
		fileDevices : './public/json/devices.json',
		fileDevicesNode : './public/json/devices_node.json'
	}
		,
	domoticz : {
	
		host : "192.168.0.66",
		port : 8080,
		Method : 'GET'
	},
	lettreHouse : 'M'
	
}