function trackcount(func) {
  this.count += 1;
  return func;
}
function Jest() {
  this.count = 0;
  this.fn = function(func) {
    return trackcount.bind(this, func);
  };
}

module.exports = Jest;