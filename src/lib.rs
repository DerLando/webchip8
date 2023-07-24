extern crate js_sys;
extern crate web_sys;

mod utils;

use chip8::emulator::Emulator;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Chip8Emulator {
    emulator: Emulator,
}

#[wasm_bindgen]
impl Chip8Emulator {
    pub fn new() -> Self {
        console_error_panic_hook::set_once();
        let mut emulator = Emulator::new();
        emulator.load_test_rom();
        Self { emulator }
    }

    pub fn load_rom(&mut self, rom: &[u8]) {
        self.emulator.load_rom(rom);
    }

    pub fn is_pixel_on(&self, x: u8, y: u8) -> bool {
        self.emulator.is_pixel_on(x, y)
    }

    pub fn tick(&mut self) {
        self.emulator.tick();
    }
}