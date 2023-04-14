global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(cb) {
    return setTimeout(cb, 0);
  };

require('regenerator-runtime/runtime');
