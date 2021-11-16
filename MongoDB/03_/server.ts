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
    let rq = collection
      .aggregate([
        { $match: { status: "A" } },
        { $group: { _id: "$cust_id", totale: { $sum: "$amount" } } }, // tabella fatta solo con queste due colonne
        { $sort: { totale: -1 } },
      ])
      .toArray();
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
    let rq = collection
      .aggregate([
        {
          $group: {
            _id: "$cust_id",
            avgAmount: { $avg: "$amount" },
            avgTotal: { $avg: { $multiply: ["$qta", "$amount"] } },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 2 - ", data);
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

// query 3
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        { $match: { gender: { $exists: true } } },
        {
          $group: {
            _id: "$gender", // indica il campo su cui fare i gruppi
            totale: { $sum: 1 },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 3 - ", data);
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

// query 4
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        {
          $group: {
            _id: { gender: "$gender" }, // indica il campo su cui fare i gruppi
            mediaVampiri: { $avg: "$vampires" },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 4 - ", data);
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

// query 5
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        { $match: { gender: { $exists: true } } },
        {
          $group: {
            _id: { gender: "$gender", hair: "$hair" },
            nEsemplari: { $sum: 1 },
          },
        },
        { $sort: { nEsemplari: -1, _id: -1 } },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 5 - ", data);
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

// query 6
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        { $match: { gender: { $exists: true } } },
        {
          $group: {
            _id: { gender: "$gender", hair: "$hair" },
            nEsemplari: { $sum: 1 },
          },
        },
        { $sort: { nEsemplari: -1, _id: -1 } },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 6 - ", data);
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
