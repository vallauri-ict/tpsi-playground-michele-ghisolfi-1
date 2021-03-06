$(document).ready(function() {

    $("#btnInvia").on("click", function() {
        let request = inviaRichiesta("get", "/api/risorsa1", { "nome": "Aurora" });
        request.fail(errore);
        request.done(function(data) {
            if (data.length > 0) {
                alert(JSON.stringify(data));
            } else {
                alert("Corrispondenza non trovata")
            }
            
        });
    });

    $("#btnInvia2").on("click", function() {
        let request = inviaRichiesta("patch", "/api/risorsa2", { "nome": "Unico", "vampires": 3 });
        request.fail(errore);
        request.done(function(data) {
            if (data.modifiedCount > 0) {
                alert("Aggiornamento eseguito correttamente")
            } else  {
                alert("Nessuna corrispindenza trovata")
            }
        });
    });

    $("#btnInvia3").on("click", function() {
        let request = inviaRichiesta("get", "/api/risorsa3/m/brown", {});
        request.fail(errore);
        request.done(function(data) {
            if (data.length > 0) {
                console.log(data)
            } else  {
                alert("Nessuna corrispindenza trovata")
            }
        });
    });
});