const expect = (received, jest) => {
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

    this.toThrow = function(expected) {
      let isErrorThrown = false;
      let errorMessage;
      try {
        received();
      } catch (error) {
        isErrorThrown = true;
        errorMessage = error.message;
      }

      let additionalCheck =
        typeof expected === "string" ? errorMessage === expected : true;

      if (isErrorThrown && additionalCheck) {
        return true;
      }

      let message = "error";

      if (typeof expected === "string") {
        message = `${expected} ${message}`;
      }

      throw new Error(`Expected ${received} to throw ${message}`);
    };

    this.toHaveBeenCalled = function() {
      if (jest.count === 0) {
        throw new Error(`Expected ${received} to get called atleast once`);
      }

      return true;
    };
  }

  return new Methods();
};

module.exports = expect;
