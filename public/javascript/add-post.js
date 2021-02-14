const createPost = document.querySelector('#newPost');

async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
    const city = document.querySelector('#postCity').value.trim();
    const country = document.querySelector('#postCountry').value.trim();
    const image = document.querySelector('#postImage').files;

    if(title && post_text && city && country && image) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_text,
                city,
                country
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            // document.location.replace('/single-post');
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

createPost.addEventListener('submit', newPostHandler);

function initMap() {
  var center = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: center
  });
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });

  var locations = [
    ['Los Angeles', 34.052235, -118.243683],
    ['Santa Monica', 34.024212, -118.496475],
    ['Redondo Beach', 33.849182, -118.388405],
    ['Newport Beach', 33.628342, -117.927933],
    ['Long Beach', 33.770050, -118.193739]
  ];

  var infowindow =  new google.maps.InfoWindow({});
  var marker, count;
  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
      map: map,
      title: locations[count][0]
    });
  google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(locations[count][0]);
        infowindow.open(map, marker);
      }
    })(marker, count));
  }
}

// window.onload = function() {
//     var startPos;
//     var geoSuccess = function(position) {
//       startPos = position;
//       document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//       document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//     };
//     navigator.geolocation.getCurrentPosition(geoSuccess);
// };

  
