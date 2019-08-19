var socket = io();
var totalSale = document.getElementById('TopSale')
var totalProduct = document.getElementById('TopProduct')
var selectSuc = document.getElementById('sucursalTopFive')
var selectPeriod = document.getElementById('salePeriod')

selectSuc.onchange = graphTop5
selectPeriod.onchange = graphTotalSale

function graphTop5() {
    socket.emit('bar', { sucursal: selectSuc.value })
}

function graphTotalSale() {
    socket.emit('sel', { value: selectPeriod.value })
}

socket.on('bar_data', (data) => {
    console.log(data);
    totalProduct.innerHTML = ''
    $('#TopProduct').append('<canvas class=" mx-auto" id="chartTopProduct" style="max-width: 600px;"></canvas>')
    var chartTop = document.getElementById('chartTopProduct')
    var chart = new Chart(chartTop.getContext('2d'), data);
});

socket.on('sel_data', (data) => {
    console.log(data);
    totalSale.innerHTML = ''
    $('#TopSale').append('<canvas class=" mx-auto" id="chartTotalSale" style="max-width: 600px;"></canvas>')
    var chartSale = document.getElementById('chartTotalSale')
    var chart = new Chart(chartSale.getContext('2d'), data);
});

window.onload = function () {
    graphTop5()
    graphTotalSale()
};