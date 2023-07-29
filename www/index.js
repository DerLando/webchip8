import {Chip8Emulator} from "walers";
import {memory} from "walers/walers_bg";
import './style.css';

var TICKS_PER_FRAME = 1;
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = PIXEL_COLOR;
  ctx.strokeStyle = BG_COLOR;
  for (let x = 0; x<CANVAS_WIDTH; x++) {
    for (let y = 0; y<CANVAS_HEIGHT; y++) {
      if (!emulator.is_pixel_on(x, y)) {continue;}

      ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
      ctx.strokeRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
    } 
  }
}

const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
sliderValue.textContent = slider.value;
slider.oninput = function() {
  sliderValue.textContent = this.value;
  TICKS_PER_FRAME = this.value;
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
  document.getElementById("mem_ptr_5"),
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
  document.getElementById("mem_val_5"),
];
const format_number_as_hex = (number) => {
  return number.toString(16).toUpperCase();
}
const updateMemory = () => {
  let memoryDump = emulator.dump_memory_u16();
  let pc = emulator.dump_pc() - 8;
  for (let i = 1; i < memoryDump.length; i++) {
    memoryTableAddresses[i - 1].textContent = format_number_as_hex(pc);  
    memoryTableValues[i - 1].textContent = format_number_as_hex(memoryDump[i]);  
    pc += 2;
  }
}

const registerTableValues = [
  document.getElementById("reg_val_0"),
  document.getElementById("reg_val_1"),
  document.getElementById("reg_val_2"),
  document.getElementById("reg_val_3"),
  document.getElementById("reg_val_4"),
  document.getElementById("reg_val_5"),
  document.getElementById("reg_val_6"),
  document.getElementById("reg_val_7"),
  document.getElementById("reg_val_8"),
  document.getElementById("reg_val_9"),
  document.getElementById("reg_val_a"),
  document.getElementById("reg_val_b"),
  document.getElementById("reg_val_c"),
  document.getElementById("reg_val_d"),
  document.getElementById("reg_val_e"),
  document.getElementById("reg_val_f"),
]
const soundRegisterCell = document.getElementById("reg_val_sound");
const delayRegisterCell = document.getElementById("reg_val_delay");
const iRegisterCell = document.getElementById("reg_val_i");
const pcCell = document.getElementById("reg_val_pc");

const updateRegisters = () => {
  let registerValues = emulator.dump_registers();
  for(let i = 0; i < registerValues.length; i++) {
    registerTableValues[i].textContent = registerValues[i];
  }
  // soundRegisterCell.textContent = emulator.dump_sound();
  delayRegisterCell.textContent = emulator.dump_delay();
  iRegisterCell.textContent = format_number_as_hex(emulator.dump_i());
  pcCell.textContent = format_number_as_hex(emulator.dump_pc());
}

document.addEventListener('keydown', (event) => {
  var keyValue = event.key;
  var codeValue = event.code;
  console.log("keyValue: " + keyValue);
  console.log("codeValue: " + codeValue);
  
  if (codeValue === "KeyP") {handlePauseToggle();}
  
  if (codeValue === "Key1") {emulator.press_key(1);}
  if (codeValue === "Key2") {emulator.press_key(2);}
  if (codeValue === "Key3") {emulator.press_key(3);}
  if (codeValue === "Key4") {emulator.press_key(12);}
  if (codeValue === "KeyQ") {emulator.press_key(4);}
  if (codeValue === "KeyW") {emulator.press_key(5);}
  if (codeValue === "KeyE") {emulator.press_key(6);}
  if (codeValue === "KeyR") {emulator.press_key(13);}
  if (codeValue === "KeyA") {emulator.press_key(7);}
  if (codeValue === "KeyS") {emulator.press_key(8);}
  if (codeValue === "KeyD") {emulator.press_key(9);}
  if (codeValue === "KeyF") {emulator.press_key(14);}
  if (codeValue === "KeyZ") {emulator.press_key(10);}
  if (codeValue === "KeyX") {emulator.press_key(0);}
  if (codeValue === "KeyC") {emulator.press_key(11);}
  if (codeValue === "KeyV") {emulator.press_key(15);}
}, false);

document.addEventListener('keyup', (event) => {
  var codeValue = event.code;
  
  if (codeValue === "Key1") {emulator.release_key(1);}
  if (codeValue === "Key2") {emulator.release_key(2);}
  if (codeValue === "Key3") {emulator.release_key(3);}
  if (codeValue === "Key4") {emulator.release_key(12);}
  if (codeValue === "KeyQ") {emulator.release_key(4);}
  if (codeValue === "KeyW") {emulator.release_key(5);}
  if (codeValue === "KeyE") {emulator.release_key(6);}
  if (codeValue === "KeyR") {emulator.release_key(13);}
  if (codeValue === "KeyA") {emulator.release_key(7);}
  if (codeValue === "KeyS") {emulator.release_key(8);}
  if (codeValue === "KeyD") {emulator.release_key(9);}
  if (codeValue === "KeyF") {emulator.release_key(14);}
  if (codeValue === "KeyZ") {emulator.release_key(10);}
  if (codeValue === "KeyX") {emulator.release_key(0);}
  if (codeValue === "KeyC") {emulator.release_key(11);}
  if (codeValue === "KeyV") {emulator.release_key(15);}
})

let animationId = null;

const renderLoop = () => {
  updateMemory();
  updateRegisters();
  drawDisplay();
  for(let i = 0; i < TICKS_PER_FRAME; i++) {
  emulator.tick();
      }
  animationId = requestAnimationFrame(renderLoop);
}

const resetButton = document.getElementById("reset");
const resetEmulator = () => {
  emulator.reset();
  play();
  pause();
}

resetButton.addEventListener('click', event => {
  resetEmulator();
});

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
}

const singleStepButton = document.getElementById("single-step");
const singleStep = () => {
  if(!isPaused()) {return;}
  
  play();
  pause();
}

singleStepButton.addEventListener("click", event => {
  singleStep();
});

const uploadForm = document.querySelector('form');
const romInput = document.getElementById("rom_input");
uploadForm.addEventListener('submit', handleRomUpload);

const isValidRomFile = (file) => {
  if (file.name.length < 3) {return false;}
  return file.name.substring(file.name.length - 4) === ".ch8";
}

async function handleRomUpload(event) {
  event.preventDefault();
  if(romInput.files.length === 0) {return;}
  
  let file = romInput.files[0];
  
  if(!isValidRomFile(file)) {return;}
  
  let payload = await file.arrayBuffer();
  console.log("Received rom to load");
  // Important to convert the raw buffer to the correct type here
  emulator.load_rom(new Uint8Array(payload));
  
  play();
  pause();
}

emulator.reset();
play();
// pause();