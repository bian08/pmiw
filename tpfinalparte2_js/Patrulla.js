class Patrulla {
  constructor(x, y, yMin, yMax, velocidad) {
    this.x = x;
    this.y = y;
    this.yMin = yMin;
    this.yMax = yMax;
    this.velocidad = velocidad;
    this.direccion = 1; //1 baja, -1 sube
    this.radio = 24;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
    if (this.y >= this.yMax || this.y <= this.yMin) {
      this.direccion *= -1;
    }
  }

  colisionaCon(player) {
    let distancia = dist(this.x, this.y, player.x, player.y);
    return distancia < (this.radio + player.radio);
  }

  dibujar() {
    if (imgPatrulla) {
      imageMode(CENTER);
      image(imgPatrulla, this.x, this.y, 90, 50);
      imageMode(CORNER);
    } else {
      //personaje azul
      push();
      translate(this.x, this.y);
      noStroke();
      // hombros 
      fill(65, 175, 245);
      ellipse(0, 0, 95, 50);
      // cabeza
      fill(0, 85, 145);
      circle(0, 0, 46);
      pop();
    }
  }
}
