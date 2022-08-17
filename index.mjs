import JestHasteMap from "jest-haste-map";
import { cpus } from "os";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import runTest from "./worker.js";
import { Worker } from "jest-worker";
import chalk from "chalk";

const root = dirname(fileURLToPath(import.meta.url));

const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});

// Get the root path to our project (Like `__dirname`).
const hasteMapOptions = {
  extensions: ["js"],
  maxWorkers: cpus().length,
  name: "best-test-framework",
  platforms: [],
  rootDir: root,
  roots: [root],
};
// Need to use `.default` as of Jest 27.
const hasteMap = new JestHasteMap.default(hasteMapOptions);
// This line is only necessary in `jest-haste-map` version 28 or later.
await hasteMap.setupCachePath(hasteMapOptions);

const { hasteFS } = await hasteMap.build();
const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

const results = await Promise.all(
  Array.from(testFiles).map((file) => runTest(file))
);

results.forEach((test) => {
  const { success, errorMessage ,file} = test;

  const status = success
    ? chalk.green.inverse.bold(" PASS ")
    : chalk.red.inverse.bold(" FAIL ");

  console.log(status + " " +chalk.dim(relative(root, file)));
  if (!success) {
    console.log('  ' + errorMessage);
  }
});

worker.end();
