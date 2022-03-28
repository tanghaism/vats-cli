#!/usr/bin/env zx
import "zx/globals";
import inquirer from "inquirer";
import questions from "./question.js";

const answer = await inquirer.prompt(questions);

console.log(answer);

await $`pwd`;
