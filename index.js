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

function promptUser() {
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

function gitAPICall() {
  axios
  .get(`https://api.github.com/users/${answers.github}`)
  .then(function(res) {
    return res;
  });

}
function gitRepoAPICall() {
  axios
  .get(`https://api.github.com/users/${answers.github}/repos`)
  .then(function(res) {
    return res;
  });

}
function findStars(gitRepos) {
  let starCount=0;
  for(let i=0; i<gitRepos.length; i++){
    starCount+=gitRepos[i].stargazers_count;
  }
  return starCount;
}

function generateHTML(answers, gitInfo, gitRepos, stars) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body style="background-color: ${answers.color}">
  <div class="jumbotron jumbotron-fluid" style="background-color: ${answers.color}">
    <div class="container" style="background-color: ${answers.color}">
      <img src= ${gitInfo.avatar_url}>
      <h1 class="display-4">Hi! My name is ${gitInfo.name}</h1>
      <p class="lead">I work at ${gitInfo.company}.</p>
      <p>Location: ${gitInfo.location}     Github: ${gitInfo.html_url}     Blog:     ${gitInfo.blog}</p>
    </div>
  </div>
  <div style="background-color: ${answers.color}">
    <h1>${gitInfo.bio}</h1>
    <div class="row">
      <div class="col-md-6" style="background-color: ${answers.color}">
      Public Repositories: <br>${gitRepos.length}
      </div>
      <div class="col-md-6" style="background-color: ${answers.color}">
      Followers: <br>${gitInfo.followers}
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" style="background-color: ${answers.color}">
      Github Stars: <br>${stars}
      </div>
      <div class="col-md-6" style="background-color: ${answers.color}">
      Following: <br>${gitInfo.following}
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

    const gitInfo = await gitAPICall();
    const gitRepos = await gitRepoAPICall();
    const stars = findStars(gitRepos);

    const html = generateHTML(answers, gitInfo, gitRepos, stars);

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
