const createPost = document.querySelector('#newPost');


async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
    const city = document.querySelector('#postCity').value.trim();
    const country = document.querySelector('#postCountry').value.trim();
    const image = document.querySelector('#postImage').value;


    if(title && post_text && city && country && image) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_text,
                city,
                country,
                image
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });

        if(response.ok){
            document.location.replace('/single-post');
        } else {
            alert(response.statusText);
        }
    }
}

//image upload

const file=document.getElementById('postImage')
const img=document.getElementById('img')
const url = document.getElementById("url")

file.addEventListener('change',ev => {
    const formdata= new FormData()
    formdata.append("image",ev.target.files[0])
    fetch("https://api.imgur.com/3/image/",{
        method: "post",
        headers:{
             Authorization:"Bearer f60018baa47be35", 
             'sec-fetch-site': 'cross-site',
             'sec-fetch-mode': 'cors',
             'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryE9IAjMMWvHUjFhsa'
                }
                ,body:formdata
     }).then(data => data.json()).then(data=> {
        // img.src=data.data.link
        // url.innerText=data.data.link
        console.log(data.data)
        })
        })

        console.log(url)
        console.log(file)
        console.log(img)

createPost.addEventListener('submit', newPostHandler);
