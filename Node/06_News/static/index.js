"use strict"

$(document).ready(function () {
    let _wrapper = $("#wrapper")

    elenco()

    function elenco() {
        _wrapper.empty()
        let requestElenco = inviaRichiesta("GET", "/api/elenco")
        requestElenco.fail(errore)
        requestElenco.done(function (data) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                $("<span>", {
                    'class': 'titolo'
                }).appendTo(_wrapper).text(element.titolo)
                $("<a>", {
                    'href': '#',
                    'click': visDettagli
                }).appendTo(_wrapper).prop('file', element.file).text("Leggi")
                $("<span>", {
                    'class': 'nVis'
                }).appendTo(_wrapper).text("[visualizzato" + element.visualizzazioni + " volte]")
                $("</br>").appendTo(_wrapper)
            }
        })
    }


    function visDettagli() {
        let requestDettagli = inviaRichiesta("POST", "/api/dettagli", {
            'file': $(this).prop('file')
        })
        requestDettagli.fail(errore)
        requestDettagli.done(function (data) {
            elenco()
            $("#news").html(data.file)
        })

    }



})
