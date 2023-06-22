import Matter, { Bodies } from "matter-js";

export class Box {
  height = 10;
  width = 250;
  box: Matter.Body | null = null;
  constructor(x: number, y: number) {
    this.box = Bodies.rectangle(x, y, this.width, this.height, {
      isStatic: true,
      friction:0.001
    });
  }
}

export class Ground {
  public box: Matter.Body | null = null;
  constructor() {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;
    this.box = Bodies.rectangle(cw / 2, ch - 10, cw, 20, { isStatic: true, friction:0.001 });
  }
}
