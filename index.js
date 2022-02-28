const inquirer = require('inquirer');

const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

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
      console.log(manager);
      
      if (response.employee === "Engineer") {
        generateEngineer()
      } else if (response.employee === "Intern") {
        generateIntern()
      } else {

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
  if (response.employee === "Engineer") {
    generateEngineer()
  } else if (response.employee === "Intern") {
    generateIntern()
  } else {
    
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
    
  }
})
}

const genManCard = () => {
  const manCard = "";
  managers.forEach((manager) => {
    manCard += `
    <div>
        <div>
            <h3>${manager.name}</h3>
            <h4>${manager.getRole()}</h4>
        </div>
        <div>
            <p>ID: ${manager.id}</p>
            <a href="">Email: ${manager.email}</a>
            <p>Office Number: ${manager.officeNumber}</p>
        </div>
    </div>
    `
  })
  return manCard;
}

const genEngCard = () => {
  const engCard = "";
  engineers.forEach((engineer) => {
    engCard += `
    <div>
        <div>
            <h3>${engineer.name}</h3>
            <h4>${engineer.getRole()}</h4>
        </div>
        <div>
            <p>ID: ${engineer.id}</p>
            <a href="">Email: ${engineer.email}</a>
            <a href="">Github: ${engineer.github}</a>
        </div>
    </div>
    `
  })
  return engCard;
}


const genIntCard = () => {
  const intCard = "";
  interns.forEach((intern) => {
    intCard += `
    <div>
        <div>
            <h3>${intern.name}</h3>
            <h4>${intern.getRole()}</h4>
        </div>
        <div>
            <p>ID: ${intern.id}</p>
            <a href="">Email: ${intern.email}</a>
            <p>School: ${intern.school}</p>
        </div>
    </div>
    `
  })
  return intCard;
}

const generateHtml = () => {
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Builder</title>
    </head>
    <body>
        <header>My Team</header>
        
        <main>
          <div>${genManCard()}</div>
          <div>${genEngCard()}</div>
          <div>${genIntCard()}</div>
        </main>

        <footer></footer>
    </body>
    </html>`
}



  