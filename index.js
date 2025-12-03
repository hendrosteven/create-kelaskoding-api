#!/usr/bin/env bun

import fs from "fs";
import path from "path";

const projectName = process.argv[2];

if (!projectName) {
    console.error("❌ Please provide a project name: bun create simple-api myapp");
    process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.join(path.dirname(import.meta.path), "template");

console.log("📦 Creating project:", projectName);
console.log("📁 Template dir:", templateDir);

if (!fs.existsSync(templateDir)) {
    console.error("❌ ERROR: template folder not found!", templateDir);
    process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// Copy template
fs.cpSync(templateDir, targetDir, { recursive: true });

// Replace placeholder in package.json
const pkgPath = path.join(targetDir, "package.json");
let pkg = fs.readFileSync(pkgPath, "utf8");
pkg = pkg.replace(/{{projectName}}/g, projectName);
fs.writeFileSync(pkgPath, pkg);

// Rename .env file
const envFrom = path.join(targetDir, ".env.example");
const envTo = path.join(targetDir, ".env");

if (fs.existsSync(envFrom)) fs.renameSync(envFrom, envTo);

// Install dependencies
console.log("📥 Installing dependencies...");
await Bun.spawn(["bun", "install"], { cwd: targetDir }).exited;

console.log(`\n✨ Project '${projectName}' created successfully!`);
console.log(`\n Check \n`);
