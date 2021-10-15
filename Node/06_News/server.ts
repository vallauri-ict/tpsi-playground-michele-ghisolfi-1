import * as _http from "http"
import * as _fs from "fs"
import * as _mime from "mime"
import { HEADERS } from "./headers"
import { Dispatcher } from "./dispatcher"
import { notizie } from "./notizie"
let port: number = 1337

let dispatcher: Dispatcher = new Dispatcher

let server = _http.createServer(function (req, res) {
    dispatcher.dispatch(req, res)
})
server.listen(port)
console.log("Server in ascolto sulla porta " + port)


dispatcher.addListener("GET", "/api/elenco", function (req, res) {
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify(notizie))
    res.end()
})

dispatcher.addListener("POST", "/api/dettagli", function (req, res) {
    let nomeFile = req["BODY"].file
    _fs.readFile("./news/" + nomeFile, function (err, data) {

        for (const item of notizie) {
            if (item.file == nomeFile) {
                item.visualizzazioni++
                // _fs.writeFile("./notize.ts", "export const notizie =" + JSON.stringify(notizie), function (err) {
                //     if (err) {
                //         console.log("err: " + err);
                //     } else {
                //         console.log("File written successfully");
                //     }

                // })
                _fs.writeFileSync("./notizie.ts", "export const notizie =" + JSON.stringify(notizie));
                break
            }
        }

        


        if (!err) {
            res.writeHead(200, HEADERS.json)
            res.write(JSON.stringify({ 'file': data.toString() }))
            res.end()
        }
        
    })
})
