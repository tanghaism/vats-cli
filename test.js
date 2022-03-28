import inquirer from "inquirer";
inquirer
  .prompt([
    {
      type: "expand",
      name: "toppings",
      message: "What about the toppings?",
      choices: [
        {
          key: "p",
          name: "Pepperoni and cheese",
          value: "PepperoniCheese",
        },
        {
          key: "a",
          name: "All dressed",
          value: "alldressed",
        },
        {
          key: "w",
          name: "Hawaiian",
          value: "hawaiian",
        },
      ],
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  });
