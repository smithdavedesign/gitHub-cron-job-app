var express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const axios = require('axios');
const { Octokit } = require('@octokit/core');
const router = express.Router();

// Initialize Octokit with your GitHub Personal Access Token
const octokit = new Octokit({ auth: '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' });

// Function to update repository metadata
async function updateRepository(owner, repo, updates) {
  try {
    const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
      owner: owner,
      repo: repo,
      ...updates, // Include metadata updates (name, description, etc.) as an object
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to update the README file in a repository
async function updateReadme(owner, repo, path, message, content) {
  try {
    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: path,
      message: message,
      content: content,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

router.get('/updateRepository', async function (req, res, next) {
  try {
    const owner = 'smithdavedesign'; // GitHub owner (your username)
    const repo = 'smithdavedesign'; // GitHub repository name

    // Define the updates you want to apply to the repository metadata
    const updates = {
      name: 'Hello-World', // New repository name
      description: 'This is your first repository', // New description
      homepage: 'https://github.com', // New homepage URL
      'private': true, // Set repository to private
      has_issues: true, // Enable issues
      has_projects: true, // Enable projects
      has_wiki: true, // Enable wiki
    };

    const result = await updateRepository(owner, repo, updates);

    console.log('Repository metadata updated successfully.');
    res.send(result);
  } catch (error) {
    console.error('Error updating repository metadata:', error);
    res.status(error.status || 500).send('Error updating repository metadata: ' + error.message);
  }
});

router.get('/updateReadMe', async function (req, res, next) {
  try {
    const owner = 'smithdavedesign'; // GitHub owner (your username)
    const repo = 'portfolio'; // GitHub repository name
    const path = 'secondProject/README.md'; // Replace with the path to the README file
    const message = 'my commit message';
    const content = ` ### Updated on: ${new Date().toISOString()}`;; // Base64-encoded content
    const newContentBase64 = Buffer.from(content).toString('base64'); // Encode the new content as Base64
    const result = await updateReadme(owner, repo, path, message, newContentBase64);


    console.log('README updated successfully.');
    res.send(result);
  } catch (error) {
    console.error('Error updating README:', error);
    res.status(error.status || 500).send('Error updating README: ' + error.message);
  }
});


module.exports = router;
