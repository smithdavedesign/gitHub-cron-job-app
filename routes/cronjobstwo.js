var express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const axios = require('axios');
const { Octokit } = require('@octokit/core');
const router = express.Router();



// Define your cron schedule (e.g., runs every weekday at 2:30 PM)
cron.schedule('30 14 * * 1-5', () => {
    // This function will be executed on the defined schedule
    console.log('Cron job executed!');
  
    // Update the README file content (replace with your code)
    updateReadme();
  });
  
  // Function to update the README file on GitHub (example)
  function updateReadme() {
    // Your GitHub username and repository name
    const GITHUB_USERNAME = 'smithdavedesign';  //https://github.com/smithdavedesign/smithdavedesign.git
    const REPO_NAME = 'smithdavedesign';
  
    // Your GitHub Personal Access Token
    const GITHUB_TOKEN = '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';
  
    // Define the content you want to add to your README using a template literal
    const updatedContent =
      `
  - 👋 Hi, I’m Dave! @smithdavedesign 
  - 🚀 Passionate Problem Solver | Code, Coffee, and a Pinch of AI | Building a Better Tomorrow!
  - 🌱 I’m currently the Sr. tech lead at Solidigm => https://www.solidigm.com/
  - 💞️ I’m looking to collaborate on intresting and challanging projects
  - 📫 How to reach me 
      
      Cell: 530-601-1922
      Email: smithdavedesign@gmail.com
  
  -  https://www.linkedin.com/in/codingforgood/
  -  https://smithdavedesign.herokuapp.com/
  -  https://www.instagram.com/smithdavedesign/
  -  https://www.facebook.com/smithdavedesign
  -  https://twitter.com/DavidGeorgeSmi4
  
  ### Updated on: ${new Date().toISOString()}
  
  `
  
    // Prepare the API URL
    const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/README.md`;
    console.log(apiUrl);
  
    // Encode the new content as Base64
    const newContentBase64 = Buffer.from(updatedContent).toString('base64');
  
    // Make a PUT request to update the README file on GitHub
    axios({
      method: 'put',
      url: apiUrl,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
      },
      data: {
        message: 'Update README',
        content: newContentBase64,
      },
    })
      .then(response => {
        console.log('README updated successfully.');
      })
      .catch(error => {
        console.error(apiUrl + 'Error updating README:', error);
      });
  }
  
  
  
  router.get('/updateReadMe2', async function (req, res, next) {
    try {
      // Your GitHub username and repository name
      const GITHUB_USERNAME = 'smithdavedesign'; // Your GitHub username
      const REPO_NAME = 'portfolio'; // Your repository name (portfolio in this case)
      const PROJECT_PATH = 'secondProject'; // The project path within the repository
  
      // Your GitHub Personal Access Token
      const GITHUB_TOKEN = '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';
  
      // Define the content you want to add to your README using a template literal
      const updatedContent = `
      - 👋 Hi, I’m Dave! @smithdavedesign 
      - 🚀 Passionate Problem Solver | Code, Coffee, and a Pinch of AI | Building a Better Tomorrow!
      - 🌱 I’m currently the Sr. tech lead at Solidigm => https://www.solidigm.com/
      - 💞️ I’m looking to collaborate on interesting and challenging projects
      - 📫 How to reach me 
  
          Cell: 530-601-1922
          Email: smithdavedesign@gmail.com
  
      -  https://www.linkedin.com/in/codingforgood/
      -  https://smithdavedesign.herokuapp.com/
      -  https://www.instagram.com/smithdavedesign/
      -  https://www.facebook.com/smithdavedesign
      -  https://twitter.com/DavidGeorgeSmi4
  
      ### Updated on: ${new Date().toISOString()}
      `;
  
      // Initialize Octokit with your Personal Access Token
      const octokit = new Octokit({ auth: GITHUB_TOKEN });
  
      // Construct the path to the README file
      const path = `${PROJECT_PATH}/README.md`;
  
      // Encode the new content as Base64
      const content = Buffer.from(updatedContent).toString('base64');
  
      // Make the API request to update the README file
      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: GITHUB_USERNAME,
        repo: REPO_NAME,
        path: path,
        message: 'Update README',
        content: content,
      });
  
      console.log('README updated successfully.');
      res.send(response.data);
    } catch (error) {
      console.error('Error updating README:', error);
      res.status(error.status || 500).send('Error updating README: ' + error.message);
    }
  });
  