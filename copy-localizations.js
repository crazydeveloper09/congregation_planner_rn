const fs = require("fs");
const path = require("path");

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✅ Copied ${src} → ${dest}`);
}

function run() {
  const filesToCopy = [
    {
      src: "locales/en.lproj/InfoPlist.strings",
      dest: "ios/en.lproj/InfoPlist.strings",
    },
    {
      src: "locales/pl.lproj/InfoPlist.strings",
      dest: "ios/pl.lproj/InfoPlist.strings",
    },
  ];

  for (const { src, dest } of filesToCopy) {
    copyFile(src, dest);
  }
}

run();
