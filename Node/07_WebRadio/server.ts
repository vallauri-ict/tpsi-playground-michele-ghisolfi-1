import * as _http from "http"
import * as _fs from "fs"
import * as _mime from "mime"
import { HEADERS } from "./headers"
import { Dispatcher } from "./dispatcher"
import { states } from "./states"
import { radios } from "./radios"
let port: number = 1337

let dispatcher: Dispatcher = new Dispatcher

let stateJson = []

let server = _http.createServer(function (req, res) {
    dispatcher.dispatch(req, res)
})
server.listen(port)
console.log("Server in ascolto sulla porta " + port)

aus()

function aus() {
    stateJson = states;
    for (const item of radios) {
        try {
            let num = parseInt(states.filter(x => x.value == item.state)[0].stationcount)
            num++
            stateJson.filter(x => x.value == item.state)[0].stationcount = num.toString()
        } catch (error) {  }
    }
    
    _fs.writeFile("./json.json", JSON.stringify(stateJson, null, 2), function (err) {
        if (!err) {
            console.log("write succes")
        } else {
            console.log("Error")
        }
    });
}


dispatcher.addListener("GET", "/api/elenco", function (req, res) {
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify({"states":stateJson}))
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

    _fs.writeFile("./radios.ts", JSON.stringify(stateJson, null, 2), function (err) {
        if (!err) {
            console.log("Like aggiornati")
        } else {
            console.log("Error Like")
        }
    });
    
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify({"ris":n}))
    res.end();
})

