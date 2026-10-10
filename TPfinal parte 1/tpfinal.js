
/* TP#Final: Aventura Gráfica Interactiva Web [Etapa 1]. Comisión 3
Temática: Último día de trabajo
Subtema: sobrevivir
Integrantes:
Gianella Piccinelli (Daniel) 90907/4
Bianca Berruet, 127521/1 

video Berruet Bianca: https://youtu.be/8vEv1iEeilE

El diagrama se encuentra en la carpeta del sketch
*/

//VARIABLES GLOBALES
let pantallaActual = -1; // -1 es el menú de inicio
let historia = [];
let sonidoClick; //quedo en proceso
let musicaFondo; 
let posYAnimacion = 450; // para el scroll de créditos

function preload(){ 
  
}

function setup() {
  createCanvas(800, 450); 
   musicaFondo = new Audio('sonidos/cancion.mp3');
  musicaFondo.loop = true;  // hace que se repita 
  musicaFondo.volume = 0.2; // controla el volumen
  
//ARRAYS DE OBJETOS
  historia = [
    {
      id: 0,
      tipo: "historia",
      texto: "Llegas tarde, tu jefe te regañó y piensas que no te puede ir peor... pero ella llega. Una señora de mal carácter te pide un café macchiato y una torta sin TACC. ¿Vas a anotarlo?",
      rutaImg: "imagenes/escena0.png",
      img: null,
      opciones: [
        { texto: "SÍ, mejor lo anoto", destino: 1 },
        { texto: "NO, tengo buena memoria", destino: 2 }
      ]
    },
    {
      id: 1,
      tipo: "historia",
      texto: "Anotas el pedido de la señora en tu libreta y caminas con paso firme hacia la zona de cafetería para empezar a hacer el café.",
      rutaImg: "imagenes/escena1.png",
      img: null,
      opciones: [
        { texto: "Preparar el café", destino: 3 }
      ]
    },
    {
      id: 2,
      tipo: "historia",
      texto: "Decides no anotar el pedido confiando ciegamente en tu mente. Te das la vuelta y te diriges directo a la máquina de café.",
      rutaImg: "imagenes/escena2.png",
      img: null,
      opciones: [
        { texto: "Encender la máquina", destino: 8 }
      ]
    },
    {
      id: 3,
      tipo: "historia",
      texto: "Al hacer el café, miras tus notas con atención. Siguiendo las instrucciones precisas, preparas un macchiato con muchísima confianza.",
      rutaImg: "imagenes/escena3.png",
      img: null,
      opciones: [
        { texto: "Buscar el postre", destino: 4 }
      ]
    },
    {
      id: 4,
      tipo: "historia",
      texto: "Al volver a revisar tus valiosas notas, vas directamente a la vitrina a buscar el postre sin TACC que la señora te pidió.",
      rutaImg: "imagenes/escena4.png",
      img: null,
      opciones: [
        { texto: "Entregar el pedido completo", destino: 5 }
      ]
    },
    {
      id: 5,
      tipo: "historia",
      texto: "Le sirves el pedido perfecto. La señora consume todo sin quejarse (un milagro) y deja una pequeña propina antes de marcharse.",
      rutaImg: "imagenes/escena5.png",
      img: null,
      opciones: [
        { texto: "Terminar la jornada laboral", destino: 6 }
      ]
    },
    {
      id: 6,
      tipo: "historia",
      texto: "Termina el día. La señora cascarrabias ya se fue y tú finalmente te retiras del local. Al dar unos pocos pasos afuera, escuchas una tremenda explosión detrás de ti.",
      rutaImg: "imagenes/escena6.png",
      img: null,
      opciones: [
        { texto: "Voltearte a mirar qué pasó", destino: 7 }
      ]
    },
    {
      id: 7,
      tipo: "historia",
      texto: "Un auto se estrelló directo contra el local. Quieres correr a ayudar, pero otros dos vehículos colisionan salvajemente con el primero. En ese instante de caos absoluto, te das cuenta de que este fue, literalmente, tu último día de trabajo.",
      rutaImg: "imagenes/escena7.png",
      img: null,
      opciones: [
        { texto: "Aceptar tu destino", destino: 12 },
        { texto: "ponerte a llorar", destino: 16 }
      ]
    },
    {
      id: 8,
      tipo: "historia",
      texto: "Te paras frente a la máquina. Al intentar hacer el café, te das cuenta de que no recuerdas qué pidió la señora. Te da demasiada pena preguntar de nuevo, además tu jefe no te quita los ojos de encima... ¿Era macchiato o cortado?",
      rutaImg: "imagenes/escena8.png",
      img: null,
      opciones: [
        { texto: "Seguro era un Macchiato", destino: 9 },
        { texto: "Me la juego por un Cortado", destino: 14 }
      ]
    },
    {
      id: 9,
      tipo: "historia",
      texto: "Decides hacer el café macchiato, pero tus manos tiemblan. Lo preparas con una desconfianza tremenda.",
      rutaImg: "imagenes/escena9.png",
      img: null,
      opciones: [
        { texto: "Ir por el postre", destino: 10 }
      ]
    },
    {
      id: 10,
      tipo: "historia",
      texto: "Ahora debes elegir el postre. No recuerdas si te pidió sin TACC o sin lactosa. Buscas en el mostrador y tienes las dos opciones frente a ti. ¿Cuál vas a elegir?",
      rutaImg: "imagenes/escena10.png",
      img: null,
      opciones: [
        { texto: "Elegir la porción Sin TACC", destino: 11 },
        { texto: "Elegir la porción Sin Lactosa", destino: 13 }
      ]
    },
    {
      id: 11,
      tipo: "historia",
      texto: "No estás para nada seguro, pero decides llevarle la opción Sin TACC. Te antes a la mesa con el corazón en la boca para entregarle la bandeja.",
      rutaImg: "imagenes/escena11.png",
      img: null,
      opciones: [
        { texto: "Darle el pedido", destino: 14 }
      ]
    },

    //FINALES
    {
      id: 12,
      tipo: "final",
      texto: "FINAL 3: Lo hiciste todo perfecto, seguiste el protocolo, anotaste el pedido y atendiste con excelencia... y aun así lo perdiste absolutamente todo bajo los escombros de la cafetería.",
      rutaImg: "imagenes/final3.png",
      img: null
    },
    {
      id: 13,
      tipo: "final",
      texto: "FINAL 1: El despido inminente. Eliges el sin lactosa. La clienta da un sorbo al café y le encanta, pero al morder el postre lo siente raro. Pasan los minutos, se retuerce en su asiento y cae al suelo. Se la lleva una ambulancia. Tu jefe, furioso, te grita: ¡TE DESPIDO! y te cierra la puerta en la cara.",
      rutaImg: "imagenes/final1.png",
      img: null
    },
    {
      id: 14,
      tipo: "final",
      texto: "FINAL 2: A veces es mejor renunciar. Le entregas el pedido, la clienta da un sorbo, te escupe el café directo en la cara y se enfurece. Tu jefe aparece y empieza a gritarte también. Harto de todo, tiras la gorra al piso, gritas: ¡RENUNCIO! y te vas de ahí con dignidad.",
      rutaImg: "imagenes/final2.png",
      img: null
    },    
    {
      id: 16,
      tipo: "final",
      texto: "Te pones a llorar, ya no tienes trabajo, y lo peor, es que hiciste todo bien ¡Y sabes que es peor?... nos olvidamos ponerte un nombre. Hoy si que no era tu dia.",
      rutaImg: "imagenes/final2.png",
      img: null
    },
    {
      id: 15,
      tipo: "creditos"
    }
  ];

  //precarga automática de imágenes locales
  for (let escena of historia) {
    if (escena.rutaImg && escena.tipo !== "creditos") {
      try {
        escena.img = loadImage(escena.rutaImg);
      } catch(e) {
        console.log("Falta crear la imagen: " + escena.rutaImg);
      }
    }
  }
}

function draw() {
  background(0);
  
  if (pantallaActual === -1) {
    ejecutarMenuInicio();
  } else {
    dibujarEscena(pantallaActual);
  }
}

// pantalla del menu de inicio
function ejecutarMenuInicio() {
  background(25, 20, 20);
  
  //titulo
  fill(255, 204, 100);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("UN ULTIMO CAFE", width / 2, height / 2 - 50);
  
  //subtitulo
  fill(180);
  textSize(16);
  text("Una aventura gráfica de malas decisiones", width / 2, height / 2);
  
  //boton de comenzar centrado
  dibujarBoton(width / 2 - 120, height / 2 + 50, "COMENZAR AVENTURA");
}

function dibujarEscena(id) {
  let datos = historia.find(e => e.id === id);
  if (!datos) return;

  if (datos.tipo === "historia" || datos.tipo === "final") {
    // 1-imagen ilustrativa (superior)
    if (datos.img) {
      image(datos.img, 0, 0, 800, 300);
    } else {
      fill(50, 40, 40);
      rect(0, 0, 800, 300);
      fill(200);
      textSize(14);
      textAlign(CENTER, CENTER);
      text("[ Imagen IA: " + datos.rutaImg + " ]", width / 2, 150);
    }

    // 2-caja de interfaz inferior
    fill(25, 20, 20);
    noStroke();
    rect(0, 300, 800, 150);

    // 3-texto del guión
    fill(255);
    textSize(15);
    textAlign(LEFT, TOP);
    text(datos.texto, 30, 320, 460, 110);

    // 4-dibujar botones
    if (datos.tipo === "historia") {
      if (datos.opciones.length === 2) {
        dibujarBoton(530, 320, datos.opciones[0].texto);
        dibujarBoton(530, 380, datos.opciones[1].texto);
      } else if (datos.opciones.length === 1) {
        dibujarBoton(530, 350, datos.opciones[0].texto);
      }
    } else if (datos.tipo === "final") {
      dibujarBoton(530, 350, "Ver Créditos");
    }

  } else if (datos.tipo === "creditos") {
    ejecutarPantallaCreditos();
  }
}

//FUNCIÓN: boton con texto
function dibujarBoton(x, y, etiqueta) {
  stroke(255, 150, 150); //borde
  strokeWeight(1);
  fill(45, 35, 35);
  rect(x, y, 240, 48, 6);
  
  noStroke();
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + 120, y + 24);   //límites exactos, calculando el centro del botón (x + ancho/2, y + alto/2)
 
}

function ejecutarPantallaCreditos() {
  background(15, 10, 10);

//animacion 
  fill(255, 204, 100);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("UN MAL DÍA EN LA CAFETERÍA", width / 2, posYAnimacion);
  
  textSize(14);
  fill(200);
  text("Basado en experiencias casi reales, algo exagerado, pero estresante igual.", width / 2, posYAnimacion + 40);

  textSize(16);
  fill(255);
  text("Desarrollado por:", width / 2, posYAnimacion + 120);
  text("Gianella Piccinelli (Daniel) 90907/4", width / 2, posYAnimacion + 150);
  text("Bianca Berruet 127521/1", width / 2, posYAnimacion + 180);
  fill(128,0,128); // color
  textSize(14);
  text("Comisión 3", width / 2, posYAnimacion + 220);

  if (posYAnimacion > 60) {
    posYAnimacion -= 1.0;
  }

  // boton de reinicio
  dibujarBoton(width / 2 - 120, 380, "Volver al Menú Principal");
}

// detectar clicks
function mousePressed() {
  // 1-menu de inicio
  if (pantallaActual === -1) {
    if (mouseX >= width / 2 - 120 && mouseX <= width / 2 + 120 && mouseY >= height / 2 + 50 && mouseY <= height / 2 + 98) {
      ejecutarClick();
      
      //activar música
      if (musicaFondo) {
        musicaFondo.play().catch(e => console.log("Interacción requerida por el navegador"));
      }
      
      pantallaActual = 0; // a la primera escena del juego
    }
    return; // salir de la función para evitar falsos clics
  }

  //busca los datos de la pantalla actual en el array
  let datos = historia.find(e => e.id === pantallaActual);
  if (!datos) return;

  // 2-manejo de clics en pantallas de historia
  if (datos.tipo === "historia") {
    if (datos.opciones.length === 2) {
      //boton superior (opcion A)
      if (mouseX >= 530 && mouseX <= 770 && mouseY >= 320 && mouseY <= 368) {
        ejecutarClick();
        pantallaActual = datos.opciones[0].destino;
      } 
      //boton inferior (opcion B)
      else if (mouseX >= 530 && mouseX <= 770 && mouseY >= 380 && mouseY <= 428) {
        ejecutarClick();
        pantallaActual = datos.opciones[1].destino;
      }
    } else if (datos.opciones.length === 1) {
      //boton central
      if (mouseX >= 530 && mouseX <= 770 && mouseY >= 350 && mouseY <= 398) {
        ejecutarClick();
        pantallaActual = datos.opciones[0].destino;
      }
    }
  } 
  // 3-manejo de clics en pantallas de Final
  else if (datos.tipo === "final") {
    if (mouseX >= 530 && mouseX <= 770 && mouseY >= 350 && mouseY <= 398) {
      ejecutarClick();
      pantallaActual = 15; //a la pantalla de créditos
    }
  } 
  // 4-manejo de clics en la pantalla de creditos
  else if (datos.tipo === "creditos") {
    if (mouseX >= width / 2 - 120 && mouseX <= width / 2 + 120 && mouseY >= 380 && mouseY <= 428) {
      ejecutarClick();
      
      // frenar música
      if (musicaFondo) {
        musicaFondo.pause();
        musicaFondo.currentTime = 0; // Vuelve la canción al inicio
      }
      
      posYAnimacion = 450; // resetea la animación del TP1
      pantallaActual = -1; // al menu de inicio
    }
  }
}

function ejecutarClick() { //en proceso
  if (sonidoClick && sonidoClick.isLoaded()) {
    sonidoClick.play();
  }
}
