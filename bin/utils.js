import path from "path";
import fs from 'fs'
import { fileURLToPath } from "url";

// 获取绝对路径
export const getRootPath = (pathUrl) => {
  const __dirname = fileURLToPath(import.meta.url);
  return path.resolve(__dirname, `../${pathUrl}`);
};

// 获取项目路径
export const getProjectPath = (projectName) => {
  return `./${projectName}`
}

// 设置模版缓存目录
// param {string} cacheDir: 存放模版文件的文件夹名称
export const getTemplatesDirRootPath = (cacheDir) => {
  const processCwd = process.cwd();
  const processCwdArr = processCwd.split("/");
  // 存放模块文件的目录路径
  return `/${processCwdArr[1]}/${processCwdArr[2]}/${cacheDir}`;
};

// 拼接模版仓库名称
export const getTemplateName = (valueArray) => {
  return valueArray.map(str => str.toLowerCase()).join('-')
}

// 修改package.json的name
export const modifyProjectName = (projectName, templateName) => {
  const data = fs.readFileSync('./package.json',"utf8");
  const reg = new RegExp(`${templateName}`, 'i')
  const newData = data.replace(reg, projectName);
  fs.writeFileSync('./package.json', newData);
  return true
}
