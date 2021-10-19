import * as _fs from "fs"
import * as _mime from "mime"
import { HEADERS } from "./headers"

import radios from "./radios.json" // lettura file radios.json


// lettura file readFile states.js
_fs.readFile("./radios.json", function (err, data) {
    if (!err) {
        console.error(err)
        return;
    } else { // restituisce file binario
        // se il file è un file di testo è necessario eseguire un .toString() finale
        // console.log(data.toString())
        elabora(JSON.parse(data.toString()))
    }
})

function elabora(states) {
    for (const state of states) {
        for (const radio of radios) {
            if (radio.state == state.value) {
                state.stationCount = parseInt(state.stationCount)+1
                state.stationCount = (state.stationCount).toString() 
            }
        }
    }
    
    _fs.writeFile("./state.json", JSON.stringify(states), function (err) {
        if (err) {
            console.log(err.message)
            return;
        } else {
            console.log("File salvato correttamente")
        }
    })
}

// nodemon --ignore 'lib/*js'