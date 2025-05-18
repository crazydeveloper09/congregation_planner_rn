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
    {
      src: "android-res/values/strings.xml",
      dest: "android/app/src/main/res/values/strings.xml",
    },
    {
      src: "android-res/values-pl/strings.xml",
      dest: "android/app/src/main/res/values-pl/strings.xml",
    },
  ];

  for (const { src, dest } of filesToCopy) {
    copyFile(src, dest);
  }
}

run();
