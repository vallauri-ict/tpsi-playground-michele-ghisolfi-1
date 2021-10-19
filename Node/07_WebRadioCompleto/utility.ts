import * as _fs from "fs"
import * as _mime from "mime"

import radios from "./radios.json"
import states from "./states.json"

// azzero file
for (const state of states) {
    state.stationcount = "0"
}

for (const radio of radios) {
    try {
        let n = parseInt(states.filter(x => x.name == radio.state)[0].stationcount)
        n++
        console.log(n)
        states.filter(x => x.value == radio.state)[0].stationcount = n.toString()
    } catch (error) { }
}

_fs.writeFile("./states.json", JSON.stringify(states), function (err) {
    if (!err) {
        console.error(err)
    } else {
        console.log("Write success")
    }
})