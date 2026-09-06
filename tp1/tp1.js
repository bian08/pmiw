/*
Materia: Programación para medios interactivos orientada a las tecnologías web
Trabajo práctico N°1: Animación de sprites
Bianca Berruet, comisión número 3 (profesor David Bedoian)

La musica usada es un cover de "Twins at the carousel", Kikuo (Link: https://www.youtube.com/watch?v=g5xEfd6nbUU)
Los dibujos los hice yo basandome en un OC propio llamado ¨Elyra¨, inspirado en el juego ¨Deltarune¨. Intente hacerlo en el estilo pixelado
*/

// variables generales (arrays de animacion y maquina de estados)
let framesCaminar = [];
let framesFrente = []; 
let framesBostezo = [];
let framesDormir = [];
let framesGlobo = []; 
let elyraPuerta; 

// capas del fondo y la cama
let pantallaCarga, fondo, nubes;
let CamaAtras, CamaAdelante; 

// variable para la musica
let miMusica; 

// variables de control del personaje (medidas alrededor de 125x125 px)
let currentFrame = 0; //indice o contador actual del sprite que se esta reproduciendo 
let currentFrameGlobo = 0; // para la animación del globo
let posX = -15;  // horizontal
let posY = 220;  // vertical
  

// cantidad de sprites
let cantCaminar = 4;
let cantFrente = 4; 
let cantBostezo = 3; 
let cantDormir = 1;  
let cantGlobo = 3; 

// variables de tiempo o velocidad
let ultimoCambioTiempo = 0; // almacena el milisegundo exacto del ultimo cambio de frame para controlar la velocidad
let ultimoCambioGlobo = 0; // temporizador para la velocidad del globo
let intervaloAnimacion = 220; // milisegundos entre frames, cuanto menor es el valor, mas rapida es la animacion
let tiempoInicioEstado = 0; //registra el milisegundo exacto en el que se ingresa a un nuevo estado y asi controlar la duracion de las acciones

// maquina de estados, define el estado inicial
let estadoActual = 'CARGA'; 

// carga de imagenes y musica

function preload() {
  pantallaCarga = loadImage('pantalla_carga.png'); // ¨Elyra Dreams¨
  fondo = loadImage('fondo_completo.png'); 
  nubes = loadImage('nubes_cercanas.png');         
  CamaAtras = loadImage('cama_atras.png');      
  CamaAdelante = loadImage('cama_adelante.png');  
  elyraPuerta = loadImage('elyra_frente.png');

  // ciclos FOR, automatiza la carga de imagenes de los arrays
  for (let i = 0; i < cantCaminar; i++) {
    framesCaminar[i] = loadImage('elyra' + (i + 1) + '.png');
  }
  for (let i = 0; i < cantFrente; i++) {
    framesFrente[i] = loadImage('frente' + (i + 1) + '.png'); 
  }
  for (let i = 0; i < cantBostezo; i++) {
    framesBostezo[i] = loadImage('bostezo' + (i + 1) + '.png');
  }
  for (let i = 0; i < cantDormir; i++) {
    framesDormir[i] = loadImage('dormir' + (i + 1) + '.png'); 
  }
  for (let i = 0; i < cantGlobo; i++) {
    framesGlobo[i] = loadImage('globo' + (i + 1) + '.png');
  }
}

// configuracion general

function setup() {
  createCanvas(800, 600); 
  noSmooth(); // sirve para mantener calidad del sprite

//archivo de musica
  miMusica = new Audio('musica.mp3');
  miMusica.loop = true; 
}

// Bucle principal (tiempo + capas)
function draw() {
  if (estadoActual === 'CARGA') {
    if (pantallaCarga) image(pantallaCarga, 0, 0, 800, 600); //portada o menu
    return; 
  }

  //CAPA 1: fondo fijo (cielo, puerta, tocador)
  if (fondo) image(fondo, 0, 0, 800, 600); 
  
  //CAPA 2: base de la cama (respaldo + almohada detrás del sprite)
  if (CamaAtras) image(CamaAtras, 0, 0, 800, 600);

  // Control del tiempo del sprite, hay un avance secuencial de los fotogramas mediante millis() y congela el contador al dormir
  if (millis() - ultimoCambioTiempo > intervaloAnimacion) {
    if (estadoActual !== 'DORMIDA') {
      currentFrame++;  // avanza al siguiente frame del array 
    }
    ultimoCambioTiempo = millis();
  }

  // para el globo
  if (millis() - ultimoCambioGlobo > 250) {
    currentFrameGlobo++;
    ultimoCambioGlobo = millis();
  }

  //maquina de estados con IF y ELSE
  let arrayAnimacionActiva = null;
  let frameUnicoParaDibujar = null; //inicia en null para saber si el estado actual utiliza una secuencia de frames o una imagen individyual
                                     

  if (estadoActual === 'SALIENDO') {  // la transicion ocurre por tiempo 
    frameUnicoParaDibujar = elyraPuerta; 
    if (millis() - tiempoInicioEstado > 1000) {
      cambiarEstado('BAJANDO');
    }
    
  } else if (estadoActual === 'BAJANDO') {  //la transicion  ocurre por espacio
    intervaloAnimacion = 220; 
    posY += 1; // mueve a Elyra abajo
    arrayAnimacionActiva = framesFrente; 
    if (posY >= 280) {
      posY = 280; 
      cambiarEstado('CAMINANDO');
    }
     
  } else if (estadoActual === 'CAMINANDO') { //la transicion  ocurre por espacio
    intervaloAnimacion = 200; 
    posX += 1.8; // mueve a Elyra hacia la derecha
    arrayAnimacionActiva = framesCaminar; 
    if (posX >= 460) { 
      cambiarEstado('BOSTEZO');
    }
    
  } else if (estadoActual === 'BOSTEZO') { // la transicion ocurre por tiempo 
    intervaloAnimacion = 320; 
    arrayAnimacionActiva = framesBostezo; 
    if (millis() - tiempoInicioEstado > 2600) {
      cambiarEstado('ACOSTANDOSE'); 
    }

  } else if (estadoActual === 'ACOSTANDOSE') { //la transicion  ocurre por espacio
    intervaloAnimacion = 200;
    posX += 1.8; 
    arrayAnimacionActiva = framesCaminar; 
    if (posX >= 565) { 
      posX = 565; 
      cambiarEstado('DORMIDA'); 
    }
    
  } else if (estadoActual === 'DORMIDA') {
    currentFrame = 0;  //mantiene seleccionado el frame de la animacion de dormir
    arrayAnimacionActiva = framesDormir;
  }

  let imgFinalParaMostrar;  // evalua si el estado activo de la maquina está usando un array con una secuencia de imágenes o una foto estatica
  if (arrayAnimacionActiva !== null) { //si hay un array activo, se reproduce su animacion
    currentFrame = cicloSeguro(currentFrame, arrayAnimacionActiva);
    imgFinalParaMostrar = arrayAnimacionActiva[currentFrame];
  } else {
    imgFinalParaMostrar = frameUnicoParaDibujar;  //si no hay un array, se usa una imagen fija
  }

  //CAPA 3: sprites + globo alineados
  if (estadoActual === 'DORMIDA') {
    // 1 elyra acostada y se mantiene visible en la cama
    mostrarPersonaje(imgFinalParaMostrar, posX, posY - 15, 250, 250);
    
    // 2 aparece el globo continuamente sobre su cabeza
    currentFrameGlobo = cicloSeguro(currentFrameGlobo, framesGlobo);
    let flotadoGlobo = sin(frameCount * 0.05) * 8; 
    
    if (framesGlobo[currentFrameGlobo]) {
      image(framesGlobo[currentFrameGlobo], 640, 220 + flotadoGlobo, 100, 100);
    }
  } else {
    // muestra a Elyra 
    mostrarPersonaje(imgFinalParaMostrar, posX, posY, 250, 250);
  }

  //CAPA 4: la manta arriba de Elyra
  if (CamaAdelante) image(CamaAdelante, 0, 0, 800, 600);

  //CAPA 5: efecto de balanceo en las nubes
  let balanceoX = sin(frameCount * 0.02) * 6;
  if (nubes) {
    image(nubes, balanceoX, 0, 800, 600);
  }
  reiniciar(); 
}

//Funciones propias (parametros,retorno)

function mostrarPersonaje(imgSprite, x, y, ancho, alto) {    // Función reutilizable para dibujar cualquier sprite en una posición y tamaño especifficos
  if (imgSprite) image(imgSprite, x, y, ancho, alto);
}

function cambiarEstado(nuevoEstado) { //cambia el estado actual y reinicia los contadores para que la nueva animacion comience desde su primer sprite
  estadoActual = nuevoEstado;
  tiempoInicioEstado = millis(); // guarda el momento en que comenzo el estado
  currentFrame = 0;              // reinicia del personaje
  currentFrameGlobo = 0;         // reinicia del globo
}

function reiniciar() {
  if (keyIsDown(82)) { // monitorea el teclado hasta la tecla "R", que su codigo es 82
    if (miMusica) {
      miMusica.pause();
      miMusica.currentTime = 0; // control del estado de audio
    }
    posX = -15; //devuelve al personaje
    posY = 220; //reestablece la altura inicial
    cambiarEstado('CARGA'); 
  }
}

function cicloSeguro(framePedido, arrayRevisado) { // cuenta la cantidad de frames y usa el operador módulo (%) 
                                                   // para volver al frame 0 cuando se llega al final del array
  let contador = 0;
  for (let i = 0; i < arrayRevisado.length; i++) contador++;
  return framePedido % contador; 
}

function mousePressed() { //si tocas dentro del boton "Start", activa la musica y arranca la animacion
  if (estadoActual === 'CARGA') {
    if (mouseX > 185 && mouseX < 405 && mouseY > 400 && mouseY < 465) { //compara la posicion del cursor con las coordenadas del boton starrt
      if (miMusica) {
        miMusica.play().catch(e => console.log("Audio bloqueado")); //intentar evitar que se bloquee el audio por el navegador
      }
      cambiarEstado('SALIENDO');
    }
  }
}
