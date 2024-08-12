const fs = require("fs")
const path = require("path")
const dbpath = path.join(__dirname, "../db/mensajes.db")
const sqlite = require("better-sqlite3")
const db = new sqlite(dbpath)

function initDB(){
    const init = fs.readFileSync(path.join(__dirname, "../db/init.sql"), "utf8")
    const statements = init.split(";").filter( statement => statement.trim() !== "")
    statements.forEach(statement => {
        db.prepare(statement).run()
        //const row = db.prepare('SELECT * FROM mensajes').all();
        //console.log(row)
    })
}

function readMensajes(){
    return db.prepare("SELECT * FROM mensajes ORDER BY id DESC LIMIT 5 ").all()    
}

function readPuntos(){
    return db.prepare("SELECT * FROM puntosDibujo").all()
}

function insertarMensaje(mensaje){
    db.prepare(`INSERT INTO mensajes (mensaje) VALUES (?)`).run(mensaje);
}

function insertarPuntosDibujo(x1, y1, x2, y2) {
    db.prepare("INSERT INTO puntosDibujo (x1, y1, x2, y2) VALUES (?, ?, ?, ?)").run(x1, y1, x2, y2);
}

module.exports = {
    initDB,
    insertarMensaje,
    insertarPuntosDibujo,
    readMensajes,
    readPuntos
}