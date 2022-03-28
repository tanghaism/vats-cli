import path from "path";
import { fileURLToPath } from "url";

// 获取绝对路径
export const getRootPath = (pathUrl) => {
  const __dirname = fileURLToPath(import.meta.url);
  return path.resolve(__dirname, `../${pathUrl}`);
};

// 设置模版缓存目录
// param {string} cacheDir: 存放模版文件的文件夹名称
export const getTemplatesDirRootPath = (cacheDir) => {
  const processCwd = process.cwd();
  const processCwdArr = processCwd.split("/");
  // 存放模块文件的目录路径
  return `/${processCwdArr[1]}/${processCwdArr[2]}/${cacheDir}`;
};
