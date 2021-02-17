const createPost = document.querySelector('#newPost');

async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
    const city = document.querySelector('#postCity').value.trim();
    const country = document.querySelector('#postCountry').value.trim();
<<<<<<< HEAD

    if(title && post_text && city && country) {
=======
    // const image = document.querySelector('#postImage').files;

    if(title && post_text && city && country ) {
>>>>>>> 508cc8e54f52851f07afbc65d9f574d7a8549db3

        let lat, long;
        const cityData = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=pjtMs45lJi90EGCVfaBEDChiCmQFtGmI&location=${city}+${country}`).then(data => {
            return data.json();
        }).then(data => {
            [lat, long] = [data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng];
        });

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_text,
                city,
                long,
                lat,
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

