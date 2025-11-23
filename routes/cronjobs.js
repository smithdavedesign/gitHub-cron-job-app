var express = require('express');
const crypto = require('crypto');
const cron = require('node-cron');
const { Octokit } = require('@octokit/core');
require('dotenv').config(); // Load environment variables from .env

const router = express.Router();


// Initialize Octokit with your GitHub Personal Access Token
// const octokit = new Octokit({ auth: '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' });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });


// Function to fetch the current content and SHA of a file in a repository
async function getFileContentAndSha(owner, repo, path) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: path,
    });
    return {
      content: response.data.content,
      sha: response.data.sha,
    };
  } catch (error) {
    throw error;
  }
}

// Function to update the README file in a repository
async function updateReadme(owner, repo, path, message, content, sha) {
  try {
    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: path,
      message: message,
      content: content,
      sha: sha, // Include the SHA of the current content
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to generate random message of the day with random emojis
function getRandomMessageOfTheDay() {
  const messages = [
    'Have a great day!',
    'Keep coding and stay awesome!',
    'You\'re doing amazing work!',
    'Stay positive and keep learning!',
    'Embrace the challenges ahead!',
    'Your code is making a difference!',
    'Keep pushing forward!',
    'Today is a great day to build something!',
    'Innovation starts with you!',
    'Dream big, code bigger!',
    'Every bug fixed is a step forward!',
    'Your dedication inspires others!',
    'Keep breaking boundaries!',
    'Make today count!',
    'Success is built one line at a time!'
  ];
  
  const emojis = [
    '🚀', '💻', '🎉', '✨', '🌟', '💪', '🔥', '⚡', 
    '🎯', '🏆', '🌈', '🎨', '💡', '🎸', '🌺', '🦄',
    '🎭', '🎪', '🎬', '📚', '🔮', '🌸', '🍀', '🌙'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const emoji1 = emojis[Math.floor(Math.random() * emojis.length)];
  const emoji2 = emojis[Math.floor(Math.random() * emojis.length)];
  
  return `${emoji1} ${randomMessage} ${emoji2}`;
}

router.get('/updateReadMe', async function (req, res, next) {
  try {
    const owner = 'smithdavedesign'; // GitHub owner (your username)
    const repo = 'gitHub-cron-job-app'; // GitHub repository name
    const path = 'README.md'; // Replace with the path to the README file
    const message = 'Append random message of the day';
    
    // Fetch the current content and SHA of the README file
    const fileData = await getFileContentAndSha(owner, repo, path);
    
    // Decode the current content from Base64
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    
    // Generate random message of the day
    const randomMessage = getRandomMessageOfTheDay();
    
    // Append the new message on a new line
    const updatedContent = `${currentContent}\n${randomMessage}`;

    // Encode the updated content as Base64
    const updatedContentBase64 = Buffer.from(updatedContent).toString('base64');

    // Update the README file with the updated content and SHA
    const result = await updateReadme(owner, repo, path, message, updatedContentBase64, fileData.sha);

    console.log('README updated successfully.');
    res.send(result);
  } catch (error) {
    console.error('Error updating README:', error);
    res.status(error.status || 500).send('Error updating README: ' + error.message);
  }
});

cron.schedule('30 14 * * 1-5', async () => {
  try {
    const owner = 'smithdavedesign'; // GitHub owner (your username)
    const repo = 'gitHub-cron-job-app'; // GitHub repository name
    const path = 'README.md'; // Replace with the path to the README file
    const message = 'Append random message of the day';
    
    // Fetch the current content and SHA of the README file
    const fileData = await getFileContentAndSha(owner, repo, path);
    
    // Decode the current content from Base64
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    
    // Generate random message of the day
    const randomMessage = getRandomMessageOfTheDay();
    
    // Append the new message on a new line
    const updatedContent = `${currentContent}\n${randomMessage}`;

    // Encode the updated content as Base64
    const updatedContentBase64 = Buffer.from(updatedContent).toString('base64');

    // Update the README file with the updated content and SHA
    const result = await updateReadme(owner, repo, path, message, updatedContentBase64, fileData.sha);

    console.log('README updated successfully via cron job.');
  } catch (error) {
    console.error('Error updating README via cron job:', error);
  }
});

module.exports = router;
