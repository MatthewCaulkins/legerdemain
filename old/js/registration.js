document.addEventListener('DOMContentLoaded', () => {
    console.log('JS loaded');
        
    console.log('Document ready');

    const submit = document.querySelector('#submit');
    submit.addEventListener('click', () => {
        console.log('click');

        const userName = document.querySelector('#user-name');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const passwordConfirm = document.querySelector('#password-confirm');

        console.log(userName.value);
        console.log(email.value);
        console.log(password.value);
        console.log(passwordConfirm.value);
    });
});