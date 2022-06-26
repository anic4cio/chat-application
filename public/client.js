$( document ).ready(function() {    
    var socket = io();

    function updateUsers(list) {
        for(let i = 0; i < list.length; i++) {
            $("#users").append(`<li><b>${list[i]}</b></li>`);
        }
    }

    $("#loginForm").submit(function(event) {
        event.preventDefault();
        let validate = $("#username").val()
        if(validate.length === 0 || !validate.trim()) {
            alert("Insira um nome de usuário.");
        } else {
            $username = $("#username").val();

            $("#loginArea").hide();
            $("#chatArea").show();
            socket.emit("has connected", $username);
        }
    });

    $("#messageForm").submit(function(event) {
        event.preventDefault();
        let validate = $("#message").val()
        if(validate.length === 0 || !validate.trim()) {
            alert(`Insira um texto para enviar.`)
        } else {
            socket.emit("new message", {username: $username, message: $("#message").val()});
            $("#message").val("");
        }
    });

    socket.on("has connected", function(data) {
        $("#users").html("");
        updateUsers(data.usersList);
        $("#messages").append(`<li><i><b>${data.username}</b> entrou!</i></li>`)
    });

    socket.on("has disconnected", function(data) {
        $("#users").html("");
        updateUsers(data.usersList);
        $("#messages").append(`<li><i><b>${data.username}</b> saiu!</i></li>`)
    });

    socket.on("new message", function(data) {
        $("#messages").append(`<li><b>${data.username}</b>: ${data.message}</li>`)
    });
});
