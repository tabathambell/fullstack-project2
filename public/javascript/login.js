const loginSubmitBtn = document.querySelector('#loginSubmit');

async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if(email && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 
                'Content-Type': 'application/json' 
            }
        });

        if(response.ok){
            console.log(document.location.replace('/dashboard'));
        } else{
            alert(response.statusText);
        }
    }
}

loginSubmitBtn.addEventListener('click', loginFormHandler);