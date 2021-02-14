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