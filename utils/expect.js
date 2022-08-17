const expect = (received) => {
  return {
    toBe: function(expected) {
      if (received !== expected) {
        throw new Error(`Expected ${expected} but received ${received}`);
      }

      return true;
    },
    toBeGreaterThan: function(expected) {
      if (received < expected) {
        throw new Error(`Expected ${received} to be greater than ${expected}`);
      }
      return true;
    },
  };
};

module.exports = expect;
