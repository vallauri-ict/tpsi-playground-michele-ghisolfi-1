$(document).ready(function() {

    $("#btnInvia").on("click", function() {
        let dataStart  = $("#dataStart").val()
        let dataEnd  = $("#dataEnd").val();
        console.log(dataStart)
        let request = inviaRichiesta("post", "/api/servizio1", { "dataStart":dataStart, "dataEnd":dataEnd });
        request.fail(errore);
        request.done(function(data) {
            console.log(data);
        });
    });
});