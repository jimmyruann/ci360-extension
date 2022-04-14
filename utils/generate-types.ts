import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import fs from "fs";
import path from "path";

const getAllDirectories = (abs_dir_path: string) => {
  const dirs: string[] = [];

  fs.readdirSync(abs_dir_path).forEach((fileName) => {
    const filepath = path.resolve(abs_dir_path, fileName);
    const stat = fs.statSync(filepath);
    const isDirectory = stat.isDirectory();

    if (isDirectory) dirs.push(fileName);
  });

  return dirs;
};

const getAllFiles = (abs_dir_path: string) => {
  const files: string[] = [];

  fs.readdirSync(abs_dir_path).forEach((fileName) => {
    const ext = path.parse(fileName).ext;
    const filepath = path.resolve(abs_dir_path, fileName);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();

    if (isFile && ext.includes("json")) files.push(filepath);
  });

  return files;
};

const readAllFiles = (filePaths: string[]) => {
  const fileContent: string[] = [];

  filePaths.forEach((filePath) => {
    fileContent.push(
      JSON.stringify(JSON.parse(fs.readFileSync(filePath, "utf8")))
    );
  });

  return fileContent;
};

const genTypes = async (abs_base_path: string, topLevelName: string) => {
  const jsonInput = jsonInputForTargetLanguage("ts");
  const abs_path = path.join(abs_base_path, topLevelName);
  const allFileNames = getAllFiles(abs_path);

  if (allFileNames.length) {
    await jsonInput.addSource({
      name: topLevelName,
      samples: readAllFiles(allFileNames),
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    const types = await quicktype({
      inputData,
      lang: "ts",
      inferEnums: false,
      combineClasses: false,
      rendererOptions: {
        "just-types": "true",
        "runtime-typecheck": "false",
      },
    });

    return types;
  }

  return null;
};

const main = async () => {
  const responsePath = path.join(__dirname, "../api_responses");
  const savePath = path.join(__dirname, "../generated");

  getAllDirectories(responsePath).forEach(async (topLevelName) => {
    const text = await genTypes(responsePath, topLevelName);
    if (text) {
      if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);
      fs.writeFileSync(
        path.join(savePath, `${topLevelName}.type.ts`),
        text.lines.join("\n"),
        "utf-8"
      );
      console.log(topLevelName, "- Done");
    }
  });
};

main();
