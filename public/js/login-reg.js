
$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/login",
            type: "POST",
            data: $(this).serialize(),
            success: (res, status) => {
                if (res == 200) {
                    window.location.href = '/'
                }
            },
            error: function (err, errd, errs) {
                console.log(errs);
            }
        })
    })
    $('#registerForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/register",
            type: "POST",
            data: $(this).serialize(),
            success: (res, rep) => {
                //console.log(res);
                console.log('registrado');
            },
            error: function (err, errd, errs) {
                console.log(errs);
            }
        })
    })

})