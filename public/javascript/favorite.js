// async function upvoteClickHandler(event) {
//     event.preventDefault();
  
//     const id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];
//     const response = await fetch('/api/posts/favorite', {
//       method: 'PUT',
//       body: JSON.stringify({
//         post_id: id
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);



async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const id= window.location.toString().split('/')[
      window.location.toString().split('/').length -1 
    
    ];
    console.log(id)
    const response = await fetch('/api/posts/favorite', {
        method: 'PUT',
        body: JSON.stringify({
          // user_id: id,
          post_id: id
          
          
        }),
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    console.log(id);
    console.log('button clicked');
  }
  
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);

console.log(document.querySelector('.upvote-btn'))