var socket = io();
var totalSale = document.getElementById('TopSale')
var totalProduct = document.getElementById('TopProduct')
var topProductGains = document.getElementById('TopProductGains')
var selectSuc = document.getElementById('sucursalTopFive')
var selectSucGains = document.getElementById('sucursalTopFiveGains')
var selectPeriod = document.getElementById('salePeriod')

selectSuc.onchange = graphTop5
selectSucGains.onchange = graphTop5Gains
selectPeriod.onchange = graphTotalSale

function graphTop5() {
    socket.emit('bar', { sucursal: selectSuc.value })
}

function graphTop5Gains() {
    socket.emit('payment', { sucursal: selectSucGains.value })
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
socket.on('payment_data', (data) => {
    console.log(data);
    topProductGains.innerHTML = ''
    $('#TopProductGains').append('<canvas class=" mx-auto" id="chartTopProductGains" style="max-width: 600px;"></canvas>')
    var chartGains = document.getElementById('chartTopProductGains')
    var chart = new Chart(chartGains.getContext('2d'), data);
});



window.onload = function () {
    graphTop5()
    graphTop5Gains()
    graphTotalSale()
};