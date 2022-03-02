const inquirer = require('inquirer');

const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const fs = require('fs');

const managers = [];
const engineers = [];

const interns = [];



inquirer
  .prompt([
    {
      type: 'input',
      message: 'Who is the Project Manager?',
      name: 'manName',
    },
    {
      type: 'number',
      message: 'What is their Employee ID?',
      name: 'id',
    },
    {
      type: 'email',
      message: 'What is their email?',
      name: 'email',
    },
    {
        type: 'number',
        message: 'What is your office number?',
        name: 'officeNumber',
    },
    {
        type: 'list',
        message: 'Who would you like to add to the team?',
        choices: ["Engineer", "Intern", "I'm finished making my team"],
        name: 'employee'
    }
  ])
  .then((response) => {
       const manager = new Manager(response.manName, response.id, response.email, response.officeNumber);
       
      managers.push(manager);
      
      if (response.employee === "Engineer") {
        generateEngineer()
      } else if (response.employee === "Intern") {
        generateIntern()
      } else {
        generateHtml
      }
  }
     
        
);

function generateEngineer() {
  inquirer.prompt([
    {
        type: 'input',
        message: 'What is their name?',
        name: 'name',
    },
    {
        type: 'number',
        message: 'What is their Employee ID?',
        name: 'id',
    },
    {
        type: 'email',
        message: 'What is their email?',
        name: 'email',
    },
    {
        type: "input",
        message: 'What is their Github?',
        name: 'github'
    },
    {
      type: 'list',
      message: 'Who would you like to add to the team?',
      choices: ["Engineer", "Intern", "I'm finished making my team"],
      name: 'employee'
  }
])
.then((response) => {
  const engineer = new Engineer(response.name, response.id, response.email, response.github);
  engineers.push(engineer);
  genIntCard(interns);
  if (response.employee === "Engineer") {
    generateEngineer()
  } else if (response.employee === "Intern") {
    generateIntern()
  } else {
    generateHtml()
  }
})
}

function generateIntern() {
  inquirer.prompt([
    {
        type: 'input',
        message: 'What is their name?',
        name: 'name',
    },
    {
        type: 'number',
        message: 'What is their Employee ID?',
        name: 'id',
    },
    {
        type: 'email',
        message: 'What is their email?',
        name: 'email',
    },
    {
        type: "input",
        message: 'What school do they go to?',
        name: 'school'
    },
    {
      type: 'list',
      message: 'Who would you like to add to the team?',
      choices: ["Engineer", "Intern", "I'm finished making my team"],
      name: 'employee'
  }
])
.then((response) => {
  
  const intern = new Intern(response.name, response.id, response.email, response.school);
  
  interns.push(intern);
  
  if (response.employee === "Engineer") {
    generateEngineer()
  } else if (response.employee === "Intern") {
    generateIntern()
  } else {
    genIntCard()
    generateHtml()
  }
})
}

const genManCard = () => {
  let manCard = "";
  managers.forEach((manager) => {
    manCard += `
    <div class="card">
        <div class="title">
            <h3>${manager.name}</h3>
            <h4>${manager.getRole()}</h4>
        </div>
        <div class="det">
            <p>ID: ${manager.id}</p>
            <p>Email: <span><a href="${manager.email}" target="_blank">${manager.email}</a></span></p>
            <p>Office Number: ${manager.officeNumber}</p>
        </div>
    </div>
    `
  })
  return manCard;
}

const genEngCard = () => {
  let engCard = "";
  engineers.forEach((engineer) => {
    engCard += `
    <div class="card">
        <div class="title">
            <h3>${engineer.name}</h3>
            <h4>${engineer.getRole()}</h4>
        </div>
        <div class="det">
            <p>ID: ${engineer.id}</p>
            <p>Email: <span><a href="${engineer.email}" target="_blank">${engineer.email}</a></span></p>
            <p>Github: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></p>
        </div>
    </div>
    `
  })
  return engCard;
}


const genIntCard = () => {
  let intCard = "";
  interns.forEach((intern) => {
    intCard += `
    <div class="card">
        <div class="title">
            <h3>${intern.name}</h3>
            <h4>${intern.getRole()}</h4>
        </div>
        <div class="det">
            <p>ID: ${intern.id}</p>
            <p>Email: <span><a href="${intern.email}" target="_blank">${intern.email}</a></span></p>
            <p>School: ${intern.school}</p>
        </div>
    </div>
    `
  })
  return intCard;
}

const generateHtml = () => {
    const makehtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./dist/style.css">
        <title>Team Builder</title>
    </head>
    <body class="m-0">
        <header class="header">My Team</header>
        
        <main>
            <div class="cont">${genManCard()}</div>
            <div class="cont">${genEngCard()}</div>
            <div class="cont">${genIntCard()}</div>
        </main>

        <footer class="footer"></footer>
    </body>
    </html>`;

    fs.writeFile("team.html", makehtml, (err) => (err ? console.error(err) : console.log("success!")));
}



  