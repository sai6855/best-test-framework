function trackcount(func) {
  this.count = (this.count || 0) + 1;
  func.__proto__.count = this.count;
  return func;
}

const jest = {
  fn: function(func) {
    func.__proto__.count = 0;
    return trackcount.bind(this, func);
  },
};

module.exports = jest;
