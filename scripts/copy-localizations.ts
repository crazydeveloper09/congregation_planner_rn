import fs from "fs";
import path from "path";

const filesToCopy: { src: string; dest: string }[] = [
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

function copyFile(src: string, dest: string) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✅ Copied ${src} → ${dest}`);
}

function main() {
  filesToCopy.forEach(({ src, dest }) => copyFile(src, dest));
}

main();
