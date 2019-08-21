var socket = io();

var selectSuc = document.getElementById('sucursalTopFive')
selectSuc.onchange = graphSeguimiento

function graphSeguimiento() {
    socket.emit('sad', { sucursal: selectSuc.value })
    socket.emit('getTotal', { sucursal: selectSuc.value })
}

socket.on('sad_data', (data) => {
    var totalProduct = document.getElementById('TopProduct')
    totalProduct.innerHTML = ''
    $('#TopProduct').append('<canvas class=" mx-auto" id="chartTopProduct" style="max-width: 600px;"></canvas>')
    var chartTop = document.getElementById('chartTopProduct')
    var chart = new Chart(chartTop.getContext('2d'), data)
    document.getElementById('valor').innerHTML = "$" + data.total[0] + " - $" + data.total[1] + " = $" + (data.total[0] - data.total[1])
});

window.onload = function () {
    graphSeguimiento()
}