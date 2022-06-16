#!/usr/bin/env zx
import "zx/globals";
import inquirer from "inquirer";
import questions from "./question.js";
import { getProjectPath } from './utils.js';

const answer = await inquirer.prompt(questions);

console.log(answer);

const projectPath = getProjectPath(answer.name);

// 拉取代码模版
await $`git clone https://github.com/tanghaism/vats-admin-vue-vuecli-template.git`
// 修改项目名称
await $`mv ./vats-admin-vue-vuecli-template ${projectPath}`
// 移除模版git信息
await $`rm -rf ${projectPath}/.git`
// 进入项目路径
await $`cd ${projectPath}`
await $`pwd`
// 初始化git
await $`git init`
await $`git add ./`
await $`git remote -v`
await $`git commit -m "init vats"`
await $`git branch -M master`
await $`git remote add origin ${answer.remote}`
await $`git push -u origin master`
await $`echo "项目创建成功！"`;
