var Utils = {
  // max is exclusive
  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // drags value to either min or max, whichever is closer
  drag: (value, min, max) => {
    var p = value / (min + max) - min;
    return p < 0.5 ? min : max;
  }
}
