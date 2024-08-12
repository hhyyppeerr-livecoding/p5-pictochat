DROP TABLE IF EXISTS mensajes;
DROP TABLE IF EXISTS puntosDibujo;

CREATE TABLE mensajes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mensaje TEXT NOT NULL
);
CREATE TABLE puntosDibujo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x1 REAL NOT NULL,
    y1 REAL NOT NULL,
    x2 REAL NOT NULL,
    y2 REAL NOT NULL
);

-- INSERT INTO mensajes (mensaje) VALUES ('Hola');
-- INSERT INTO puntosDibujo (x1, y1, x2, y2) VALUES (100, 100, 200, 250);
