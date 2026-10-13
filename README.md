### Updated on: 2026-10-12T21:30:00.415Z automated and pushed by cronjob 5 times

# Installation

Since the repository is already checked out, install the dependencies:

```bash
npm install
```

# Configuration

1. Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2. Edit the `.env` file and set your GitHub Personal Access Token (required scopes: repo).
    You can generate a token at: https://github.com/settings/tokens
3. Optionally, set the PORT (defaults to 3000).

# Running the project

To start the server:
    ```bash
    npm start
    ```

# Available npm scripts

- `start`: Starts the server (node ./bin/www)
- `lint`: Runs ESLint
- `lint:fix`: Runs ESLint with auto-fix
- `test`: Currently runs lint (as there are no tests specified)