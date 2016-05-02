
var eventslist = [{
    evename: 'Toronto',
    address:'',
    lat: 43.7000,
    long: -79.4000
}, {
    evename: 'New York',
    address:'',
    lat: 40.6700,
    long: -73.9400
}, {
    evename: 'Chicago',
    address:'',
    lat: 41.8819,
    long: -87.6278
}, {
    evename: 'Los Angeles',
    address:'',
    lat: 34.0500,
    long: -118.2500
}, {
    evename: 'Las Vegas',
    address:'',
    lat: 36.0800,
    long: -115.1522
}];

//Angular App Module and Controller

angular.module("InstaEventsApp").controller('MapCtrl', function($scope) {

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.evename
        });
        marker.content = '<div class="infoWindowContent">' + info.address + '</div>';

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < eventslist.length; i++) {
        createMarker(eventslist[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
