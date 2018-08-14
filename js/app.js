// Getting the API and geo location of a user

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
        console.log(myJson.acList[0].Cou);
        console.log(myJson.acList.length);

        var flightsTemplate = document.querySelector('.flights-data-container');

        myJson.acList.forEach(function(item){
            //Rotates plane icon depending if the flight is west-bound or east-bound
            function iconRotate() {
                if(item.Trak < 90) {
                    return `style="transform: rotateZ(19deg)"`
                } else {
                   return  `style="transform: rotateZ(-103deg)"`
                }
            }
            flightsTemplate.innerHTML += `
                <div class="flight-card">
                    <img src="images/airplane-shape.png" alt="airplane-icon" ${iconRotate()}>
                    <div class='flight-info'>
                        <span><strong>Altitude:</strong> ${item.Alt}</span> 
                        <span><strong>Flight code number:</strong> ${item.CNum}</span>
                    </div>
                </div>
                `;
        })
    });
}

navigator.geolocation.getCurrentPosition(onPositionReceived);







