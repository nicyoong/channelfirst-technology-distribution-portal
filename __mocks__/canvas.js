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
