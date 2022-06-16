#!/usr/bin/env zx
import "zx/globals";
import { spinner } from "zx/experimental";
import inquirer from "inquirer";
import questions from "./question.js";
import { getProjectPath, getTemplateName, modifyProjectName } from "./utils.js";

const { name, platform, language, framework, remote } = await inquirer.prompt(
  questions
);

const projectPath = getProjectPath(name);

const templateName = `vats-${getTemplateName([
  platform,
  language,
  framework,
])}-template`;

// 拉取代码模版
await spinner(
  "git clone",
  () => $`git clone https://github.com/tanghaism/${templateName}.git`
);
// 修改项目名称
await $`mv ./vats-admin-vue-vuecli-template ${projectPath}`;
// 移除模版git信息
await $`rm -rf ${projectPath}/.git`;
// 进入项目路径
await cd(projectPath);
await $`pwd`;
// 修改模版名称
await modifyProjectName(name, templateName);
// 安装依赖
await $`yarn`
// 初始化git
await $`git init`;
await $`git add ./`;
await $`git remote -v`;
await $`git commit -m "init vats"`;
await $`git branch -M master`;
await $`git remote add origin ${remote}`;
await spinner("git push", () => $`git push -u origin master`);
await echo`----------------------------------------------------------------`;
await echo`项目创建成功！`;
