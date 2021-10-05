
const _http = require("http");
const _url = require("url");
const _colors = require("colors");
const HEADERS = require("./headers.json"); // ./ cartella corrente

const port = 1337; // porta storica node js

// ogni volta che arriva una richiesta viene eseguita questa callback
// req = request -> contiene informarzini richiesta
// res = response -> qui viene scritta la risposta che poi viene passata la client
let server=_http.createServer(function (req, res) { // restituisce puntatore
    /* // PRIMA PROVA
    res.writeHead(200, HEADERS.text); // 200 -> tutto ok, risposta testuale
	res.write("Richiesta eseguita correttamente");
    res.end();
	console.log("richiesta eseguita"); */
    
    //    _url.parse(req.url, true); // true -> parsifica anche i parametri

    // lettura di metodo risorsa e parametri
    let url = _url.parse(req.url, true); 
    let metodo = req.method;
    let risorsa = url.pathname;
    let parametri = url.query; // json
    
    let dominio = req.headers.host;

    res.writeHead(200, HEADERS.html);
    res.write("<h1> Informazioni relative alla richiesta ricevuta </h1>")
    res.write("<br>");
    res.write(`<p><b> Risorsa richiesta: </b> ${risorsa}</p>`)
    res.write(`<p><b> Metodo: </b> ${metodo}</p>`)
    res.write(`<p><b> Parametri: </b> ${JSON.stringify(parametri)}</p>`)
    res.write(`<p><b> Dominio: </b> ${dominio}</p>`)
    res.write(`<p> Grazie per la richiesta <p>`)
    
    res.end();
    console.log("Richiesta ricevuta: " + req.url.yellow);
});

// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce
server.listen(port); // avvia il server. Si aspetta come param porta, indirizzo ip
console.log("server in ascolto sulla porta " + port);