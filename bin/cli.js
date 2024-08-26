#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

// Check if the project name is provided
const repoName = process.argv[2];
if (!repoName) {
  console.error("Please provide a project name:");
  console.error("  Example: npx create-gulp-bs-template my-project");
  process.exit(-1);
}

const cwd = process.cwd();
const gitCheckoutCommand = `git clone --depth 1 https://github.com/AmitDeka/create-gulp-bs-template ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log("\n");
console.log(`Creating a new Bootstrap + Gulp project in ${cwd}/${repoName}`);
console.log("\n");
const chechedOut = runCommand(gitCheckoutCommand);
if (!chechedOut) process.exit(-1);

console.log("\n");
console.log(`Installing npm dependencies in ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log("\n");
console.log(
  `Congratulations! Your new Bootstrap + Gulp project is ready in ${repoName}`
);
console.log("Inside the project directory, you can run several commands:");
console.log("\n");
console.log("   npm start");
console.log("       Starts the server using Browser-Sync with live reloading.");
console.log("\n");
console.log("   npm run dev");
console.log(
  "       Runs the development server and watches files for changes."
);
console.log("\n");
console.log("   npm run prod");
console.log("       Builds the project for production without minification.");
console.log("\n");
console.log("   npm run prodm");
console.log("       Builds the project for production with minification.");
console.log("\n");
console.log("To get started, you can type the following:");
console.log(`       cd ${repoName}`);
console.log("       npm start");
console.log("\n");
console.log("     :) :) Happy coding with Bootstrap and Gulp! :) :)     ");
