import {Chip8Emulator} from "walers";
import {memory} from "walers/walers_bg";

const CANVAS_WIDTH = 64;
const CANVAS_HEIGHT = 32;
const PIXEL_SCALE = 10;
const GRID_COLOR = "#FFFFFF";
const BG_COLOR = "#425DA8";
const PIXEL_COLOR = "#F5E647";

const emulator = Chip8Emulator.new();


const canvas = document.getElementById("display");
canvas.width = CANVAS_WIDTH * PIXEL_SCALE;
canvas.height = CANVAS_HEIGHT * PIXEL_SCALE;
canvas.style.backgroundColor = BG_COLOR;
const ctx = canvas.getContext("2d");

const drawDisplay = () => {
  ctx.fillStyle = PIXEL_COLOR;
  ctx.strokeStyle = BG_COLOR;
  for (let x = 0; x<64; x++) {
    for (let y = 0; y<32; y++) {
      if (!emulator.is_pixel_on(x, y)) {continue;}

      ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
      ctx.strokeRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
    } 
  }
}

const renderLoop = () => {
  drawDisplay();
  emulator.tick();
  requestAnimationFrame(renderLoop);
}

renderLoop();
