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
  <div class="wrapper" style="max-width: 800px; background-color: white">
    <div class="jumbotron jumbotron-fluid" style="background-color: white">
      <div class="container" style="background-color: ${answers.color}">
        <img src= ${gitInfo.data.avatar_url}>
        <h1 class="display-4">Hi! My name is ${gitInfo.data.name}</h1>
        <p class="lead">I work at ${gitInfo.data.company}.</p>
        <p><a href="https://www.google.com/maps/search/?api=1&query=${gitInfo.data.location}">Located in ${gitInfo.data.location}</a>     <a href="${gitInfo.data.html_url}">Github</a>     <a href=${gitInfo.data.blog}>Blog:</a>     </p>
      </div>
    </div>
    <div style="background-color: ${answers.color}">
      <h1>${gitInfo.data.bio}</h1>
      <div class="row">
        <div class="col-6" style="background-color: ${answers.color}">
        Public Repositories: <br>${gitInfo.data.public_repos}
        </div>
        <div class="col-6" style="background-color: ${answers.color}">
        Followers: <br>${gitInfo.data.followers}
        </div>
      </div>
      <div class="row">
        <div class="col-6" style="background-color: ${answers.color}">
        Github Stars: <br>${stars}
        </div>
        <div class="col-6" style="background-color: ${answers.color}">
        Following: <br>${gitInfo.data.following}
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
