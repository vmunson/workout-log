$(function () {
    $.extend(WorkoutLog, {
        log: {
            workouts: [],

            setDefinitions: function () {
                var defs = WorkoutLog.definition.userDefinitions;
                var len = defs.length;
                var opts;
                for (var i = 0; i < len; i++) {
                    opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
                }
                $("#log-definition").children().remove();
                $("#log-definition").append(opts);
                $("#update-definition").children().remove()
                $("#update-definition").append(opts)
            },

            setHistory: function () {
                var history = WorkoutLog.log.workouts;
                var len = history.length;
                var lis = "";
                for (var i = 0; i < len; i++) {
                    lis += "<li class='list-group-item'>" +
                        // history[i].id + " - " + 
                        history[i].date + " - " +
                        history[i].def + " " +
                        // pass the log.id into the button's id attribute // watch your quotes!
                        "<div class='pull-right' >" +
                        "<button id='" + history[i].id + "' class='update btn'><strong>U</strong></button>" +
                        "<button id='" + history[i].id + "' class='remove btn'><strong>X</strong></button>" +
                        "</div></li>";

                    $("#history-list").children().remove();
                    $("#history-list").append(lis);
                }
            },
            create: function () {
                var itsLog = {
                    desc: $("#log-description").val(),
                    date: $("#log-date").val(),
                    distance: $("#log-distance").val(),
                    time: $("#log-time").val(),
                    def: $("#log-definition option:selected").text(),
                    heart: $("#log-heart").val()
                };
                var postData = { log: itsLog };
                var logger = $.ajax({
                    type: "POST",
                    url: WorkoutLog.API_BASE + "log",
                    data: JSON.stringify(postData),
                    contentType: "application/json"
                });

                logger.done(function (data) {
                    // console.log(itsLog)
                    WorkoutLog.log.workouts.push(data);
                    $("#log-description").val("")
                    $('#log-date').val("")
                    $("#log-distance").val("");
                    $("#log-time").val("");
                    $("#log-heart").val("")
                    $('a[href="#history"]').tab("show");


                });
            },
            getWorkout: function(){
                let thisLog = {id: $(this).attr('id')}
                // console.log(thisLog)
                logID = thisLog.id
                let updateData = {log: thisLog}
                let getLog = $.ajax({
                    type: 'GET',
                    url: WorkoutLog.API_BASE + 'log/' + logID,
                    data: JSON.stringify(updateData),
                    contentType: 'application/json'
                }).done(function(data){
                    $('a[href="#update-log"]').tab("show");
                    $('#update-date').val(data.date)
                    $('#update-distance').val(data.distance)
					$('#update-time').val(data.time);
                    $('#update-description').val(data.description);
                    $('#update-heart').val(data.heart)
					$('#update-id').val(data.id);
                })
            },
            updateWorkout: function() {
				$("#update").text("Update");
				var updateLog = { 
                    id: $('#update-id').val(),
                    desc: $("#update-description").val(),
                    date: $("#update-date").val(),
                    distance: $("#update-distance").val(),
					time: $("#update-time").val(),
                    def: $("#update-definition option:selected").text(),
                    heart: $("#update-heart").val()
				};
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == updateLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				WorkoutLog.log.workouts.push(updateLog);
				var updateLogData = { log: updateLog };
				var updater = $.ajax({
						type: "PUT",
						url: WorkoutLog.API_BASE + "log",
						data: JSON.stringify(updateLogData),
						contentType: "application/json"
				}).done(function(data) {
                    console.log(data);
                    // console.log(updateLog)
                    $("#update-description").val("");
                    $("update-date").val("")
                    $("update-distance").val("")
                    $("#update-time").val("");
                    $("#update-heart").val("")
					$('a[href="#history"]').tab("show");
				}).fail(
                    console.log('failure')
                )

			},
            delete: function () {
                let thisLog = {
                    id: $(this).attr('id')
                }
                let deleteData = { log: thisLog }
                let deleteLog = $.ajax({
                    type: 'DELETE',
                    url: WorkoutLog.API_BASE + 'log',
                    data: JSON.stringify(deleteData),
                    contentType: 'application/json'
                })
                $(this).closest('li').remove()
                for (let i = 0; i < WorkoutLog.log.workouts.length; i++) {
                    if (WorkoutLog.log.workouts[i].id == this.id) {
                        WorkoutLog.log.workouts.splice(i, 1)
                    }
                }
                deleteLog.fail(function () {
                    console.log("nope, you didn't delete it.")
                })
            },
            // history
            fetchAll: function () {
                var fetchDefs = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "log",
                    headers: {
                        "authorization": window.localStorage.getItem("sessionToken")
                    }
                })
                    .done(function (data) {
                        WorkoutLog.log.workouts = data;
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
            }
        }
    });

    $("#log-save").on("click", WorkoutLog.log.create);
    $("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete)
    $("#log-update").on("click", WorkoutLog.log.updateWorkout)
    $("#history-list").delegate('.update', 'click', WorkoutLog.log.getWorkout)

    // fetch history if we already are authenticated and refreshed
    if (window.localStorage.getItem("sessionToken")) {
        WorkoutLog.log.fetchAll();
    }
});