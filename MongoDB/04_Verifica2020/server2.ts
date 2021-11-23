import * as _http from "http";
import * as _mongodb from "mongodb";

const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";
let port: number = 1337;

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("vallauri");
    let rq = collection
      .aggregate([
        {
          $project: {
            mIta: { $avg: "$italiano" },
            mSis: { $avg: "$sistemi" },
            mInf: { $avg: "$informatica" },
            mMat: { $avg: "$matematica" },
            classe: 1,
          },
        },
        {
          $project: {
            mediaMaterie: {
              $avg: ["$mIta", "$mSis", "$mInf", "$mMat"],
            },
            classe: 1,
          },
        },
        {
          $group: {
            _id: "$classe",
            mediaClasse: { $avg: { $round: ["$mediaMaterie", 2] } },
          },
        },
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query:", data);
    });
    rq.catch(function (err) {
      console.log("Errore query: " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("vallauri");
    let rq = collection
      .aggregate([
        { $match: { genere: "f", classe: "4A" } },
        { $set: { informatica: { $concatArrays: ["$informatica", [7]] } } },
      ])
      // updateMany({"genere": "f", "classe": "4A"}, {"$push": {"informatica": 7}})
      .toArray();
    rq.then(function (data) {
      console.log("Query:", data);
    });
    rq.catch(function (err) {
      console.log("Errore query: " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("vallauri");
    let rq = collection.deleteMany({
      classe: "3B",
      sistemi: { $in: [3] },
    });
    rq.then(function (data) {
      console.log("Query:", data);
    });
    rq.catch(function (err) {
      console.log("Errore query: " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
  if (!err) {
    let db = client.db(DBNAME);
    let collection = db.collection("vallauri");
    let rq = collection
      .aggregate([
        {
          $group: {
            _id: "$classe",
            assenze: { $sum: "$assenze" },
          },
        },
        { $sort: {assenze: -1}}
      ])
      .toArray();
    rq.then(function (data) {
      console.log("Query:", data);
    });
    rq.catch(function (err) {
      console.log("Errore query: " + err.message);
    });
    rq.finally(function () {
      client.close();
    });
  } else {
    console.log("Errore connessione al db");
  }
});
