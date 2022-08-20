const fs = require("fs");
const expect = require("./utils/expect");
const Jest = require("./utils/jest");

const runTest = async (file) => {
  const code = await fs.promises.readFile(file, "utf8");
  const testResult = {
    success: false,
    errorMessage: null,
    file,
  };

  try {
    eval(code);
    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};

module.exports = runTest;
