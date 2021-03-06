import express from "express";
import * as http from "http";
import * as fs from "fs";
import * as body_parser from "body-parser";
import HEADERS from "./headers.json";
// mongo
import * as mongodb from "mongodb";
const mongoClient = mongodb.MongoClient;
const CONNECTIONSTRING =
  "mongodb+srv://admin:admin@cluster0.tcmi5.mongodb.net/5B?retryWrites=true&w=majority";
const DBNAME = "5B";

let port: number = 1337;
let app = express();

// app richiamata ogni volta che arriva una richiesta
let server = http.createServer(app);

server.listen(port, () => {
  console.log("Server in ascolto sulla porta " + port);
  init();
});

let paginaErrore = "";
function init() {
  fs.readFile("./static/error.html", (err, data) => {
    if (!err) {
      paginaErrore = data.toString();
    } else {
      paginaErrore = "<h2> Risorsa non trovata </h2>";
    }
  });
}

// *********************************************************
// elenco delle routes di tipo middleware
// *********************************************************
// 1.log
app.use("/", (req, res, next) => {
  console.log(" ---> " + req.method + ": " + req.originalUrl);
  next();
});

// 2.static route
// next() in automatico quando non trova la risorsa
app.use("/", express.static("./static"));

// 3.route lettura parametri passati nella richiesta
app.use("/", body_parser.json());
app.use("/", body_parser.urlencoded({ extended: true }));

// 4.log parametri
app.use("/", (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    console.log("      Parametri GET :>> ", req.query);
  }
  if (Object.keys(req.body).length > 0) {
    console.log("      Parametri BODY :>> ", req.body);
  }
  next();
});

// *********************************************************
// elenco delle routes di risposta al client
// *********************************************************
app.use("/", (req, res, next) => {
  mongoClient.connect(CONNECTIONSTRING, (err, client) => {
    if (err) {
      res.status(503).send("Db connection error");
    } else {
      console.log("Connected successfully");
      req["client"] = client;
      next();
    }
  });
});

app.get("/api/risorsa1", (req, res, next) => {
  let unicorn = req.query.nome;
  if (unicorn) {
    let db = req["client"].db(DBNAME) as mongodb.Db;
    let collection = db.collection("unicorns");
    let rq = collection.find({ name: unicorn }).toArray();
    rq.then(function (data) {
      res.send(data);
    });
    rq.catch(function (err) {
      res.status(503).send("Query syntax error");
    });
    rq.finally(function () {
      req["client"].close();
    });
  } else {
    res.status(402).send("missing parameter: UnicornName");
    req["client"].close();
  }
});

app.patch("/api/risorsa2", (req, res, next) => {
  let unicorn = req.body.nome;
  let vampires = req.body.vampires;
  if (unicorn) {
    let db = req["client"].db(DBNAME) as mongodb.Db;
    let collection = db.collection("unicorns");
    let rq = collection.updateOne(
      { name: unicorn },
      { $inc: { vampires: vampires } }
    );
    rq.then(function (data) {
      res.send(data);
    });
    rq.catch(function (err) {
      res.status(503).send("Query syntax error");
    });
    rq.finally(function () {
      req["client"].close();
    });
  } else {
    res.status(402).send("missing parameter: UnicornName");
    req["client"].close();
  }
});

app.get("/api/risorsa3/:gender/:hair", (req, res, next) => {
  let gender = req.params.gender;
  let hair = req.params.hair;
  // if sui parametri non necessaria, perch?? se mancano non entra proprio nella route
  let db = req["client"].db(DBNAME) as mongodb.Db;
  let collection = db.collection("unicorns");
  let rq = collection
    .find({ $and: [{ gender: gender }, { hair: hair }] })
    .toArray();
  rq.then(function (data) {
    res.send(data);
  });
  rq.catch(function (err) {
    res.status(503).send("Query syntax error");
  });
  rq.finally(function () {
    req["client"].close();
  });
});

// *********************************************************
// default route(risorsa non trovata) e route gestione errori
// *********************************************************
app.use("/", (req, res, next) => {
  res.status(404);
  if (req.originalUrl.startsWith("/api/")) {
    res.send("Servizio non trovato");
  } else {
    // ?? una  pagina
    res.send(paginaErrore);
  }
});

// route gestione errori
app.use("/", (err, req, res, next) => {
  console.log("Errore codoce server ", err.message);
})
