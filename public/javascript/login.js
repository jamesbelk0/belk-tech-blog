async function loginFormHandler(event) {
    event.preventDefault();
  
    // query the document for the selectors by their id and set the text from text area to a variable
    const username = document.querySelector('#loginUserName').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
  
    // conditional to check if the user filled out the textareas. if so log the user in using the post route
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