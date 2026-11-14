class Juego {
  constructor() {
    this.estado = "INICIO";
    this.obstaculos = [];
    this.mostrarColisiones = false; // oculta las colisiones y la meta
    this.iniciarNivel();
  }
 iniciarMusica() {
    if (musica) {
      musica.currentTime = 0;
      musica.play();
    }
  }
  
  iniciarNivel() {
    this.obstaculos = [];
    //posicion inicial del mesero (abajo al centro-izquierda)
    this.player = new Player(435, 345);
    //meta invisible ubicada justo frente a la clienta rubia (arriba a la derecha)
    this.meta = new Meta(700, 148, 28);
    //personaje movil en el pasillo
    this.patrulla = new Patrulla(540, 50, 50, 165, 1.2);

  //COLISIONES 
    //mostrador azul oscuro (arriba a la izquierda)
    this.obstaculos.push(new Obstaculo("rect", 0, 0, 212, 190));
    this.obstaculos.push(new Obstaculo("rect", 40, 190, 152, 26));
    //mesa marron redonda y banqueta rosa (arriba izquierda)
    this.obstaculos.push(new Obstaculo("circ", 276, 52, 54));
    this.obstaculos.push(new Obstaculo("circ", 222, 126, 23));
    //mesa beige redonda y clienta (arriba derecha)
    this.obstaculos.push(new Obstaculo("circ", 648, 72, 50));
    this.obstaculos.push(new Obstaculo("circ", 726, 145, 34));
    //barra de cocina (caja registradora + mesada violeta + cocina)
    this.obstaculos.push(new Obstaculo("rect", 294, 210, 106, 78)); // caja registradora
    this.obstaculos.push(new Obstaculo("rect", 400, 200, 250, 62)); // mesada violeta
    this.obstaculos.push(new Obstaculo("rect", 630, 224, 72, 176)); // hornallas
    //dos banquetas rosas (abajo a la derecha)
    this.obstaculos.push(new Obstaculo("circ", 745, 254, 28));
    this.obstaculos.push(new Obstaculo("circ", 745, 342, 28));
  }

  reiniciar() {
    this.iniciarNivel();
    this.estado = "JUGANDO";
  }

  actualizar() {
    if (this.estado === "JUGANDO") {
      this.player.mover();
      this.patrulla.mover();
      this.verificarColisiones();
    }
  }
verificarColisiones() {  // comprueba si el jugador choca con algun obstaculo
    for (let i = 0; i < this.obstaculos.length; i++) {
      if (this.obstaculos[i].colisionaCon(this.player)) {
        this.estado = "PERDISTE";
        if (musica) {
          musica.pause();
          musica.currentTime = 0;
        }
        return;
      }
    }
    //comprueba si choca con la patrulla
    if (this.patrulla.colisionaCon(this.player)) {
      this.estado = "PERDISTE";

      if (musica) {
        musica.pause();
        musica.currentTime = 0;
      }
      return;
    }
    //comprueba si llego a la meta
    if (this.meta.colisionaCon(this.player)) {
      this.estado = "GANASTE";

      if (musica) {
        musica.pause();
        musica.currentTime = 0;
      }
    }
  }

  dibujar() {
    if (this.estado === "INICIO") {
      this.pantallaInicio();
    } else if (this.estado === "INSTRUCCIONES") {
      this.pantallaInstrucciones();
    } else if (this.estado === "JUGANDO") {
      //dibujo del fondo
      if (typeof imgFondo !== 'undefined' && imgFondo) {
        image(imgFondo, 0, 0, width, height);
      }

      //solo muestra las colisiones y la meta si presionas 'C'
      if (this.mostrarColisiones) {
        for (let i = 0; i < this.obstaculos.length; i++) {
          this.obstaculos[i].dibujar();
        }
        this.meta.dibujar();
      }
      //personajes que se mueven
      this.patrulla.dibujar();
      this.player.dibujar();

      this.dibujarBoton(705, 10, 85, 25, "Reiniciar");
    } else if (this.estado === "GANASTE") {
      this.pantallaFinal("¡PEDIDO ENTREGADO!", color(60, 180, 75));
    } else if (this.estado === "PERDISTE") {
      this.pantallaFinal("¡CHOCASTE! PERDISTE", color(220, 50, 50));
    } else if (this.estado === "CREDITOS") {
      this.pantallaCreditos();
    }
  }

  pantallaInicio() {
    background(40, 44, 52);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("ENTREGA EL PEDIDO", width / 2, 90);

    this.dibujarBoton(300, 170, 200, 40, "JUGAR");
    this.dibujarBoton(300, 225, 200, 40, "INSTRUCCIONES");
    this.dibujarBoton(300, 280, 200, 40, "CRÉDITOS");
  }

  pantallaInstrucciones() {
    background(40, 44, 52);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("INSTRUCCIONES", width / 2, 60);

    textSize(18);
    text("Lleva al mesero al cliente sin chocarte con nada.", width / 2, 145);

    textSize(15);
    text("Usa las FLECHAS o WASD para moverte.", width / 2, 195);

    this.dibujarBoton(300, 300, 200, 40, "VOLVER");
  }

  pantallaCreditos() {
    background(40, 44, 52);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("CRÉDITOS", width / 2, 70);

    textSize(16);
    text("TP Final - Etapa 2 (PMIW)", width / 2, 140);
    text("Alumno/a: Gianella Piccinelli (90907/4)", width / 2, 180);
    text("Alumna: Berruet, Bianca (127521/1)", width / 2, 220);

    this.dibujarBoton(300, 300, 200, 40, "VOLVER");
  }

  pantallaFinal(mensaje, colorFondo) {
    background(colorFondo);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(mensaje, width / 2, 130);

    this.dibujarBoton(300, 210, 200, 45, "REINICIAR (R)");
    this.dibujarBoton(300, 270, 200, 40, "MENÚ PRINCIPAL");
  }

  dibujarBoton(x, y, w, h, texto) {
    fill(255);
    stroke(0);
    rect(x, y, w, h, 8);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(texto, x + w / 2, y + h / 2);
  }

   clicMouse(mx, my) {
    if (this.estado === "INICIO") {
      if (this.sobreBoton(mx, my, 300, 170, 200, 40)) {
        this.reiniciar();
        this.iniciarMusica();
      }
      else if (this.sobreBoton(mx, my, 300, 225, 200, 40)) {
        this.estado = "INSTRUCCIONES";
      }
      else if (this.sobreBoton(mx, my, 300, 280, 200, 40)) {
        this.estado = "CREDITOS";
      }

    } else if (this.estado === "INSTRUCCIONES" || this.estado === "CREDITOS") {
      if (this.sobreBoton(mx, my, 300, 300, 200, 40)) {
        this.estado = "INICIO";
      }

    } else if (this.estado === "JUGANDO") {
      if (this.sobreBoton(mx, my, 705, 10, 85, 25)) {
        this.reiniciar();
        this.iniciarMusica();
      }

    } else if (this.estado === "GANASTE" || this.estado === "PERDISTE") {
      if (this.sobreBoton(mx, my, 300, 210, 200, 45)) {
        this.reiniciar();
        this.iniciarMusica();
      }
      else if (this.sobreBoton(mx, my, 300, 270, 200, 40)) {
        this.estado = "INICIO";
      }
    }
  }

  sobreBoton(mx, my, x, y, w, h) {
    return mx > x && mx < x + w && my > y && my < y + h;
  }
}
