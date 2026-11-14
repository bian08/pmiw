class Meta {
  constructor(x, y, radio) {
    this.x = x;
    this.y = y;
    this.radio = radio;
  }
  colisionaCon(player) {
    let distancia = dist(this.x, this.y, player.x, player.y);
    return distancia < (this.radio + player.radio);
  }

  dibujar() {
    if (imgMeta) {
      imageMode(CENTER);
      image(imgMeta, this.x, this.y, this.radio * 2, this.radio * 2);
      imageMode(CORNER);
    } else {
      //dibujo de la meta en verde
      push();
      noStroke();
      fill(105, 240, 75);
      circle(this.x, this.y, this.radio * 2);
      pop();
    }
  }
}
