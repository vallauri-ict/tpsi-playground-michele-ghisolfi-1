"use strict";

$(document).ready(function () {
  let divIntestazione = $("#divIntestazione");
  let divCollections = $("#divCollections");
  let table = $("#mainTable");
  let divDettagli = $("#divDettagli");
  let filters = $(".card").first();
  let currentCollection = "";

  let request = inviaRichiesta("get", "/api/getCollections");
  request.fail(errore);
  request.done(function (collections) {
    console.log(collections);
    let label = divCollections.children("label");
    for (const collection of collections) {
      let clone = label.clone();
      clone.appendTo(divCollections);
      clone.children("input").val(collection.name);
      clone.children("span").text(collection.name);
      divCollections.append("<br>");
    }
    label.remove();
  });

  divCollections.on("click", "input[type=radio]", function () {
    currentCollection = $(this).val();
    let request = inviaRichiesta("GET", "/api/" + currentCollection);
    request.fail(errore);
    request.done(function (data) {
      console.log(data);
      divIntestazione.find("strong").eq(0).text(currentCollection);
      divIntestazione.find("strong").eq(1).text(data.length);
      if (currentCollection == "unicorns") {
        filters.show();
      } else {
        filters.hide();
      }
      for (const item of data) {
        let tr = $("<tr>").appendTo(table.children("tbody"));
        let td = $("<td>").appendTo(tr);
        td.text(item._id).appendTo(tr);

        td = $("<td>").appendTo(tr);
        td.text(item.name);

        td = $("<td>").appendTo(tr);
        $("<div>")
          .appendTo(td)
          .prop({ id: item._id, method: "patch" })
          .on("click", elimina);
        $("<div>").appendTo(td);
        $("<div>").appendTo(td).prop("id", item._id).on("click", elimina);
      }
    });
  });

  function elimina() {
    let request = inviaRichiesta(
      "delete",
      "/api/" + currentCollection + "/" + $(this).prop("_id")
    );
    request.fail(errore);
    request.done(function () {
      alert("documento rimosso correttamente");
      aggiorna();
    });
  }

  function visualizzaDettagli() {
    //
  }

  $("#btnAdd").on("click", () => {
    divDettagli.empty();

    let txtArea = $("<textArea>");
    txtArea.val("{ }");
    txtArea.appendTo(divDettagli);

    let btnInvia = $("<button>");
    btnInvia.text("INVIA");
    btnInvia.appendTo(divDettagli);
    btnInvia.on("click", () => {
      let param = "";
      try {
        let param = JSON.parse(txtArea.val());
      } catch (error) {
        alert("ERROR: JSON non valido");
        return;
      }

      let req = inviaRichiesta("post", "/api/" + currentCollection, param);
      req.fail(errore);
      req.done(function () {
        alert("Inserimento eseguito correttamente");
        divDettagli.empty();
        aggiorna();
      });
    });
  });

  function aggiorna() {
    let event = jQuery.Event("click");
    event.target = divCollections.find("input[type=radio]:checked")[0];
    divCollections.trigger(event);
  }
});
