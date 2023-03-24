function signUp() {
    var data = {
        email: document.forms[0].elements[0].value,
        password: document.forms[0].elements[1].value,
        name: document.forms[0].elements[2].value
    };

    $.ajax({
        type: 'POST',
        url: '/signup',
        data,
        success: function (data) {
        //    window.alert('user created successfully');
            window.location.replace('/index.html');
        },
        error: function (response) {
            // Switch this stuff around to use console and not reload

            window.alert(JSON.stringify(response));
            console.log(JSON.stringify(response));
        //    window.location.replace('/signup.html');
        }
    });
}

function signIn() {
    var data = {
        email: document.forms[0].elements[0].value,
        password: document.forms[0].elements[1].value
    };

    $.ajax({
        type: 'POST',
        url: '/login',
        data,
        success: function (data) {
            window.location.replace('/game.html');
        },
        error: function (response) {
            window.alert(JSON.stringify(response));
            console.log(JSON.stringify(response));
            // window.location.replace('/index.html');
        }
    });
}

function forgotPassword() {
    var data = {
        email: document.forms[0].elements[0].value
    };

    $.ajax({
        type: 'POST',
        url: '/forgot-password',
        data,
        success: function (data) {
            // window.alert(data.message);
            window.location.replace('/index.html');
        },
        error: function (response) {
            // Make this use validation field instead of alert
            window.alert(JSON.stringify(response));
            console.log(JSON.stringify(response));
            // window.location.replace('/forgot-password.html');
        }
    });
}

function resetPassword() {
    var token = document.location.href.split('token=')[1];
    var password = document.forms[0].elements[0].value;
    var verifiedPassword =  document.forms[0].elements[1].value;

    if (password !== verifiedPassword) {
        window.alert('passwords do not match');
    } else {
        var data = {
            password: password,
            verifiedPassword: verifiedPassword,
            token: token,
        };
        
        $.ajax({
            type: 'POST',
            url: '/reset-password',
            data,
            success: function (data) {
                // window.alert(data.message);
                window.location.replace('/index.html');
            },
            error: function (response) {
                window.alert(JSON.stringify(response));
                console.log(JSON.stringify(response));
                // window.location.replace('/reset-password.html');
            }
        });
    }
}