const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const rePassword = document.querySelector('#re-password');
const showPassword = document.querySelector('#show-password');

showPassword.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
        showPassword.className = 'fa-solid fa-eye-slash'
    }
    else {
        password.type = 'password';
        showPassword.className = 'fa-solid fa-eye'
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    let usernameValue = username.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let rePasswordValue = rePassword.value;

    let user = Array.from(JSON.parse(localStorage.getItem('Users')) || '[]');
    for (let i = 0; i < user.length; i++) {
        if (user[i].emailData === emailValue) {
            setErrorFor(email, 'Email already exists');
            return;
        }
        else if (user[i].usernameData === usernameValue) {
            setErrorFor(username, 'Username already exists');
            return;
        }
    }

    if (usernameValue != '' && emailValue != '' && passwordValue != '' && rePasswordValue != '') {
        if (rePasswordValue === passwordValue) {
            let datas = JSON.parse(localStorage.getItem('Users') || '[]');
            datas.push(setData(usernameValue, emailValue, passwordValue, rePasswordValue));
            localStorage.setItem('Users', JSON.stringify(datas));
            window.location.href = 'loginPage.html';
        }
        else {
            setErrorFor(rePassword, 'RePassword doesnt match');
        }
    }
})

let setData = (username, email, password, rePassword) => {
    let data = {
        usernameData: username,
        emailData: email,
        passwordData: password,
        rePasswordData: rePassword,
    }
    return data;
}

let checkInputs = () => {
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let rePasswordValue = rePassword.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    }
    else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
    }
    else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    }
    else {
        setSuccessFor(password);
    }

    if (rePasswordValue === '') {
        setErrorFor(rePassword, 'RePassword cannot be blank');
    }
    else {
        setSuccessFor(rePassword);
    }
}

let setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    errorMessage.innerHTML = message;
    formControl.className = 'form-control error error-icon';
}

let setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success success-icon';
}

let isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}