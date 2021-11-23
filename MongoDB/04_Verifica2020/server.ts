import * as _http from "http";
import HEADERS from "./headers.json";
import { Dispatcher } from "./dispatcher";
import * as _mongodb from "mongodb";

const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";
let port: number = 1337;

let dispatcher = new Dispatcher();

let server = _http.createServer(function (req, res) {
  dispatcher.dispatch(req, res);
});
server.listen(port);
console.log("Server in ascolto sulla porta " + port);

// Registrazione dei servizi
dispatcher.addListener("POST", "/api/servizio1", function (req, res) {
  let dataStart = new Date(req["BODY"].dataStart);
  let dataEnd = new Date(req["BODY"].dataEnd);

  // query 1 - elenco studenti
  mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
      let db = client.db(DBNAME);
      let collection = db.collection("vallauri");
      let rq = collection
        .aggregate([
          { $match: {
            dob: {$gte: dataStart, $lte: dataEnd}
          }},
          { $project: { _id: 0, nome: 1, classe: 1 }}
        ])
        .toArray((err, data) => {
          if (!err) {
            res.writeHead(200, HEADERS.json);
            res.write(JSON.stringify({ data }));
            res.end();
          } else {
            res.writeHead(200, HEADERS.text);
            res.write(JSON.stringify("Errore esecuzione query"));
            res.end();
          }
          client.close();
        });
    } else {
      console.log("Errore connessione al db");
    }
  });
});
