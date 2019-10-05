function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), 
    // Create the DIV to hold the control and call the makeInfoBox() constructor
// passing in this DIV.
var infoBoxDiv = document.createElement('div');
var infoBox = new makeInfoBox(infoBoxDiv, map);
infoBoxDiv.index = 1;
map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
{
      center: {lat: 0, lng: 0},
      zoom: 3,
      styles: [{
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]  // Turn off points of interest.
      }, {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
      }],
      disableDoubleClickZoom: true,
      streetViewControl: false
    });
  }
  var firebase = new Firebase("https://hackiiitv-52de7.firebaseio.com/");
  /**
 * Data object to be written to Firebase.
 */
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
  };

  /**
* Starting point for running the program. Authenticates the user.
* @param {function()} onAuthSuccess - Called when authentication succeeds.
*/
function initAuthentication(onAuthSuccess) {
    firebase.auth().signInAnonymously().catch(function(error) {
        console.log(error.code + ", " + error.message);
    }, {remember: 'sessionOnly'});
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        data.sender = user.uid;
        onAuthSuccess();
      } else {
        // User is signed out.
      }
    });
  }// Listen for clicks and add them to the heatmap.
clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
function(snapshot) {
  var newPosition = snapshot.val();
  var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
  heatmap.getData().push(point);
}
);