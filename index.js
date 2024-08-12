const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const {initDB, insertarMensaje, readMensajes, readPuntos, insertarPuntosDibujo} = require("./scripts/model.js");




const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get("/reset", (req, res) =>{
  initDB();
  res.send('Base de datos reseteada');
});

app.get("/messages", (req, res) => {
  const mensajes = readMensajes();
  res.send(mensajes);
});

app.get("/puntos", (req, res) => {
  const puntos = readPuntos();
  res.send(puntos);
});

  io.on('connection', (socket) => {
    console.log("Usuario Conectado");

  
    const mensajes = readMensajes();
    io.emit("init chat", mensajes);

  
    socket.emit("init drawing");

    socket.on('chat message', (msg) => {
        insertarMensaje(msg);
        io.emit('chat message', msg);
    });
    
    socket.on('drawing', (data) => {
        console.log(data); //llega todo ok al servidor
        insertarPuntosDibujo(data.x1, data.y1, data.x2, data.y2);
        io.emit('drawing', data);
    });
});



server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
