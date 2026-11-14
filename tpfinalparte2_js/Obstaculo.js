class Obstaculo {
  constructor(tipo, x, y, param1, param2) {
    this.tipo = tipo; // "rect" o "circ"
    this.x = x;
    this.y = y;
    
    if (this.tipo === "rect") {
      this.w = param1;
      this.h = param2;
    } else if (this.tipo === "circ") {
      this.r = param1; // radio del círculo
    }
  }

  colisionaCon(player) {
    if (this.tipo === "circ") {
      let distancia = dist(this.x, this.y, player.x, player.y);
      return distancia < (this.r + player.radio);
    } else if (this.tipo === "rect") { // encuentra el punto más cercano del rectángulo al centro del jugador
      let testX = constrain(player.x, this.x, this.x + this.w);
      let testY = constrain(player.y, this.y, this.y + this.h);
      let distancia = dist(player.x, player.y, testX, testY);
      return distancia < player.radio;
    }
    return false;
  }

  dibujar() { //obstaculos rojos
    push();
    noStroke();
    fill(255, 75, 75);
    if (this.tipo === "rect") {
      rect(this.x, this.y, this.w, this.h);
    } else if (this.tipo === "circ") {
      circle(this.x, this.y, this.r * 2);
    }
    pop();
  }
}
