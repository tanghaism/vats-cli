import path from "path";
import chalkPipe from "chalk-pipe";

const text = chalkPipe("cyan");

const questions = [
  {
    type: "input",
    name: "name",
    message: text("请输入项目名称："),
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
    message: text("请选择客户端平台："),
    choices: ["H5", "Admin", "WebSSR"],
  },
  {
    type: "list",
    name: "language",
    message: text("请选择框架："),
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
    message: text("请选择框架："),
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
    message: text("请选择框架："),
    choices: [
      {
        name: "Vue3 (AntDesignVue@3 + VueRouter + Pinia + Typescript + Eslint + Prettier)",
        value: "Vue",
      },
      {
        name: "React17 (AntDesignReact@5 + ReactRouter + DVA + Typescript + Eslint + Prettier)",
        value: "React",
      },
    ],
    when(answers) {
      return answers.platform === "Admin";
    },
  },
  {
    type: "list",
    name: "framework",
    message: text("请选择项目架构："),
    choices: ["VueCli", "Vite"],
    when(answers) {
      return answers.language === "Vue" && answers.platform !== "WebSSR";
    },
  },
  {
    type: "list",
    name: "framework",
    message: text("请选择项目架构："),
    choices: ["UMI", "Vite"],
    when(answers) {
      return answers.language === "React" && answers.platform !== "WebSSR";
    },
  },
  {
    type: "confirm",
    name: "pwa",
    message: text("是否使用PWA？"),
    default() {
      return false;
    },
  },
  {
    type: "input",
    name: "baseUrl",
    message: text("请输入生产环境静态资源baseUrl(可以输入cdn域名地址)："),
    default() {
      return "./";
    },
    when(answers) {
      return !answers.pwa;
    },
  },
  {
    type: "confirm",
    name: "dependencies",
    message: text("第三方依赖是否使用externals："),
    default() {
      return true;
    },
  },
  {
    type: "confirm",
    name: "abroad",
    message: text("第三方依赖是否使用海外CDN节点："),
    default() {
      return false;
    },
    when(answers) {
      return answers.dependencies;
    },
  },
];

export default questions;