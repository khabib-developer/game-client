import Matter, { Bodies } from "matter-js";
import { Box } from "./Box";

const bodyOptions = {
  restitution: 0.2,
  friction: 0.0001,
 // isStatic: true,
  render: {
    fillStyle: "red",
    strokeStyle: "blue",
    lineWidth: 3,
  },
};
const limbOptions = {
  restitution: 0.5,
  friction: 0.5,
  render: {
    fillStyle: "red",
    strokeStyle: "blue",
    lineWidth: 3,
  },
};

export class Stickman {
  private head: Matter.Body | null = null;
  private body: Matter.Body | null = null;

  private upperArmLeft: Matter.Body | null = null;
  private upperArmRight: Matter.Body | null = null;
  private lowerArmLeft: Matter.Body | null = null;
  private lowerArmRight: Matter.Body | null = null;

  private upperLegLeft: Matter.Body | null = null;
  private lowerLegLeft: Matter.Body | null = null;
  private lowerLegRight: Matter.Body | null = null;
  private upperLegRight: Matter.Body | null = null;

  private radius: number = 20;
  private widthOfStick: number = 10;
  private heightOfBody: number = 100;

  private lengthOfMemebers: number = 80;

  private headToBody: Matter.Constraint | null = null;
  private bodyToLeftArm: Matter.Constraint | null = null;
  private bodyToRightArm: Matter.Constraint | null = null;
  private bodyToLeftLeg: Matter.Constraint | null = null;
  private bodyToRightLeg: Matter.Constraint | null = null;

  private box: Matter.Body | null = null;

  constructor(x: number, y: number) {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;
    const box = new Box(x, y);
    console.log(ch);

    this.box = box.box;
    this.lowerLegLeft = Bodies.rectangle(
      x + 20,
      y - (box.height + this.heightOfBody / 2),
      this.widthOfStick,
      this.heightOfBody,
      { ...bodyOptions, angle: -Math.PI / 12, mass: 2 }
    );
    this.lowerLegRight = Bodies.rectangle(
      x - 20,
      y - (box.height + this.heightOfBody / 2),
      this.widthOfStick,
      this.heightOfBody,
      { ...bodyOptions, angle: +Math.PI / 12, mass: 2 }
    );

    this.body = Bodies.rectangle(
      x,
      y - (box.height + (this.heightOfBody * 3) / 2),
      this.widthOfStick,
      this.heightOfBody,
        {...bodyOptions, mass: 1}
    );

    this.head = Bodies.circle(
      x,
      y - (box.height + (this.heightOfBody * 4) / 2 + this.radius + 4),
      this.radius,
        {...bodyOptions, mass: 0.2}
    );

    this.upperArmLeft = Bodies.rectangle(
      x,
      y - (box.height + 1.5 * this.heightOfBody),
      this.widthOfStick,
      this.heightOfBody,
      { ...bodyOptions, angle: -Math.PI / 4, mass: 0.5 }
    );
    this.upperArmRight = Bodies.rectangle(
      x,
      y - (box.height + 1.5 * this.heightOfBody),
      this.widthOfStick,
      this.heightOfBody,
        { ...bodyOptions, angle: Math.PI / 4, mass: 0.5 }
    );

    this.headToBody = Matter.Constraint.create({
      bodyA: this.head,
      bodyB: this.body,
      pointA: { x: -0, y: 20 },
      pointB: { x: 0, y: -50 },
      // length: 4,
       stiffness: 1,
    });

    this.bodyToLeftLeg = Matter.Constraint.create({
      bodyA: this.body,
      bodyB: this.lowerLegLeft,
      pointA: { x: 0, y: 50 },
      pointB: { x: 0, y: -50 },
      // length: 10,
    stiffness: 1,
    });

    this.bodyToRightLeg = Matter.Constraint.create({
      bodyA: this.body,
      bodyB: this.lowerLegRight,
      pointA: { x: 0, y: 50 },
      pointB: { x: 0, y: -50 },
      // length: 10,
      stiffness: 1,
    });

    this.bodyToLeftArm = Matter.Constraint.create({
      bodyA: this.body,
      bodyB: this.upperArmLeft,
      pointA: { x: -this.widthOfStick / 2, y: -this.heightOfBody / 2 },
      pointB: { x: 0, y: -this.heightOfBody / 2 },
    });

    this.bodyToRightArm = Matter.Constraint.create({
      bodyA: this.body,
      bodyB: this.upperArmRight,
      pointA: { x: this.widthOfStick / 2, y: -this.heightOfBody / 2 },
      pointB: { x: 0, y: -this.heightOfBody / 2 },
    });
  }

  getSticks() {
    return {
      head: this.head!,
      body: this.body!,
      box: this.box!,
      lowerLegRight: this.lowerLegRight!,
      lowerLegLeft: this.lowerLegLeft!,
      upperArmLeft: this.upperArmLeft!,
      upperArmRight: this.upperArmRight!,
    };
  }

  getConstrains() {
    return {
      headToBody: this.headToBody!,
      bodyToLeftArm: this.bodyToLeftArm!,
      bodyToRightArm: this.bodyToRightArm!,
      bodyToLeftLeg: this.bodyToLeftLeg!,
      bodyToRightLeg: this.bodyToRightLeg!,
    };
  }
}
