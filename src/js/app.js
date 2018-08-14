function onPositionReceived(position) {
    console.log(position.coords);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    console.log('lat: ' + lat, 'long: ' + long);
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=100`
    fetch(proxyUrl + targetUrl)
    .then(function(response) {
    return response.json();
    })
    .then(function(myJson) {
    console.log(myJson);
    });
}

navigator.geolocation.getCurrentPosition(onPositionReceived);


