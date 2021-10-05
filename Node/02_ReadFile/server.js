"use strict"

const _http = require("http");
const _url = require("url");
const _fs = require("fs");
const _mime = require("mime");
const HEADERS = require("./headers.json")

const PORT = 1337;
let paginaErrore;

var server = _http.createServer(function (req, res) {

    // lettura di metodo risorsa e parametri
    let url = _url.parse(req.url, true);
    let metodo = req.method;
    let risorsa = url.pathname;
    let parametri = url.query; // json
    console.log(`Richiesta: ${metodo}:${risorsa}, Param: ${JSON.stringify(parametri)}`)

    if (risorsa == '/') {
        risorsa = "/index.html";
    }
    if (!risorsa.startsWith("/api/")) {
        risorsa = "./static" + risorsa;
        _fs.readFile(risorsa, function (error, data) {
            // se tutto ok, error == null
            if (!error) {
                let header = {
                    "Content-Type": _mime.getType(risorsa)
                };
                res.writeHead(200, header);
                res.write(data);
                res.end();
                //console.log("Richiesta ricevuta: " + req.url)
            } else {
                res.writeHead(404, HEADERS.html);
                res.write(paginaErrore);
                res.end();
            }
        });
    } else if(risorsa == "/api/servizio1"){
        // gestione servizio1
        let json = {"ris":"ok"};
        res.writeHead(200, HEADERS.json);
        res.writeHead(JSON.stringify(json));
        res.end();
    } else {
        // servizio richiesto non esiste
        res.writeHead(404, HEADERS.text);
        res.write("Servizio inesistente");
        res.end();
    }
});

server.listen(PORT, function () {
    _fs.readFile("./static/error.html", function (error, data) {
        if (!error) {
            paginaErrore = data;
        } else {
            paginaErrore = "<h1> PAGINA NON TROVATA </h1>";
        }
    })
});
console.log("Server in esecuzione sulla porta " + PORT);