# GitHub Cron Job App 🤖

A Node.js Express application that automatically updates your GitHub repository's README file using scheduled cron jobs. This project demonstrates the integration of GitHub API (via Octokit), automated task scheduling, and RESTful API design.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.16.x-lightgrey.svg)](https://expressjs.com/)

## 📋 Table of Contents

- [Purpose](#-purpose)
- [Features](#-features)
- [Demo](#-demo)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Technology Stack](#-technology-stack)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Purpose

This application serves as a practical example of:

- **Automated GitHub Operations**: Demonstrates how to programmatically interact with GitHub repositories using the Octokit API
- **Scheduled Tasks**: Implements cron jobs to perform automated updates at specific times
- **RESTful API Design**: Provides HTTP endpoints for manual triggering of automated tasks
- **Environment-Based Configuration**: Uses environment variables for secure credential management

Perfect for learning about automation, GitHub API integration, and scheduled task execution in Node.js!

## ✨ Features

- ⏰ **Automated README Updates**: Scheduled cron job updates README file Monday-Friday at 2:30 PM
- 🔄 **Manual Trigger**: REST API endpoint to manually trigger README updates
- 🔐 **Secure Authentication**: Uses GitHub Personal Access Token with environment variables
- 📝 **Timestamp Tracking**: Automatically adds timestamps to track update history
- 🚀 **Express Server**: Full-featured Express.js web server
- 🛡️ **Error Handling**: Comprehensive error handling for GitHub API operations

## 🎬 Demo

The application runs a scheduled task that updates the README file with a timestamp:

```
### Updated on: 2025-11-21T14:30:00.106Z
```

You can also manually trigger updates by accessing:
```
http://localhost:3000/cronjobs/updateReadMe
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- **Git**
- **GitHub Account** with a Personal Access Token

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/smithdavedesign/gitHub-cron-job-app.git
   cd gitHub-cron-job-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see [Configuration](#-configuration)):
   ```bash
   cp .env.example .env
   ```

4. **Configure your GitHub token**
   
   Edit `.env` and add your GitHub Personal Access Token

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# GitHub Personal Access Token
# Generate at: https://github.com/settings/tokens
# Required scopes: repo (Full control of private repositories)
GITHUB_TOKEN=your_github_personal_access_token_here

# Server Port (optional, defaults to 3000)
PORT=3000
```

### Getting a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" (classic)
3. Give it a descriptive name
4. Select the `repo` scope (full control of repositories)
5. Click "Generate token"
6. Copy the token and add it to your `.env` file

⚠️ **Security Note**: Never commit your `.env` file or expose your GitHub token publicly!

## 💻 Usage

### Starting the Server

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Automated Cron Job

The application automatically runs a cron job:
- **Schedule**: Monday-Friday at 14:30 (2:30 PM) UTC
- **Action**: Updates the README.md file in the repository with a new timestamp

### Manual Update Trigger

To manually trigger a README update, access:

```bash
curl http://localhost:3000/cronjobs/updateReadMe
```

Or open in your browser:
```
http://localhost:3000/cronjobs/updateReadMe
```

### Accessing the Home Page

```
http://localhost:3000/
```

## 📁 Project Structure

```
gitHub-cron-job-app/
├── bin/
│   └── www                 # Server startup script
├── public/
│   ├── index.html          # Static HTML homepage
│   └── stylesheets/
│       └── style.css       # CSS styles
├── routes/
│   ├── index.js            # Home route handler
│   └── cronjobs.js         # Cron job routes and GitHub API logic
├── app.js                  # Express application setup
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables (not in repo)
├── .env.example            # Environment variable template
└── README.md               # This file
```

### Key Files

- **`routes/cronjobs.js`**: Contains the GitHub API integration, cron job scheduling, and README update logic
- **`app.js`**: Express application configuration and middleware setup
- **`bin/www`**: HTTP server initialization and startup
- **`.env`**: Environment variables for configuration (create from `.env.example`)

## 🔌 API Endpoints

### `GET /`
- **Description**: Renders the home page
- **Response**: HTML page with Express welcome message

### `GET /cronjobs/updateReadMe`
- **Description**: Manually triggers a README update in the GitHub repository
- **Response**: JSON object with update result or error message
- **Example Response**:
  ```json
  {
    "content": {...},
    "commit": {...}
  }
  ```

## 🛠️ Technology Stack

### Core Technologies
- **[Node.js](https://nodejs.org/)**: JavaScript runtime
- **[Express.js](https://expressjs.com/)**: Web application framework
- **[@octokit/core](https://github.com/octokit/core.js)**: GitHub REST API client
- **[node-cron](https://www.npmjs.com/package/node-cron)**: Task scheduler

### Dependencies
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Environment variable management
- **[axios](https://axios-http.com/)**: HTTP client
- **[morgan](https://www.npmjs.com/package/morgan)**: HTTP request logger
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Cookie parsing middleware

## 🚢 Deployment

### Deploying to Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set GITHUB_TOKEN=your_token_here
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Deploying to Railway/Render/Vercel

1. Connect your GitHub repository
2. Set the `GITHUB_TOKEN` environment variable in the platform's settings
3. Deploy with the default Node.js buildpack
4. Ensure the start command is: `npm start`

### Environment Variables on Production

Make sure to set the following environment variables in your deployment platform:
- `GITHUB_TOKEN`: Your GitHub Personal Access Token
- `PORT`: (Optional) Will be set automatically by most platforms

### Important Notes

- The cron job uses UTC time zone. Adjust the schedule in `routes/cronjobs.js` if needed:
  ```javascript
  cron.schedule('30 14 * * 1-5', async () => { ... });
  // Format: minute hour day month day-of-week
  ```
- Ensure your deployment platform supports always-on processes if you want the cron job to run continuously
- Consider using a proper process manager like PM2 for production deployments

## 🔮 Future Improvements

Potential enhancements to consider:

- [ ] **TypeScript Migration**: Add type safety to the codebase
- [ ] **Unit Tests**: Implement Jest/Mocha tests for core functionality
- [ ] **ESLint/Prettier**: Add code linting and formatting
- [ ] **Docker Support**: Create Dockerfile for containerized deployment
- [ ] **Advanced Scheduling**: Make cron schedule configurable via environment variables
- [ ] **Multiple Repositories**: Support updating multiple repositories
- [ ] **Dashboard UI**: Create a web interface to manage and monitor cron jobs
- [ ] **Logging System**: Implement Winston or Bunyan for better logging
- [ ] **Database Integration**: Store update history in MongoDB/PostgreSQL
- [ ] **Notifications**: Add email/Slack notifications for successful/failed updates
- [ ] **Rate Limiting**: Implement API rate limiting protection
- [ ] **CI/CD Pipeline**: Add GitHub Actions for automated testing and deployment

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Update documentation as needed
- Add tests for new features (when testing is implemented)

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 smithdavedesign

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

**Made with ❤️ by [smithdavedesign](https://github.com/smithdavedesign)**

*Note: This project is for educational and demonstration purposes.*