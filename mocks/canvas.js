/**
 * Canvas mock for Jest tests.
 *
 * The jsdom test environment requires the `canvas` module (used by jsdom
 * internally), but the native `canvas.node` binary is not built on this
 * machine. This file provides a stub so that `require('canvas')` resolves
 * to this module instead of the missing native binding.
 *
 * Install with: `npm run test:setup` or copy to node_modules/canvas/index.js
 */
module.exports = {
  createCanvas: () => ({
    width: 800,
    height: 600,
    getContext: () => ({}),
    toDataURL: () => "data:image/png;base64,mock",
  }),
  createImageData: () => ({}),
  loadImage: () => Promise.resolve(),
};
