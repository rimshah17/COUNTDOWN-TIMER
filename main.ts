#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(
    chalk.yellow.italic("<-------------WELCOME TO COUNTDOWN TIMER------------>")
);
const response = await inquirer.prompt({
    name: "input",
    message: chalk.green.italic("Please enter amount under 60s:"),
    type: "number",
    transformer: (input) => chalk.bold.italic.whiteBright(input),
    validate: (input) => {
        if (isNaN(input)) {
            console.log(chalk.bold.italic("\nPlease enter valid number"));
            return process.exit();
        } else if (input > 60) {
            console.log(chalk.bold.italic("Seconds must be under 60"));
            return process.exit();
        } else {
            return true;
        }
    },
});
let result = response.input;

let startTimer = (val: number) => {
    const initTime: number = new Date().setSeconds(new Date().getSeconds() + val);
    const intervTime = new Date(initTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.red("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(
            `${chalk.bold.italic.yellow(sec.toString().padStart(2, "0"))}`
        );
    }, 1000);
};
startTimer(result);