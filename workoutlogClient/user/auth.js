$(function () {
    $.extend(WorkoutLog, {
        //signup method
        signup: function () {
            var username = $("#su_username").val();
            var password = $("#su_password").val();
            var user = { user: { username: username, password: password } };
            var signup = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "user",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            signup
                //.done() Promise
                //Runs asynchronously
                .done(function (data) {
                    if (data.sessionToken) {
                        WorkoutLog.setAuthHeader(data.sessionToken);
                        console.log("You made it!");
                        console.log(data.sessionToken);
                    }
                    $("#signup-modal").modal("hide");
                    $(".disabled").removeClass("disabled");
                    $("#loginout").text("Logout");
                    // go to define tab
                    $('.nav-tabs a[href="#define"]').tab('show');
                })

                //.fail() Promise
                .fail(function () {
                    $("#su_error").text("There was an issue with your username").show();
                });
        }
        //login method

        //loginout method
    })

    //blind events
    $("#signup").on("click", WorkoutLog.signup)
})