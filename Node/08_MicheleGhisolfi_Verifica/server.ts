"use strict"

import * as _http from 'http'
import * as _url from 'url'
import * as _fs from 'fs'
import { Dispatcher } from "./dispatcher"

import HEADERS from "./headers.json"
import facts from "./facts.json";

let dispatcher = new Dispatcher()
let port: number = 1337

let server = _http.createServer(function (req, res) {
    dispatcher.dispatch(req, res)
})
server.listen(port)
console.log("Server in ascolto sulla porta " + port)

let categorie = []
// const categories = ["career", "money", "explicit", "history", "celebrity", "dev", "fashion", "food", "movie", "music", "political", "religion", "science", "sport", "animal", "travel"]

const icon_url = "https://assets.chucknorris.host/img/avatar/chuck-norris.png";
const api_url = "https://api.chucknorris.io"
const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"]


dispatcher.addListener("GET", "/api/categories", function (req, res) {
    categorie = []

    for (const item of facts.facts) {
        for (const cat of item.categories) {
            //console.log(cat.toString())
            if (!categorie.includes(cat.toString())) {
                categorie.push(cat.toString())
            }
        }
    }

    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify({ "cat": categorie }))
    res.end();
})



dispatcher.addListener("GET", "/api/facts", function (req, res) {
    let cat = req["GET"].cat
    let json = facts.facts.filter(x => x.categories.includes(cat))
    /* TODO: sort json */
    res.writeHead(200, HEADERS.json)
    res.write(JSON.stringify({ "states": json }))
    res.end();
})

dispatcher.addListener("POST", "/api/rate", function (req, res) {
    let ids = req["BODY"].ids
    for (const item of ids) {
        let n = facts.facts.filter(x => x.id == item)[0].score++
        console.log(n)
    }
    _fs.writeFile("./facts.json", JSON.stringify(facts), function (err) {
        if (!err) {
            res.writeHead(200, HEADERS.json)
            res.write(JSON.stringify({ "ris": "OK" }))
            res.end();
        } else {
            console.log(err.message)
            return;
        }
    })
})

dispatcher.addListener("POST", "/api/add", function (req, res) {
    let value = req["BODY"].value
    let cat = req["BODY"].cat
    let d = new Date().toString()

    let cicla = true
    // controllo id esistente 
    let id = []
    for (let i = 0; i < facts.facts.length; i++) {
        const element = facts.facts[i];
        id.push(element)
    }
    let result
    do {
        result = ""
        for ( var j = 0; j < 22; j++ ) {
            result += base64Chars[Math.floor(Math.random() * 
            base64Chars.length-1)];
        }
        if (id.includes(result)) {
            cicla = false;
        }
    } while (cicla);

    let json = {
        "categories": [cat],
        "created_at": d,
        "icon_url": icon_url,
        "id": result,
        "updated_at": d,
        "url": api_url,
        "value": value,
        "score": 0
    }

    facts.facts.push(json)

    _fs.writeFile("./facts.json", JSON.stringify(facts), function (err) {
        if (!err) {
            res.writeHead(200, HEADERS.json)
            res.write(JSON.stringify({ "ris": "OK" }))
            res.end();
        } else {
            console.log(err.message)
            return;
        }
    })
})




