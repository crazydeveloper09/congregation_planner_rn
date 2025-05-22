const fs = require("fs");
const path = require("path");

function copyDirContents(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`Source directory does not exist: ${srcDir}`);
    return;
  }

  fs.mkdirSync(destDir, { recursive: true });

  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirContents(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied ${srcPath} → ${destPath}`);
    }
  }
}

function run() {
  console.log("📦 Copying localization files...");

  // iOS InfoPlist.strings
  const iosLocalesDir = path.join(__dirname, "./locales");
  const iosDestRoot = path.join(__dirname, "./ios");
  copyDirContents(iosLocalesDir, iosDestRoot);

  console.log("🎉 Localization files copied.");
}

run();
