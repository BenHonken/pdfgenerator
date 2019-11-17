//require inquirer, fs, axios, others
//prompt for favorite color and github username
//use axios to get all the github info
//fill out html
//save to pdf
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

async function promptUser() {
  return inquirer.prompt([
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["red","orange","yellow","green","blue","purple"]
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    }
  ]);
}

async function gitAPICall(answers) {
  const response = axios
  .get(`https://api.github.com/users/${answers.github}`)
return response;
}
async function gitStarsAPICall(answers) {
  const response = axios
  .get(`https://api.github.com/users/${answers.github}/starred?`)
  return response;

}


function generateHTML(answers, gitInfo, stars) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body style="background-color: white">
  <div class="wrapper" style="max-width: 815px; background-color: ${answers.color}">
    <div class="jumbotron jumbotron-fluid" style="background-color: white">
      <div class="container" style="background-color: ${answers.color}">
        <div class="row">
          <div class="col-3"></div>
          <img class="col-6" style="margin-left: 28px" src=${gitInfo.data.avatar_url}>
          <div class="col-3"></div>
        </div>
        <h1 class="display-4" style="margin-left: 40px">Hi! My name is ${gitInfo.data.name}!</h1>
        <p class="lead" style="font-size: 36px; margin-left: 155px">I work at ${gitInfo.data.company}.</p>
        <p class="row"style="font-size: 24px"><a style="margin-left: 80px" href="https://www.google.com/maps/search/?api=1&query=${gitInfo.data.location}">Located in ${gitInfo.data.location}</a><a style="margin-left: 90px" href="${gitInfo.data.html_url}">Github</a><a style="margin-left: 200px" href=${gitInfo.data.blog}>Blog</a></p>
      </div>
    </div>
    <div style="background-color: white">
      <h1 style="background-color: ${answers.color}; text-align: justify">${gitInfo.data.bio}</h1>
      <div class="row" style="background-color: white; margin-top: 15px">
        <div class="col-1" style="background-color: white">
        </div>
        <div class="col-4" style="background-color: ${answers.color}; margin-top: 15px">
        Public Repositories: <br>${gitInfo.data.public_repos}
        </div>
        <div class="col-2" style="background-color: white">
        </div>
        <div class="col-4" style="background-color: ${answers.color}; margin-top: 15px">
        Followers: <br>${gitInfo.data.followers}
        </div>
        <div class="col-1" style="background-color: white">
        </div>
      </div>
      <div class="row" style="background-color: white; margin-top: 15px">
        <div class="col-1" style="background-color: white">
        </div>
        <div class="col-4" style="background-color: ${answers.color}"; margin-top: 15px>
        Github Stars: <br>${stars}
        </div>
        <div class="col-2" style="background-color: white">
        </div>
        <div class="col-4" style="background-color: ${answers.color}"; margin-top: 15px>
        Following: <br>${gitInfo.data.following}
        </div>
        <div class="col-1" style="background-color: white">
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function init() {
  console.log("hi");
  try {
    const answers = await promptUser();

    const gitInfo = await gitAPICall(answers);
    const gitStars = await gitStarsAPICall(answers);
    const stars = gitStars.data.length;

    const html = generateHTML(answers, gitInfo, stars);

    await writeFileAsync("index.html", html);

    var readHtml = fs.readFileSync('index.html', 'utf8');
    var options = { format: 'Letter' };
     
    pdf.create(readHtml, options).toFile('test.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}

init();
