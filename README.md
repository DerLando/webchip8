# Webchip8

This crate enables running a [chip 8](https://en.wikipedia.org/wiki/CHIP-8) emulator in a web context.

Internally, a thin wrapper around my [chip8 crate](https://github.com/DerLando/chip8) is exposed via [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen). This wrapper can either be run locally, or hosted at github pages using the [workflow](https://github.com/DerLando/webchip8/blob/main/.github/workflows/deploy_to_pages.yml) set up for it.

A running copy of the build artifact is hosted at my [Github Pages](https://derlando.github.io/webchip8/)

## Installation

**Webchip8** has no requirements other than the one needed for `wasm-bindgen`. Follow the [installation guide](https://rustwasm.github.io/docs/book/game-of-life/setup.html) for it and afterwards **Webchip8** can be run locally from the command line:

```shell
  # In the root directory
  wasm-pack build
  cd www
  npm install
  npm run start
```

Alternatively, you can install the [just command runnder](https://github.com/casey/just), which I like a lot and use it to run locally:

```shell
  # In the root directory
  just build
  just run
```