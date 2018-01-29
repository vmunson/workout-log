$(function(){
    $.extend(WorkoutLog, {
        //signup method
        signup: function(){
            let username = $("#su_username").val()
            let password = $("#su_password").val()

            var user = {
                user:{
                    username: username,
                    password: password
                }
            }

            let signup = $.ajax({
                type: 'POST',
                url: WorkoutLog.API_BASE + 'user',
                data: JSON.stringify(user),
                contentType:  'application/json'
            }).done((data) => {
                if(data.sessionToken){
                    WorkoutLog.setAuthHeader(data.sessionToken)
                }
                $("#signup-modal").modal("hide")
                $(".disabled").removeClass("disabled")
                $("#loginout").text('Logot')
            }).fail(() => {
                $("#su_error").text('There was an issue with sign up').show()
            })
        }
        //login method

        //loginout method
    })

    //blind events
    $("#signup").on("click", WorkoutLog.signup)
})