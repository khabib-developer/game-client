"use client";
import { useEffect, useRef } from "react";
import { Bodies, Engine, Render, World } from "matter-js";
import { Ground } from "./Box";
import { Stickman } from "./Stickman";
export const GameScene = () => {
  const scene = useRef<HTMLDivElement | null>(null);
  const engine = useRef(Engine.create());
  useEffect(() => {
    let render: Render | null = null;
    if (scene && scene.current) {
      // mount
      const cw = document.body.clientWidth;
      const ch = document.body.clientHeight;

      const stickman = new Stickman(250, ch - 200);

      render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "#ccc",
        },
      });

      const headOptions = {
        restitution: 0.5,
        friction: 0.5,
      };
      const bodyOptions = {
        restitution: 0.2,
        friction: 0.5,
      };

      // boundaries
      World.add(engine.current.world, [
        new Ground().box!,
        ...Object.values(stickman.getSticks()),
        // Bodies.rectangle(250, ch - 200, 150, 10, { isStatic: true }),
        // Bodies.rectangle(cw - 200, ch - 300, 150, 10, { isStatic: true }),
        // head,
        // body,
      ]);

      World.add(engine.current.world, [
        ...Object.values(stickman.getConstrains()),
      ]);

      // run the engine
      Engine.run(engine.current);
      Render.run(render);
    }

    // unmount
    return () => {
      if (render && engine && engine.current) {
        // destroy Matter
        Render.stop(render);
        World.clear(engine.current.world, true);
        Engine.clear(engine.current);
        render.canvas.remove();
        (render as any).canvas = null;
        (render as any).context = null;
        render.textures = {};
      }
    };
  }, []);
  return <div ref={scene} style={{ width: "100%", height: "100%" }} />;
};
