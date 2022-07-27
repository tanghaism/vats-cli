import path from "path";
import chalkPipe from "chalk-pipe";

const text = chalkPipe("cyan");

const questions = [
  {
    type: "input",
    name: "name",
    message: text("请输入项目名称<Please enter project name>："),
    default() {
      return path.basename(path.resolve("./"));
    },
    validate(value) {
      if (value.trim()) {
        return true;
      }

      return "项目名称不能为空";
    },
  },
  {
    type: "list",
    name: "platform",
    message: text("请选择客户端平台<Please select a client platform>："),
    // choices: ["H5", "Admin", "WebSSR"],
    choices: ["Admin", "H5"]
  },
  {
    type: "list",
    name: "language",
    message: text("请选择框架<Please select a frame>："),
    choices: [
      {
        name: "Nuxt.js",
        value: "Nuxt",
      },
      {
        name: "Next.js",
        value: "Next",
      },
    ],
    when(answers) {
      return answers.platform === "WebSSR";
    },
  },
  {
    type: "list",
    name: "language",
    message: text("请选择框架<Please select a frame>："),
    choices: [
      {
        name: "Vue3 (Vant@3 + VueRouter + px2rem + Pinia + Typescript + Eslint + Prettier)",
        value: "Vue",
      },
      {
        name: "React17 (AntDesignMobile@5 + px2rem + ReactRouter + DVA + Typescript + Eslint + Prettier)",
        value: "React",
      },
    ],
    when(answers) {
      return answers.platform === "H5";
    },
  },
  {
    type: "list",
    name: "language",
    message: text("请选择框架<Please select a frame>："),
    choices: [
      {
        name: "Vue3 (AntDesignVue@3 + VueRouter + Pinia + Typescript + Eslint + Prettier)",
        value: "Vue",
      },
      // {
      //   name: "React17 (AntDesignReact@5 + ReactRouter + DVA + Typescript + Eslint + Prettier)",
      //   value: "React",
      // },
    ],
    when(answers) {
      return answers.platform === "Admin";
    },
  },
  {
    type: "list",
    name: "framework",
    message: text("请选择脚手架<Please select scaffolding>："),
    choices: ["VueCli", "Vite"],
    when(answers) {
      return answers.language === "Vue" && answers.platform !== "WebSSR";
    },
  },
  {
    type: "list",
    name: "framework",
    message: text("请选择脚手架<Please select scaffolding>："),
    choices: ["UMI", "Vite"],
    when(answers) {
      return answers.language === "React" && answers.platform !== "WebSSR";
    },
  },
  {
    type: "input",
    name: "remote",
    message: text("请输入git远程仓库地址<Please enter the git remote repository address>："),
    validate(value) {
      if (value.trim()) {
        return true;
      }

      return "git remote 不能为空";
    },
  },
  {
    type: "list",
    name: "push",
    message: text("是否立即将代码推送到远程仓库<Whether to push the template code to the remote repository immediately>："),
    choices: ["Yes", "No"]
  },
];

export default questions;
