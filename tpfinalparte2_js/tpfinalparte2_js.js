//TP#Final — Video Juego Web [Etapa 2], Berruet Bianca, Com 3
//Link del video: https://www.youtube.com/watch?v=ZNhPYjxsNFM

let juego;
let musica;
//variables para cargar imagenes y música
let imgFondo, imgPlayer, imgObstaculo, imgPatrulla;

function preload() {
imgFondo = loadImage('data/fondo.jpg');
imgPlayer = loadImage('data/player.png');
imgPatrulla = loadImage('data/patrulla.png');
}

function setup() {
createCanvas(800, 400);
musica = document.getElementById("musica");
musica.volume = 0.3;
juego = new Juego();
}

function draw() {
  background(150);
  juego.actualizar();
  juego.dibujar();
}

function keyPressed() {
  juego.teclaPresionada(keyCode);
}

function mousePressed() {
  juego.clicMouse(mouseX, mouseY);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    juego.reiniciar();
    juego.iniciarMusica();
  }

  if (key === 'c' || key === 'C') {
    juego.mostrarColisiones = !juego.mostrarColisiones;
  }
}
