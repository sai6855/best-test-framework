const expect = (received) => {
  function Methods() {
    this.toBe = function(expected) {
      if (received !== expected) {
        throw new Error(`Expected ${expected} but received ${received}`);
      }
      return true;
    };

    this.toBeGreaterThan = function(expected) {
      if (received < expected) {
        throw new Error(`Expected ${received} to be greater than ${expected}`);
      }
      return true;
    };

    this.toMatch = function(expected) {
      const regex = expected;
      if (!regex.test(received)) {
        throw new Error(`Expected ${received} to match ${expected}`);
      }
      return true;
    };
  }

  return new Methods();
};

module.exports = expect;
