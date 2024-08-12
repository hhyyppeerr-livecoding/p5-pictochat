const socket = io();
const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto');
const messages = document.getElementById('mensajes');
let pincelSize = 10;
let pincelColor = '#000000';
let prevMouseX;
let prevMouseY;
let isDragging = false;
let isMouseMoving = false;

$(function () {
  $("section").draggable({
    start: function () {
      isDragging = true;
    },
    drag: function () {},
    stop: function () {
      isDragging = false;
    },
  });
});

function toggleChat(){
  const lista = document.querySelector("ul")
  const form = document.querySelector("form")
  lista.hidden = !lista.hidden;
  if(form.style.display === "none"){
    form.style.display = "flex";
  } else {
    form.style.display = "none"
  }
}

function toggleTool(){
  const herramientas = document.getElementById("herramientas");
  const form1 = herramientas.querySelector("form");
  herramientas.hidden = !herramientas.hidden;
  if(form1.style.display === "none"){
    form1.style.display = "flex";
  } else {
    form1.style.display = "none"
  }
}

document.addEventListener('mousemove', function (event) {
  if (mouseIsPressed && !isDragging) {
    if (event.movementX !== 0 || event.movementY !== 0) {
      isMouseMoving = true;
    }
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (mouseIsPressed && !isDragging && isMouseMoving) {
    const data = {
      x1: prevMouseX,
      y1: prevMouseY,
      x2: mouseX,
      y2: mouseY,
      size: pincelSize,
      color: pincelColor,
    };
    socket.emit('drawing', data);

    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

socket.on('drawing', (data) => {
  stroke(data.color);
  strokeWeight(data.size);
  line(data.x1, data.y1, data.x2, data.y2);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
/*
socket.on('init chat', (mensajes) => {
  mensajes.reverse().forEach(mensajeOBJ => {
    const li = document.createElement("li");
    if (mensajeOBJ.mensaje.startsWith("https://")) {
      const link = document.createElement("a");
      link.href = mensajeOBJ.mensaje;
      link.textContent = mensajeOBJ.mensaje;
      li.appendChild(link);
    } else {
      li.textContent = mensajeOBJ.mensaje;
    }
    messages.appendChild(li);
  });
});
*/

fetch('/puntos')
.then(response => response.json())
.then(coord =>{
  console.log(coord)
  coord.forEach(punto => {
    //stroke(punto.color);
    //strokeWeight(punto.size);
    line(punto.x1, punto.y1, punto.x2, punto.y2);
  });
});

fetch('/messages')
.then(response => response.json())
.then(mensajes =>{
  mensajes.reverse().forEach(mensajeOBJ => {
    const li = document.createElement("li");
    if (mensajeOBJ.mensaje.startsWith("https://")) {
      const link = document.createElement("a");
      link.href = mensajeOBJ.mensaje;
      link.textContent = mensajeOBJ.mensaje;
      li.appendChild(link);
    } else {
      li.textContent = mensajeOBJ.mensaje;
    }
    messages.appendChild(li);
  });
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function getRange() {
  const rango = document.querySelector("#brushSizeInput").value;
  pincelSize = rango;
}

function getColor() {
  const color = document.querySelector("#InputColor").value;
  pincelColor = color;
}

function mousePressed() {
  if (!isDragging) {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}
