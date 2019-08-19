
$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/login",
            type: "POST",
            data: $(this).serialize(),
            success: (res, status) => {
                if (res == 'ok') {
                    window.location.href = '/'
                }
                else {
                    modalMsg("danger", res)
                }
            },
            error: function (err, errd, errs) {
                modalMsg("danger", 'HA OCURRIDO UN ERROR')
            }
        })
    })
    $('#registerForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/register",
            type: "POST",
            data: $(this).serialize(),
            success: (res, status) => {
                if (res == 'ok') {
                    modalMsg("success")
                    $('#registerForm').trigger("reset");
                }
                else {
                    modalMsg("danger", res)
                }
            },
            error: function (err, errd, errs) {
                modalMsg("danger", 'HA OCURRIDO UN ERROR')
            }
        })
    })
})

function modalMsg(type, res) {
    var text = []

    if (type == 'success') {
        text.push('CORRECTO')
        text.push('SE HA REALIZADO CON EXITO')
    }
    else {
        text.push('ERROR')
        text.push(res)
    }

    var modal = `<div class="modal fade align-center" id="modalGenerated" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content bg-`+ type + `">
    <div class="modal-header">
    <h5 class="modal-title text-white" id="exampleModalLabel">`+ text[0] + `</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body text-center text-white font-weight-bold">` + text[1] +
        `</div></div></div></div>`

    $("#modalmsg").html(modal);
    $("#modalGenerated").modal();
}