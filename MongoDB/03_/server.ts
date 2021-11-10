"use strict";

import * as _http from "http";
import { Dispatcher } from "./dispatcher";
import HEADERS from "./headers.json";
import * as _mongodb from "mongodb";

const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";

// query 1
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection.aggregate([
      { $match: { status: "A" } },
      { $group: { _id: "$cust_id", totale: { $sum: "$amount" } } }, // tabella fatta solo con queste due colonne
      { $sort: { totale: -1 } }
    ]).toArray();
    rq.then(function (data) {
      console.log("Query 1b - ", "N record: " + data.length, data);
    });
    rq.catch(function (err) {
      console.log("Errore esecuzione query " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});

// query 2
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection.aggregate([
      { $match: { status: "A" } },
      { $group: { _id: "$cust_id", totale: { $sum: "$amount" } } }, // tabella fatta solo con queste due colonne
      { $sort: { totale: -1 } }
    ]).toArray();
    rq.then(function (data) {
      console.log("Query 1b - ", "N record: " + data.length, data);
    });
    rq.catch(function (err) {
      console.log("Errore esecuzione query " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});
