async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signUpUserName').value.trim();
    const email = document.querySelector('#signUpUserEmail').value.trim();
    const password = document.querySelector('#signUpUserPW').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signUpBtn').addEventListener('click', signupFormHandler);

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#loginUserName').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#logInBtn').addEventListener('click', loginFormHandler);