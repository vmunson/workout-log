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
                        WorkoutLog.definition.fetchAll();
                        WorkoutLog.log.fetchAll();
                        console.log("You made it!");
                        console.log(data.sessionToken);
                    }
                    $("#signup-modal").modal("hide");
                    $(".disabled").removeClass("disabled");
                    $("#loginout").text("Logout");
                    $('a[href="#define"]').tab('show');
                    $("#su_username").val("");
                    $("#su_password").val("");
                    // go to define tab
                    $('.nav-tabs a[href="#define"]').tab('show');
                })

                //.fail() Promise
                .fail(function () {
                    $("#su_error").text("There was an issue with your username").show();
                });
        },
        //login method
        login: function () {
            console.log('login')
            var username = $("#li_username").val();
            var password = $("#li_password").val();
            var user = { user: { username: username, password: password } };
            var login = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "login",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            login.done(function (data) {
                if (data.sessionToken) {
                    WorkoutLog.setAuthHeader(data.sessionToken);
                    WorkoutLog.definition.fetchAll();
                    WorkoutLog.log.fetchAll()
                }

                $("#login-modal").modal("hide");
                $(".disabled").removeClass("disabled");
                $("#loginout").text("Logout");
                $("#li_username").val("");
                $("#li_password").val("");
                $('a[href="#define"]').tab("show");
            }).fail(function () {
                $("#li_error").text("There was an issue with your username or password").show();
            });
        },
        //loginout method
        loginout: function () {
            if (window.localStorage.getItem("sessionToken")) {
                window.localStorage.removeItem("sessionToken")
                $("#loginout").text("Login")
            }
        }
    })

    //blind events
    $("#loginButton").on("click", WorkoutLog.login)
    $("#signupForm").submit(WorkoutLog.signup)
    $("#loginout").on("click", WorkoutLog.loginout)

    if (window.localStorage.getItem("sessionToken")) {
        $("#loginout").text("logout")
    }
})