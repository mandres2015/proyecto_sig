var socket = io();
var ctx = document.getElementById('myChart').getContext('2d');

$("#d").click(function () {
    socket.emit('bar', {})
});

socket.on('bar_data', (data) => {
    console.log(data);
    var chart = new Chart(ctx, data);
});

