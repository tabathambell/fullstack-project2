var locations = [];

async function mapHandler() {

    const response = await fetch('/api/posts', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        return data.json();
    }).then(data => {
        for(let i=0; i<data.length; i++) {
            locations.push([data[i].title, data[i].lat, data[i].long, data[i].id]);
        }
    });

    initMap();
  
}
  
function initMap() {
    var center = {lat: 39.099728, lng: -94.578568};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center
    });

    var infowindow =  new google.maps.InfoWindow({});
    
    var marker, count;
    for (count = 0; count < locations.length; count++) {

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[count][1], locations[count][2]),
        map: map,
        content: `<a href="/post/${locations[count][3]}"><p>${locations[count][0]}</p></a>`
    });


    google.maps.event.addListener(marker, 'click', (function (marker, count) {
        return function () {
        infowindow.setContent(marker.content);

        infowindow.open(map, marker);


        }
    })(marker, count));
    }
}

mapHandler();
