const fs = require("fs");
const path = require("path");

const targetsPath = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "firmware",
  "hardware",
  "targets.json"
);

const customPath = path.join(
  __dirname,
  "..",
  "custom-targets",
  "NewPower.json"
);

if (!fs.existsSync(targetsPath)) {
  throw new Error(`targets.json not found: ${targetsPath}`);
}

if (!fs.existsSync(customPath)) {
  throw new Error(`custom target not found: ${customPath}`);
}

const targets = JSON.parse(fs.readFileSync(targetsPath, "utf8"));
const customTargets = JSON.parse(fs.readFileSync(customPath, "utf8"));

if (!customTargets.newpower) {
  throw new Error("custom target must contain top-level key: newpower");
}

targets.newpower = customTargets.newpower;

fs.writeFileSync(targetsPath, JSON.stringify(targets, null, 2) + "\n");

console.log("Patched targets.json with NewPower target.");
