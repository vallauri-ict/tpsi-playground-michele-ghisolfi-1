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

// query 7
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("unicorns");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        {
          $group: {
            _id: {},
            media: { $avg: "$vampires" },
          },
        },
        { $project: { _id: 0, media: { $round: "$media" } } },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 7 - ", data);
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

// query 8
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("quizzes");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        {
          $project: {
            quizAvg: { $avg: "$quizzes" },
            labAvg: { $avg: "$labs" },
            examAvg: { $avg: ["$midTerm", "$final"] },
          },
        },
        {
          $project: {
            quizAvg: { $round: ["$quizAvg", 1] },
            labAvg: { $round: ["$labAvg", 1] },
            examAvg: { $round: ["$examAvg", 1] },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 8 - ", data);
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

// query 9
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("quizzes");
    // nome di campi sempre con $ se usati come valore (a sinistra)
    let rq = collection
      .aggregate([
        {
          $project: {
            quizAvg: { $avg: "$quizzes" },
            labAvg: { $avg: "$labs" },
            examAvg: { $avg: ["$midTerm", "$final"] },
          },
        },
        {
          $project: {
            quizAvg: { $round: ["$quizAvg", 1] },
            labAvg: { $round: ["$labAvg", 1] },
            examAvg: { $round: ["$examAvg", 1] },
          },
        },
        {
          $group: {
            _id: {},
            mediaQuiz: { $avg: "$quizAvg" },
            mediaLab: { $avg: "$labAvg" },
            mediaExam: { $avg: "$examAvg" },
          },
        },
        {
          $project: {
            mediaQuiz: { $round: ["$mediaQuiz", 2] },
            mediaLab: { $round: ["$mediaLab", 2] },
            mediaExam: { $round: ["$mediaExam", 2] },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 9 - ", data);
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

// query 10
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("students");
    let regex = new RegExp("F", "i");
    let rq = collection
      .aggregate([
        { $project: { genere: 1, nome: 1, mediaVoti: { $avg: "$voti" } } },
        { $match: { genere: { $regex: regex } } },
        { $sort: { mediaVoti: -1 } },
        { $skip: 1 },
        { $limit: 1 },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 10 - ", data);
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

// query 11
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("orders");
    let rq = collection
      .aggregate([
        { $project: { status: 1, nDettagli: 1 } },
        { $unwind: "$nDettagli" },
        { $group: { _id: "$status", sommaDettagli: { $sum: "$nDettagli" } } },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query 11 - ", data);
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

// query 12
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("students");
    let rq = collection
      .find({ $expr: { $gte: [{ $year: "$nato" }, 2000] } })
      .toArray();
    rq.then(function (data) {
      console.log("Query 12 - ", data);
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
