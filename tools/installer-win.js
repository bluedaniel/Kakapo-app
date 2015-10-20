import archiver from "archiver";
import chalk from "chalk";
import fs from "fs";
import os from "os";
import rcedit from "rcedit";
import winInstaller from "electron-windows-installer";
import task from "./lib/task";
import packagejson from "../package.json";

async function winRcedit() {
  return await new Promise(resolve => {
    console.log(`[${new Date()}] Starting winRcedit ...`);
    rcedit("release/win32/Kakapo-win32-x64/Kakapo.exe", {
      icon: "app/images/app.ico",
      "file-version": packagejson.version,
      "product-version": packagejson.version,
      "version-string": {
        CompanyName: "Kakapo",
        ProductVersion: packagejson.version,
        ProductName: "Kakapo",
        FileDescription: "Kakapo",
        InternalName: "Kakapo.exe",
        OriginalFilename: "Kakapo.exe"
      }
    }, () => resolve(console.log(`[${new Date()}] Finished winRcedit`)));
  });
}

async function winZip() {
  return await new Promise((resolve, reject) => {
    console.log(`[${new Date()}] Starting winZip ...`);
    const output = fs.createWriteStream("./release/Kakapo-" + packagejson.version + "-Win.zip");
    const archive = archiver("zip");

    output.on("close", () =>
      resolve(console.log(`[${new Date()}] Finished winZip, size is ${(archive.pointer() / 1000000).toFixed(1)}mb`)));

    archive.on("error", err => reject(err));
    archive.pipe(output);
    archive.bulk([{
      expand: true,
      cwd: "./release/win32/Kakapo-win32-x64",
      src: ["**/*"] }
    ]);
    archive.finalize();
  });
}

async function winSetupExe() {
  return await new Promise((resolve, reject) => {
    if (os.platform() === "win32") {
      console.log(`[${new Date()}] Starting winSetupExe ...`);
      winInstaller({
        appDirectory: "release/win32/Kakapo-win32-x64",
        outputDirectory: "release",
        authors: "Daniel Levitt",
        loadingGif: "app/images/loading.gif",
        setupIcon: "app/images/app.ico",
        iconUrl: "https://raw.githubusercontent.com/bluedaniel/Kakapo-app/master/app/app.ico",
        description: "Kakapo",
        title: "Kakapo",
        exe: "Kakapo.exe",
        version: packagejson.version,
        setupExe: "KakapoSetup-" + packagejson.version + "-Win.exe"
      }).then(resolve(console.log(`[${new Date()}] Finished winSetupExe`)));
    } else {
      reject(console.error(chalk.bold.red("Error: `winSetupExe` can only be run on a Windows machine!")));
    }
  });
}

export default task("installer-win", async() => {
  await winRcedit();
  await winZip();
  await winSetupExe();
});
