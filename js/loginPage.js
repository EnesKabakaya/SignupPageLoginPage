const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const showPassword = document.querySelector('#show-password');

showPassword.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
        showPassword.className = 'fa-solid fa-eye-slash';
    }
    else {
        password.type = 'password';
        showPassword.className = 'fa-solid fa-eye';
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    let emailValue = email.value;
    let passwordValue = password.value;
    let loginSuccessfuly = false;
    let user = Array.from(JSON.parse(localStorage.getItem('Users')) || '[]');

    for (let i = 0; i < user.length; i++) {
        if (user[i].emailData === emailValue && user[i].passwordData === passwordValue) {
            loginSuccessfuly = true;
        }
        else {
            loginSuccessfuly = false;
        }

        if (user[i].emailData !== emailValue) {
            setErrorFor(email, 'Email does not match');
        }
        else {
            setSuccessFor(email);
        }

        if (user[i].passwordData !== passwordValue) {
            setErrorFor(password, 'Password does not match');
        }
        else {
            setSuccessFor(password);
        }
    }

    if (loginSuccessfuly) {
        window.location.href = 'index.html';
    }
})

let checkInputs = () => {
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank')
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not a valid')
    }
    else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank')
    }
    else {
        setSuccessFor(password);
    }
}

let setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    formControl.className = 'form-control error error-icon';
    errorMessage.textContent = message;
}

let setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success success-icon';
}

let isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
