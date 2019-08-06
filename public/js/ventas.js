/*
    VARIABLES DE PARTE DE CLIENTES
*/
var inputCli = document.getElementById("clientSearch")
var DNICli = document.getElementById("DNICli")
var nameCli = document.getElementById("nameCli")
var addressCli = document.getElementById("addressCli")
var phoneCli = document.getElementById("phoneCli")
var btnSearchCli = document.getElementById("btnSearchCli")
var btnAddCli = document.getElementById("btnAddCli")

/*
    BUSCAR CLIENTES
*/
inputCli.onkeyup = searchClient
btnSearchCli.onclick = searchClient

function searchClient(e) {
    if (e.type == "keyup" || inputCli.value.length == 0) {
        if (inputCli.value.length >= 3) {
            getClient(inputCli)
        }
    }
    else {
        getClient(inputCli)
    }
}

function getClient(data) {
    var $form = $(data)

    $.ajax({
        url: "/searchclient",
        type: "GET",
        data: $form.serialize(),
        success: function (resClients) {
            autocompleteClient(data, resClients)
        }
    })
}

// AUTOCOMPLETADO DE CLIENTES
function autocompleteClient(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    /*execute a function when someone writes in the text field:*/
    var a, b
    /*close any already open lists of autocompleted values*/
    closeAllLists()
    currentFocus = -1
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV")
    a.setAttribute("id", this.id + "autocomplete-list")
    a.setAttribute("class", "autocomplete-items")
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a)
    /*for each item in the array...*/
    arr.forEach(client => {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV")
        /*make the matching letters bold:*/
        b.innerHTML += client[0] + " - " + client[1] + " " + client[2]
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + client[0] + "'>"
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
            setDataClient(client)
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists()
            inputCli.value = ""
        })
        a.appendChild(b)
    })
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items")
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i])
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target)
    })
}

function setDataClient(client) {
    DNICli.value = client[0]
    nameCli.value = client[1] + " " + client[2]
    addressCli.value = client[3]
    phoneCli.value = client[4]
}

/*
    VARIABLES DE PARTE DE PRODUCTOS
*/
var inputPro = document.getElementById("productSearch")
var codePro = document.getElementById("codePro")
var descriptionPro = document.getElementById("descriptionPro")
var quantPro = document.getElementById("quantPro")
var btnSearchPro = document.getElementById("btnSearchPro")
var btnAddPro = document.getElementById("btnAddPro")
var productSelected = []

/*
    BUSCAR PRODUCTO
*/
inputPro.onkeyup = searchProduct
btnSearchPro.onclick = searchProduct

function searchProduct(e) {
    if (e.type == "keyup" || inputPro.value.length == 0) {
        if (inputPro.value.length >= 1) {
            getProduct(inputPro)
        }
    }
    else {
        getProduct(inputPro)
    }
}


function getProduct(data) {
    var $form = $(data)

    $.ajax({
        url: "/searchproduct",
        type: "GET",
        data: $form.serialize(),
        success: function (resProducts) {
            autocompleteProduct(data, resProducts)
        }
    })
}

// AUTOCOMPLETADO DE CLIENTES
function autocompleteProduct(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    /*execute a function when someone writes in the text field:*/
    var a, b
    /*close any already open lists of autocompleted values*/
    closeAllLists()
    currentFocus = -1
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV")
    a.setAttribute("id", this.id + "autocomplete-list")
    a.setAttribute("class", "autocomplete-items")
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a)
    /*for each item in the array...*/
    arr.forEach(product => {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV")
        /*make the matching letters bold:*/
        b.innerHTML += product[0] + " - " + product[1]
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + product[0] + "'>"
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
            setDataProduct(product)
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists()
            inputPro.value = ""
            productSelected = product
        })
        a.appendChild(b)
    })
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items")
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i])
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target)
    })
}

function setDataProduct(client) {
    codePro.value = client[0]
    descriptionPro.value = client[1]
}

/*
    MANEJO DE TABLA PRODUCTOS
*/

var tableProducts = document.getElementById("tableProducts")
btnAddPro.onclick = addProductTable
    .onclick = addProductTable

function addProductTable() {
    let quantity = parseInt(quantPro.value)

    if (codePro.value != "" && quantity > 0) {
        if (quantity > productSelected[2]) {
            document.getElementById("quantityError").innerHTML = productSelected[2]
            $("#modalPro").modal();
        }
        else {
            if (document.getElementById("rowNoDataPro") != null)
                $("#rowNoDataPro").remove();
            var product = '<tr><th scope="row" class="text-truncate">' + productSelected[0] + '</th>' +
                '<td class="text-truncate w-75">' + productSelected[1] + '</td>' +
                '<td class="text-truncate pricePro">' + Math.round(productSelected[3] * 100) / 100 + '</td>' +
                '<td class="quantityPro" onfocus="getData(this)" onblur="cleanField(this);calculateTotal();">' + quantPro.value + '</td>' +
                '<td class="stockPro text-center py-2" hidden>' + productSelected[2] + '</td>' +
                '<td class="text-center py-2">' +
                '<button type="button" class="btn btn-danger btn-sm mx-auto btnEliminarPro"' +
                'name="btnEliminarPro" value="-"><span' +
                ' class="fa fa-times button-table"></span></button>' +
                '<button type="button" class="btn btn-info btn-sm mx-auto btnEditarPro" name="btnEditarPro"' +
                'value="-"><span' +
                ' class="fa fa-pencil-alt button-table"></span></button>' +
                '</td></tr>'
            var fila = document.createElement("TR");
            fila.innerHTML = product;
            tableProducts.getElementsByTagName("tbody")[0].appendChild(fila);
            resetProduct()
            calculateTotal()
        }
    }
}

var prevQuant

function getData(td) {
    prevQuant = td.innerHTML
}

function cleanField(e) {
    // $(this).closest('tr')
    console.log(parseFloat($(e).closest('tr')[0].cells[3].innerHTML))

    if (!isNaN(parseFloat(e.innerHTML))) {
        if (parseFloat(e.innerHTML) > 0) {
            if (parseFloat(e.innerHTML) <= parseFloat($(e).closest('tr')[0].cells[4].innerHTML)) {
                e.innerHTML = parseFloat(e.innerHTML)
            }
            else {
                document.getElementById("quantityError").innerHTML = $(e).closest('tr')[0].cells[4].innerHTML
                $("#modalPro").modal();
                e.innerHTML = prevQuant
            }
        }
    }
    e.setAttribute("contenteditable", "false")
}

function resetProduct() {
    codePro.value = ""
    descriptionPro.value = ""
    quantPro.value = 1
}

// ELIMIAR UN PRODUCTO DE LA TABLA
$(document).on('click', '.btnEliminarPro', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
    calculateTotal()
    checkRows()
});

$(document).on('click', '.btnEditarPro', function (event) {
    event.preventDefault();
    var quantField = $(this).closest('tr')[0].getElementsByTagName('td')[2]
    quantField.setAttribute("contenteditable", "true")
    quantField.focus()
});

function checkRows() {
    let rows = document.getElementById('tableProducts').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
    if (rows == 0) {
        let datos = '<tr>' +
            '<td scope="row" colspan="5">Aun no hay productos agregados</td>' +
            '</tr>'
        var fila = document.createElement("TR");
        fila.setAttribute('class', 'text-center');
        fila.setAttribute('id', 'rowNoDataPro');
        fila.innerHTML = datos;
        tableProducts.getElementsByTagName("tbody")[0].appendChild(fila);
    }
}

/*
    CALCULAR TOTALES
*/
var subtotalSale = document.getElementById("subtotalSale")
var IVASale = document.getElementById("IVASale")
var totalSale = document.getElementById("totalSale")

function calculateTotal() {
    let rows = tableProducts.getElementsByTagName("tbody")[0].rows
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        // total += (parseFloat(rows[i].getElementsByClassName("pricePro")[0].innerHTML) * parseFloat(rows[i].getElementsByClassName("quantityPro")[0].innerHTML))
        total += (parseFloat(rows[i].getElementsByClassName("pricePro")[0].innerHTML) * parseFloat(rows[i].getElementsByClassName("quantityPro")[0].innerHTML))
    }

    total = floor2(total)

    subtotalSale.value = total
    IVASale.value = floor2(total * 0.12)
    totalSale.value = round2(parseFloat(subtotalSale.value) + parseFloat(IVASale.value))
}

checkRows()



/*
    BOTONES FINALES
*/
var btnCancelSale = document.getElementById("btnCancelSale")
var btnSaveSale = document.getElementById("btnSaveSale")

btnCancelSale.onclick = cancelAll
btnSaveSale.onclick = saveAll

function cancelAll() {
    $("#modalCancel").modal();
}

function saveAll() {
    let body = tableProducts.getElementsByTagName("tbody")[0]

    if (document.getElementById("rowNoDataPro") == null && body.rows.length > 0 && DNICli.value != "") {
        $('#modalPayMethod').modal()
        // setTimeout(function() {$('#modalPayMethod').modal('hide');}, 1000);
    }
}

var btnCashModal = document.getElementById("btnCashModal")
var btnCreditModal = document.getElementById("btnCreditModal")

btnCashModal.onclick = saveSale
btnCreditModal.onclick = saveSale

function saveSale(e) {

    let body = tableProducts.getElementsByTagName("tbody")[0]

    if (e.target.textContent === "EFECTIVO") {
        var send = { "client": DNICli.value, "subtotal": subtotalSale.value, "iva": IVASale.value, "total": totalSale.value, "metodo": "1", "products": [] }
    }
    else {
        var send = { "client": DNICli.value, "subtotal": subtotalSale.value, "iva": IVASale.value, "total": totalSale.value, "metodo": "2", "products": [] }
    }

    for (let i = 0; i < body.rows.length; i++) {
        let product = (body.rows[i].outerText).toString().split("\t", 4)
        product.splice(1, 1)
        product.push(body.rows[i].cells[4].innerHTML)
        send.products.push(product)
    }
    $.ajax({
        type: "POST",
        url: "/saveSale",
        data: send,
        contenttype: "aplication/json",
        success: function (data) {
            $("#modalSucessSale").modal();
            setTimeout(() => {
                $("#modalSucessSale").modal('hide');
                location.href = '/'
            }, 2000)

        },
        error: function (err, res, re) {
            $("#modalErrorSale").modal();
            setTimeout(() => {
                $("#modalErrorSale").modal('hide');
            }, 000)
        }
    })
}

function floor2(num) {
    return Math.floor(num * 100) / 100
}

function round2(num) {
    return Math.round(num * 100) / 100
}