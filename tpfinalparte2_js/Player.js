class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radio = 22;
    this.velocidad = 3.5;
    this.angulo = 0; // 0 = mira hacia la derecha
  }

  mover() {
    //izquierda (flecha izquierda o tecla A)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= this.velocidad;
      this.angulo = PI;
    }
    //derecha (Flecha derecha o tecla D)
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += this.velocidad;
      this.angulo = 0;
    }
    //arriba (flecha arriba o tecla W)
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= this.velocidad;
      this.angulo = -HALF_PI;
    }
    //abajo (flecha abajo o tecla S)
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += this.velocidad;
      this.angulo = HALF_PI;
    }

    //limites de la pantalla 800x400
    this.x = constrain(this.x, this.radio, width - this.radio);
    this.y = constrain(this.y, this.radio, height - this.radio);
  }

  dibujar() {
    push();
    translate(this.x, this.y);
   rotate(this.angulo + PI); //que el sprite quede correctamente, lo gira a 180

    if (typeof imgPlayer !== 'undefined' && imgPlayer) {
      imageMode(CENTER);
      image(imgPlayer, 0, 0, 70, 70);
    } else {
      noStroke();

      // plato/bandeja grande con comida
      fill(215, 150, 245);
      ellipse(38, 0, 48, 48);

      // cuerpo/hombros
      fill(175, 55, 245);
      ellipse(0, 0, 50, 95);

      //cabeza
      fill(100, 0, 140);
      ellipse(0, 0, 46, 46);
    }

    pop();
  }
}
