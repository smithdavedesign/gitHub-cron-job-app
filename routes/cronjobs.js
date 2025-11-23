var express = require('express');
const cron = require('node-cron');
const { Octokit } = require('@octokit/core');
require('dotenv').config(); // Load environment variables from .env

const router = express.Router();


// Initialize Octokit with your GitHub Personal Access Token
// const octokit = new Octokit({ auth: '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' });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });


// Function to fetch the current content and SHA of a file in a repository
async function getFileContentAndSha(owner, repo, path) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: owner,
    repo: repo,
    path: path,
  });
  return {
    content: response.data.content,
    sha: response.data.sha,
  };
}

// Function to update the README file in a repository
async function updateReadme(owner, repo, path, message, content, sha) {
  const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: owner,
    repo: repo,
    path: path,
    message: message,
    content: content,
    sha: sha, // Include the SHA of the current content
  });
  return response.data;
}

router.get('/updateReadMe', async function (req, res, _next) {
  try {
    const owner = 'smithdavedesign'; // GitHub owner (your username)
    const repo = 'gitHub-cron-job-app'; // GitHub repository name
    const path = 'README.md'; // Replace with the path to the README file
    const message = 'Update README content';
    const newContent = `### Updated on: ${new Date().toISOString()}`;

    // Fetch the current content and SHA of the README file
    const fileData = await getFileContentAndSha(owner, repo, path);

    // Encode the new content as Base64
    const newContentBase64 = Buffer.from(newContent).toString('base64');

    // Update the README file with the new content and SHA
    const result = await updateReadme(owner, repo, path, message, newContentBase64, fileData.sha);

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
    const message = 'Update README content';
    const newContent = `### Updated on: ${new Date().toISOString()}`;

    // Fetch the current content and SHA of the README file
    const fileData = await getFileContentAndSha(owner, repo, path);

    // Encode the new content as Base64
    const newContentBase64 = Buffer.from(newContent).toString('base64');

    // Update the README file with the new content and SHA
    const result = await updateReadme(owner, repo, path, message, newContentBase64, fileData.sha);

    console.log('README updated successfully:', result.commit.sha);
  } catch (error) {
    console.error('Error updating README:', error.message);
  }
});

module.exports = router;
