import React from "react";

const Pulse = () => {
  let POINTS = [[0, 0]];
  for (let i = 0; i < 10; i++) {
    if (i % 2) {
      let rand_x = Math.floor(Math.random() * 250 + i + 10);
      let rand_y =
        Math.floor(Math.random() * 40) * (Math.round(Math.random()) ? 1 : -1);
      POINTS.push([rand_x, rand_y]);
    } else {
      POINTS.push([Math.floor(Math.random() * 250 + i + 10), 0]);
    }
  }
  POINTS.sort(function (a, b) {
    if (a[0] === b[0]) return a[0] - b[0];
    return a[0] - b[0];
  });

  const TOTAL_DISTANCE = POINTS.reduce(([x1, y1, distance = 0], [x2, y2]) => {
    distance += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return [x2, y2, distance];
  })[2];

  const DPR = window.devicePixelRatio || 1;

  const DEFAULTS = {
    WIDTH: 200,
    HEIGHT: 100,
    LINE_WIDTH: 3,
    DURATION: 1000,
    REDRAW_DELAY: 10,
    PULSE_COLOR: "rgba(50, 139, 246, 1)",
    LINE_COLOR: "rgba(50, 139, 246, 0.2)",
  };

  let preprocess = ({
    size = DEFAULTS.WIDTH,
    strength = DEFAULTS.LINE_WIDTH,
    duration = DEFAULTS.DURATION,
    pulseColor = DEFAULTS.PULSE_COLOR,
    lineColor = DEFAULTS.LINE_COLOR,
  } = {}) => {
    const scale = size / DEFAULTS.WIDTH;
    const lineWidth = strength * DPR * scale;
    const width = DEFAULTS.WIDTH * DPR * scale;
    const height = DEFAULTS.HEIGHT * DPR * scale;
    const stepLength = TOTAL_DISTANCE / ((duration / 1000) * 60);
    const redrawDelay = DEFAULTS.REDRAW_DELAY * (duration / DEFAULTS.DURATION);
    const delayFrameCount = (redrawDelay / 1000) * 60;

    const origin = {
      x: lineWidth,
      y: height / 2,
    };

    // build path
    const path = [];

    let offsetPoints = ([x, y]) => {
      return [origin.x + x * DPR * scale, origin.y - y * DPR * scale];
    };

    POINTS.reduce((pre, cur) => {
      let [x1, y1] = pre;
      let [x2, y2] = cur;

      let disX = x2 - x1;
      let disY = y2 - y1;

      let distance = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
      let length = distance / stepLength;

      for (let i = 0; i < length; i++) {
        path.push(
          offsetPoints([x1 + (disX * i) / length, y1 + (disY * i) / length])
        );
      }

      return cur;
    });

    path.push(offsetPoints(POINTS[POINTS.length - 1]));

    // paint
    const frameCount = path.length;
    const canvasWidth = width + 2 * lineWidth; // little padding
    const canvasHeight = height;
    const result = [];

    let getCanvas = () => {
      // create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = ctx.lineCap = "round";

      return { canvas, ctx };
    };

    let drawLine = (ctx) => {
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(origin.x + width, origin.y);
      ctx.stroke();
    };

    let paintFrame = (ctx, frame) => {
      frame = Math.min(frameCount - 1, Math.max(frame, 1));

      let [curX, curY] = path[frame];
      let [preX, preY] = path[frame - 1];

      ctx.quadraticCurveTo(preX, preY, (preX + curX) / 2, (preY + curY) / 2);
    };

    let fixLast = (ctx, lastFrame) => {
      let [lastX, lastY] = path[lastFrame];

      ctx.lineTo(lastX, lastY);
    };

    // dir: 1 draw, -1 withdraw
    let draw = (frame, direction = 1) => {
      const { canvas, ctx } = getCanvas();
      const count = direction === 1 ? frame : frameCount;

      drawLine(ctx);

      ctx.beginPath();
      ctx.strokeStyle = pulseColor;

      for (let i = direction === 1 ? 1 : frame; i < count; i++) {
        paintFrame(ctx, i);
      }

      fixLast(ctx, count - 1);

      ctx.stroke();
      result.push(canvas);
    };

    // draw
    for (let frame = 1; frame <= frameCount; frame++) {
      draw(frame, 1);
    }

    // withdraw delay
    for (let i = 0; i < delayFrameCount; i++) {
      draw(frameCount, 1);
    }

    // withdraw
    for (let frame = 1; frame <= frameCount; frame++) {
      draw(frame, -1);
    }

    // redraw delay
    for (let i = 0; i < delayFrameCount; i++) {
      draw(frameCount, -1);
    }

    let context = {
      cacheCanvas: result,
      width: canvasWidth,
      height: canvasHeight,
    };

    return context;
  };

  let drawPulse = (options = {}) => {
    const { cacheCanvas, width, height } = preprocess(options);
    const total = cacheCanvas.length;

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width / DPR}px`;
    canvas.style.height = `${height / DPR}px`;

    let frame = 0;

    let animate = () => {
      if (frame === total) {
        frame = 0;
      }

      let cache = cacheCanvas[frame];

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(cache, 0, 0, width, height, 0, 0, width, height);

      frame++;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const refHandler = (canvas) => {
    if (!canvas) return;

    drawPulse();
  };
  return (
    <canvas
      ref={refHandler}
      className="bg-base-300 rounded-xl border-gray-400 border-2"
    ></canvas>
  );
};

export default React.memo(Pulse);
