"use strict"

import * as _http from 'http'
import { Dispatcher } from "./dispatcher"
import HEADERS from "./headers.json"
import * as _mongodb from "mongodb"

const mongoClient = _mongodb.MongoClient
const port: number = 1337

const dispatcher = new Dispatcher()
const server = _http.createServer(function (req, res) {
    dispatcher.dispatch(req, res)
})

server.listen(port);
console.log("Server in ascolto sulla porta " + port)

// inserimento nuovo record
mongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (!err) {
        let db = client.db("5B_Studenti")
        let collection = db.collection("Studenti")
        let student = { "Nome": "Ivan", "hobbies": ["Nuoto", "Judo"], "Indirizzo": "Informatica", "Sezione": "B", "Lavoratore": false, "Residenza": { "Citta": "Genola", "Provincia": "Cueno", "CAP": "12045" }}
        
        collection.insertOne(student, function (err, data) {
            if (!err) {
                console.log(data)
            } else {
                console.log("Errore esecuzione query " + err.message)
            }
            client.close()
        })
    } else {
        console.log("Errore connessione al db")
    }
})

// modello di accesso al db
mongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (!err) {
        let db = client.db("5B_Studenti")
        let collection = db.collection("Studenti")
        collection.find().toArray(function (err, data) {
            if (!err) {
                console.log(data)
            } else {
                console.log("Errore esecuzione query " + err.message)
            }
            client.close()
        })
    } else {
        console.log("Errore connessione al db")
    }
})

