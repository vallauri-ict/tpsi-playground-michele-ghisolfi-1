"use strict"

$(function () {

    let requestElenco = inviaRichiesta("GET", "/api/elenco")
    requestElenco.fail(errore)
    requestElenco.done(function (data) {
        for (const item of data.states) {
            // console.log(item)
            let opt = $("<option value=" + item.name + ">").html(item.value + " [" + item.stationcount + "]")
            opt.appendTo("#lstRegioni")
        }
    })

    $("#lstRegioni").on("change", function () {
        $("#tbody").empty()
        let regione = $(this).val()
        if (regione != "tutti") {
            let requestRadios = inviaRichiesta("GET", "/api/radios", {"state":regione})
            requestRadios.fail(errore)
            requestRadios.done(function (data) {
                //console.log(data)
                let n = 0;
                for (const item of data) {
                    //console.log(item)
                    let tr = $("<tr>").appendTo("#tbody")
                    $("<td><img src=" + item.favicon+" width=40>").appendTo(tr)
                    $("<td>").text(item.name).appendTo(tr)
                    $("<td>").text(item.codec).appendTo(tr)
                    $("<td>").text(item.bitrate).appendTo(tr)
                    $("<td>").text(item.votes).appendTo(tr)
                    let td = $("<td>").prop("radioId", item.id).on("click", like)
                    $("<img src='./like.jpg' width=40>").appendTo(td)
                    td.appendTo(tr)

                }
                
            })
        }

    })

    function like() {
        let radioId = $(this).prop("radioId")
        let requestLike = inviaRichiesta("POST", "/api/like", {"id":radioId})
        requestLike.fail(errore)
        requestLike.done(function (data) {
            console.log(data)
            $("#lstRegioni").trigger("change")
        })
    }
})