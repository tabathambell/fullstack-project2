const signupSubmitBtn = document.querySelector('#signupForm');
const loginSubmitBtn = document.querySelector('#loginForm');

async function signupFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#signupUsername').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if(username && email && password){
        const response = await fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            const res = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });
    
            if(res.ok){
                document.location.replace('/dashboard');
            } else{
                alert(res.statusText);
            }
        } else {
            alert(response.status);
        }
    }
}

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
            document.location.replace('/dashboard');
        } else{
            alert(response.statusText);
        }
    }
}

signupSubmitBtn.addEventListener('submit', signupFormHandler);
loginSubmitBtn.addEventListener('submit', loginFormHandler);
