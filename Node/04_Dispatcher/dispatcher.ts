import * as _http from "http"
import * as _url from "url"
import * as  _fs from "fs"
import * as _mime from "mime"
import * as querystring from "query-string"
let HEADERS = require("./headers.json")
let paginaErrore : string;

class Dispatcher{
    prompt:string = ">>>"
    // ogni listeners è costituito da un json del tipo:
    // {"risorsa":"callback"}
    // I listeners sono suddivisi in base al metodo di chiamata
    listeners:any = {
        "GET":{},
        "POST":{},
        "DELETE":{},
        "PUT":{},
        "PATCH":{}
    }

    constructor() { 
        init()
     }

    addListener(metodo:string, risorsa:string, callback:any) {
        metodo = metodo.toUpperCase();
        // if(this.listeners[metodo]) 
        // oppure
        if (metodo in this.listeners) {
            this.listeners[metodo][risorsa] = callback;
        } else {
            throw new Error("metodo non valido")
        }
    }

    dispatch(req, res) {
        let metodo = req.method.toUpperCase();
        if (metodo = "GET") {
            innerDispatch(req,res)
        } else {
            let parametriBody : string = ""
            req.on("data", function (data) {
                parametriBody += data;
            })
            let parametriJSON = {}
            req.on("end", function () {
                try {
                    // se i paramatri sono in formato json va a buon fine, altrimenti passo nel catch(url encoded)
                    parametriJSON = JSON.parse(parametriBody)
                } catch (error) {
                    parametriJSON= querystring.parse(parametriBody)
                }
            })
        }
    }
}

function innerDispatch(req, res) {
    // Lettura di metodo risorsa parametri
    let url = _url.parse(req.url, true);
    let metodo = req.method;
    let risorsa = url.pathname;
    let parametri = url.query; // json

    req["GET"] = parametri;

    console.log(`${this.prompt} ${metodo}: ${risorsa} ${JSON.stringify(parametri)}`)

    // pagina o servizio
    if (risorsa.startsWith("/api/")){
        if (risorsa in this.listeners[metodo]) {
            let callback = this.listeners[metodo][risorsa]
            callback(req, res) // eseguo callback
        } else {
            // Il client si aspetta un JSON
            // In caso di errore al posto del JSON
            // restituiamo una stringa
            res.writeHead(404, HEADERS.text)
            res.write("Servizio non trovato")
            res.end();
        }
    } else {
        staticListeners(req, res, risorsa)
    }
}

function staticListeners(req, res, risorsa) {
    if (risorsa == "/") {
        risorsa = "/index.html"
    }
    let fileName = "./static" + risorsa
    _fs.readFile(fileName, function (err, data) {
        if (!err) {
            let type = _mime.getType(fileName)
            res.writeHead(200, {"Content-Type" : _mime.getType(fileName)} )
            res.write(data)
            res.end()
        } else {
            console.log(`    ${err.code} : ${err.message}`)
            res.writeHead(404, HEADERS.html)
            res.write(paginaErrore)
            res.end()
        }
    })    
}

function init() {
    _fs.readFile("./static/error.html", function (err, data) {
        if (!err) {
            paginaErrore = data.toString();
        } else {
            paginaErrore = "<h1> Pagina non trovata </h1>"
        }
    })
}

module.exports = new Dispatcher();