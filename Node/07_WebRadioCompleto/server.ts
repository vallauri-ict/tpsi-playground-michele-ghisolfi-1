import * as _http from "http"
import HEADERS from "./headers.json"
import * as _fs from "fs"
import {Dispatcher} from "./dispatcher"

import radios from "./radios.json"
import states from "./states.json"
let port:number = 1337

let dispatcher = new Dispatcher();

let server = _http.createServer(function (req, res) {
    dispatcher.dispatch(req, res)
})
server.listen(port)
console.log("Server in ascolto sulla porta " + port)

// Registrazione dei servizi
dispatcher.addListener("GET", "/api/elenco", function (req, res) {
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify({"states":states}))
    res.end();
})

dispatcher.addListener("GET", "/api/radios", function (req, res) {
    let state = req["GET"].state
    let json = radios.filter(x => x.state == state)
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify(json))
    res.end();
})

dispatcher.addListener("POST", "/api/like", function (req, res) {
    let radioID = req["BODY"].id
    let n = parseInt(radios.filter(x => x.id == radioID)[0].votes)
    n++;
    radios.filter(x => x.id == radioID)[0].votes = n.toString()

    _fs.writeFile("./radios.json", JSON.stringify(states), function (err) {
        if (!err) {
            console.log("Like aggiornati")
            res.writeHead(200, HEADERS.json)
            res.write(JSON.stringify({"ris":n}))
            res.end();
        } else {
            console.log("Error Like")
        }
    });
    
    
})