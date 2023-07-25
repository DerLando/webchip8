import {Chip8Emulator} from "walers";
import {memory} from "walers/walers_bg";
import './style.css';

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

const memoryTableAddresses = [
  document.getElementById("mem_ptr_-4"),
  document.getElementById("mem_ptr_-3"),
  document.getElementById("mem_ptr_-2"),
  document.getElementById("mem_ptr_-1"),
  document.getElementById("mem_ptr_0"),
  document.getElementById("mem_ptr_1"),
  document.getElementById("mem_ptr_2"),
  document.getElementById("mem_ptr_3"),
  document.getElementById("mem_ptr_4"),
];
const memoryTableValues = [
  document.getElementById("mem_val_-4"),
  document.getElementById("mem_val_-3"),
  document.getElementById("mem_val_-2"),
  document.getElementById("mem_val_-1"),
  document.getElementById("mem_val_0"),
  document.getElementById("mem_val_1"),
  document.getElementById("mem_val_2"),
  document.getElementById("mem_val_3"),
  document.getElementById("mem_val_4"),
];
const format_number_as_hex = (number) => {
  return number.toString(16).toUpperCase();
}
const updateMemory = () => {
  let memoryDump = emulator.dump_memory_u16();
  let pc = emulator.dump_pc() - 8;
  for (let i = 1; i < memoryDump.length - 1; i++) {
    memoryTableAddresses[i - 1].innerHTML = format_number_as_hex(pc);  
    memoryTableValues[i - 1].innerHTML = format_number_as_hex(memoryDump[i]);  
    pc += 2;
  }
}

document.addEventListener('keydown', (event) => {
  var keyValue = event.key;
  var codeValue = event.code;
  console.log("keyValue: " + keyValue);
  console.log("codeValue: " + codeValue);
  
  if (codeValue === "KeyP") {handlePauseToggle();}
}, false);

let animationId = null;

const renderLoop = () => {
  updateMemory();
  drawDisplay();
  emulator.tick();
  animationId = requestAnimationFrame(renderLoop);
}

const isPaused = () => {
  return animationId === null;
};

const playPauseButton = document.getElementById("play-pause");

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶️";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", event => {
  handlePauseToggle();
});

const handlePauseToggle = () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
  if (isPaused()) {
    play();
  } else {
    pause();
  }
}


play();
pause();