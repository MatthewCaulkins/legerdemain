window.onload = (event) => {
    console.log("page is fully loaded");

    const email = document.querySelector('#email');
    if (email) {
        email.addEventListener('focus', () => {
            document.querySelector('.email-validation').classList.remove('active');
        })
    }
};
  