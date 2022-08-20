function trackcount(func) {
  func.__proto__.count = func.count + 1;
  return func;
}

const jest = {
  fn: function(func) {
    func.__proto__.count = 0;
    return trackcount.bind(this, func);
  },
};

module.exports = jest;
