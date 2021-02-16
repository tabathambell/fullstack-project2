const createPost = document.querySelector('#newPost');


async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
    const city = document.querySelector('#postCity').value.trim();
    const country = document.querySelector('#postCountry').value.trim();
    const image = document.querySelector('#postImage').files;


    if(title && post_text && city && country && image) {

        const imgurApiUrl = 'https://api.imgur.com/3/image/';
        var clientID = '3c65a28d05e4a1d';

        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${clientID}`);
        myHeaders.append('Content-Type', 'application/json');

        const formdata= new FormData()
        formdata.append("image",image[0]);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

        const imgResponse = await fetch(imgurApiUrl, requestOptions)
        .then(data => data.json())
        .then(data=> {
            // img.src=data.data.link
            // url.innerText=data.data.link
            console.log(data);
        }).catch(err => console.log(err));
        

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
                country,
                image
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

//image upload

// const file=document.getElementById('postImage')
// const img=document.getElementById('img')
// const url = document.getElementById("url")

// file.addEventListener('change',ev => {
//     const formdata= new FormData()
//     formdata.append("image",ev.target.files[0])
//     fetch("https://api.imgur.com/3/image/",{
//         method: "post",
//         headers:{
//              Authorization:"Bearer f60018baa47be35", 
//              'sec-fetch-site': 'cross-site',
//              'sec-fetch-mode': 'cors',
//              'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryE9IAjMMWvHUjFhsa'
//                 }
//                 ,body:formdata
//      }).then(data => data.json()).then(data=> {
//         // img.src=data.data.link
//         // url.innerText=data.data.link
//         console.log(data.data)
//     })
// })

// console.log(url)
// console.log(file)
// console.log(img)