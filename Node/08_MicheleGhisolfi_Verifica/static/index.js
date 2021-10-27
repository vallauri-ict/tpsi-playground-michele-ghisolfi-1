"use strict"

$(function () {
    let lstCat = $("<select id='lstCat'></select>").appendTo("#categoryList")
    let mainW = $("#mainWrapper")//.prev("#btnInvia")

    let requestCategories = inviaRichiesta("GET", "/api/categories")
    requestCategories.fail(errore)
    requestCategories.done(function (data) {
        console.log(data)
        for (let i = 0; i < data.cat.length; i++) {
            const element = data.cat[i];
            let opt = $("<option value=" + element + ">").html(element)
            opt.appendTo(lstCat)
        }

        // -----------------
        update(lstCat.val())
    })

    lstCat.on("change", function () {
        update(lstCat.val())
    })

    function update(cat) {
        
        mainW.empty()
        // select.find('option:selected').text()
        let requestFacts = inviaRichiesta("GET", "/api/facts", {"cat":cat})
        requestFacts.fail(errore)
        requestFacts.done(function (data) {
            console.log(data)
            let title = $('<h2 style="text-align: center;">').text("rate your favorite facts:").appendTo(mainW)
            for (const item of data.states) {
                
                let input = $("<input type='checkbox' value='" + item.id + "'>")
                input.appendTo(mainW)
                let span = $("<span>").html(item.value).appendTo(mainW)
                $("<br>").appendTo(mainW)
            }
            let btn = $("<button id='btnInvia'>").text("invia").appendTo(mainW).on("click", btnInviaClick)
            
        })
    }

    function btnInviaClick () {
        let aus = mainW.find('input[type=checkbox]:checked')
        let vet = []
        for (let i = 0; i < aus.length; i++) {
            const element = aus[i];
            // console.log(element.value)
            vet.push(element.value)
        }
        let requestRate = inviaRichiesta("POST", "/api/rate", {"ids":vet})
        requestRate.fail(errore)
        requestRate.done(function (data) {
            console.log(data)
        })
    }

    $("#btnAdd").on("click", function () {
        let param = {"cat": lstCat.val(), "value": $("#newFact").val()}
        console.log(param)
        let requestAdd = inviaRichiesta("POST", "/api/add", param)
        requestAdd.fail(errore)
        requestAdd.done(function (data) {
            lstCat.trigger("change")
        })
    })
})