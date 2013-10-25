function Init() {

    if (window.localStorage.getItem("key")) {
        document.all.TextToSave.value = window.localStorage.getItem("key");
    }
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    document.addEventListener("deviceready", onDeviceReady, true);
}
function InitSecondPage() {
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("deviceready", onDeviceReadySecondPage, true);

}
function onDeviceReady() {
    document.addEventListener("backbutton", BackKeyDown, true);
}
function onDeviceReadySecondPage() {

    var StatoCon = document.getElementById('ConnectionStatus');

    document.addEventListener("backbutton", BackKeyDownSecondPage, true);

    if (checkConnection()) {
        StatoCon.style.backgroundColor = "green";

        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';

        StatoCon.innerHTML = states[networkState];
    }
    else {
        StatoCon.style.backgroundColor = "red";
        StatoCon.innerHTML = "Dispositivo offline";
    }

    
}

function BackKeyDownSecondPage() {
    doRedirectLocale('index.html')
    //navigator.app.exitApp();  // For Exit Application
}

function BackKeyDown() {
    ShowExitConfirm();
    //navigator.app.exitApp();  // For Exit Application
}
/****************************************************************/
/*                        GENERIC                               */
/****************************************************************/
function doRedirect() {

    if (document.all.sito.value == "")
        alert('Attenzione!inserire prima un URL!');
    else {
        if (checkConnection())
            Redirect(document.all.sito.value);
        else
            alert('Impossibile!Dispositivo OFFLINE!');
    }
}
function doRedirectLocale(URLPage) {
        RedirectLocale(URLPage);
}
/****************************************************************/
/*                        REDIRECT                              */
/****************************************************************/
function Redirect(URLName) {
    location.href = "http://" + URLName;
}
function RedirectLocale(PageName) {
    //location.href = PageName;
    window.location = PageName;
}
/****************************************************************/
/*                        INAPPBROWSER                          */
/****************************************************************/
function doRedirectToPage() {
var ref = window.open('http://apache.org', '_blank', 'location=yes');
         ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
         ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
         ref.addEventListener('exit', function(event) { alert(event.type); });
}
/****************************************************************/
/*                        SPLASHSCREEN                          */
/****************************************************************/
function SplashscreenExample() {

    navigator.splashscreen.show();

}
/****************************************************************/
/*                        GEOLOCATION                           */
/****************************************************************/
function GetGeoLocation(button) {
	if(button=='ButtonGeo1')
		navigator.geolocation.getCurrentPosition(GeoOnSuccess1, GeoOnError1);
	else
		navigator.geolocation.getCurrentPosition(GeoOnSuccess2, GeoOnError2);
}


// onSuccess Geolocation
//

function GeoOnSuccess1(position) {
    var element = document.getElementById('geolocation1');

    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Timestamp: ' + position.timestamp + '<br />';
	if(($('#ButtonGeo1').attr( 'lat'))&&($('#ButtonGeo1').attr( 'lon'))&&($('#ButtonGeo2').attr( 'lon'))&&($('#ButtonGeo2').attr( 'lon')))
	{
	
	}
	$('#ButtonGeo1').attr( 'lat', position.coords.latitude );		
	$('#ButtonGeo1').attr( 'lon', position.coords.longitude );			

	
}

// onError Callback receives a PositionError object
//
function GeoOnError1(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function GeoOnSuccess2(position) {
    var element = document.getElementById('geolocation2');

    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Timestamp: ' + position.timestamp + '<br />';
	$('#ButtonGeo2').attr( 'lat', position.coords.latitude );		
	$('#ButtonGeo2').attr( 'lon', position.coords.longitude );			

	
}

// onError Callback receives a PositionError object
//
function GeoOnError2(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function gps_distance()
{
	lat1=$('#ButtonGeo1').attr( 'lat' );		
	lon1=$('#ButtonGeo1').attr( 'lon' );
	lat2=$('#ButtonGeo2').attr( 'lat');		
	lon2=$('#ButtonGeo2').attr( 'lon' );
	// http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
	var element = document.getElementById('geolocationDist');

    element.innerHTML = 'Difference: '+d+' km';
    return d;
}

/****************************************************************/
/*                        CONNECTION                            */
/****************************************************************/


function checkConnection() {
    var networkState = navigator.network.connection.type;

    /*var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';*/

    switch (networkState) {
        case Connection.UNKNOWN: return (0);
        case Connection.NONE: return (0);
        case Connection.ETHERNET: return (1);//'Ethernet connection';
        case Connection.WIFI: return (2);//     = 'WiFi connection';
        case Connection.CELL_2G: return (3);//  = 'Cell 2G connection';
        case Connection.CELL_3G: return (4);//  = 'Cell 3G connection';
        case Connection.CELL_4G: return (5);//  = 'Cell 4G connection';
    }

    //alert('Connection type: ' + states[networkState]);

}


function onOnline() {
    var StatoCon = document.getElementById('ConnectionStatus');

    StatoCon.style.background = "green";

    var networkState = navigator.network.connection.type;

    var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	StatoCon.innerHTML = states[networkState];
    // Handle the online event
    //navigator.notification.alert(message, alertCallback, [title], [buttonName]);

    /*navigator.notification.alert(
		'Dispositivo online',  // message
		alertDismissed,         // callback
		'ONLINE',            // title
		'OK'                  // buttonName
	);*/
}

function alertDismissed() {
    // do something
}

function onOffline() {
    var StatoCon = document.getElementById('ConnectionStatus');

    StatoCon.style.background = "red";
    StatoCon.innerHTML = "Dispositivo offline";
    // Handle the online event
    //navigator.notification.alert(message, alertCallback, [title], [buttonName]);

    /*navigator.notification.alert(
		'Dispositivo offline',  // message
		alertDismissedOffLine,         // callback
		'OFFLINE',            // title
		'OK'                  // buttonName
	);*/

}

function alertDismissedOffLine() {
    // do something
}

// Start watching the acceleration
//

/****************************************************************/
/*                        ACCELEROMETER                         */
/****************************************************************/

function OnSelectionChange(select) {
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value == "off") {
        stopWatchAcc();
        
    }
    else {
        startWatchAcc();
       
    }
}

var AccwatchID;
function startWatchAcc() {

    // Update acceleration every 3 seconds
    var AccOptions = { frequency: 500 };

    AccwatchID = navigator.accelerometer.watchAcceleration(onAccSuccess, onAccError, AccOptions);


}

// Stop watching the acceleration
//
function stopWatchAcc() {
    if (AccwatchID) {

        navigator.accelerometer.clearWatch(AccwatchID);
        AccwatchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onAccSuccess(acceleration) {
    var elementAcc = document.getElementById('accelerometer');
    elementAcc.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: ' + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onAccError() {
    var elementAcc = document.getElementById('accelerometer');
    elementAcc.innerHTML = 'Acceleration X: ---<br />' +
                        'Acceleration Y: ---<br />' +
                        'Acceleration Z: ---<br />' +
                        'Timestamp: ---<br />';
}

/****************************************************************/
/*                        LOCAL STORAGE                         */
/****************************************************************/

function StoreLocally() {
    /*window.localStorage.setItem("key", "value");
    var keyname = window.localStorage.key(i);
    // keyname is now equal to "key"
    var value = window.localStorage.getItem("key");
    // value is now equal to "value"
    window.localStorage.removeItem("key");
    window.localStorage.setItem("key2", "value2");
    window.localStorage.clear();
    // localStorage is now empty*/


    window.localStorage.setItem("key", document.all.TextToSave.value);

}

/****************************************************************/
/*                        FRAME                                 */
/****************************************************************/

function UpdateFrame(param) {
    /**
     * param = frame di destinazione
     */
    var myFrame = document.getElementById("FrameSite");

    //Provo a cambiare il frame
    if (param.length > 0) {
        myFrame.src = "http://"+param;
    } else {
        //Altrimenti imposto quello predefinito
        alert('Inserire URL');
    }
}

function showConfirm(message, callback, buttonLabels, title) {

    //Set default values if not specified by the user.
    buttonLabels = buttonLabels || 'OK,Cancel';

    title = title || "default title";

    //Use Cordova version of the confirm box if possible.
    if (navigator.notification && navigator.notification.confirm) {

        var _callback = function (index) {
            if (callback) {
                callback(index == 1);
            }
        };

        navigator.notification.confirm(
            message,      // message
            _callback,    // callback
            title,        // title
            buttonLabels  // buttonName
        );

        //Default to the usual JS confirm method.
    } else {
        invoke(callback, confirm(message));
    }
}

function ShowExitConfirm() {
    //var message = "Would you like to proceed?";
    //var title = "Important Question";
    var message = "Confermare uscita?";
    var title = "Uscita";

    //The first element of this list is the label for positive 
    //confirmation i.e. Yes, OK, Proceed.
    var buttonLabels = "Si,No";

    var callback = function (yes) {
        if (yes) {
            //alert('Proceed');
            navigator.app.exitApp();  // For Exit Application
        }
        /*else {
            alert('Do Not Proceed');
        }*/
    };

    showConfirm(message, callback, buttonLabels, title);
}

/*
<script type="text/javascript" charset="utf-8">

            document.addEventListener("deviceready", onDeviceReady, true);

            function onDeviceReady() {
                document.addEventListener("backbutton", BackKeyDown, true);
            }

            function BackKeyDown() {
                navigator.notification.alert();
                //navigator.app.exitApp();  // For Exit Application
            }
        </script>
        */