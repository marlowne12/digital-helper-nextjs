# GitHub Organization Scripts

This folder contains automation scripts to help you organize your projects into GitHub repositories.

## Available Scripts

### 1. `inventory-projects.sh`
**Scans your system for projects that need to be on GitHub**

```bash
./scripts/inventory-projects.sh
```

What it does:
- Searches common directories for projects
- Identifies Node.js and Python projects
- Checks which have git initialized
- Checks which are already on GitHub
- Creates a detailed `project-inventory.md` report

### 2. `create-repo.sh`
**Automates the process of creating a GitHub repository**

```bash
./scripts/create-repo.sh <project-path> <repo-name> <description>
```

Example:
```bash
./scripts/create-repo.sh ~/Projects/client-website "client-site" "Client website built with Next.js"
```

What it does:
- Initializes git (if needed)
- Creates .gitignore
- Creates README.md
- Scans for sensitive files
- Commits all files
- Creates GitHub repo
- Pushes code

## Quick Start

1. **Find your projects:**
   ```bash
   ./scripts/inventory-projects.sh
   ```

2. **Review the generated report:**
   ```bash
   cat project-inventory.md
   ```

3. **Create repos for your projects:**
   ```bash
   ./scripts/create-repo.sh ~/Projects/my-project "my-project" "Description"
   ```

## Requirements

- **Git** - Already installed
- **GitHub CLI (gh)** - Install from https://cli.github.com/
  ```bash
  # macOS
  brew install gh

  # Windows
  winget install GitHub.cli

  # Linux
  sudo apt install gh
  ```

- **Authenticate GitHub CLI:**
  ```bash
  gh auth login
  ```

## Workflow

```
1. Scan Projects       2. Review List        3. Create Repos
   ↓                      ↓                      ↓
[inventory.sh]  →    [inventory.md]  →    [create-repo.sh]
                                              ↓
                                          GitHub! 🎉
```

## Tips

- Run `inventory-projects.sh` regularly to catch new projects
- Use descriptive repo names (lowercase, hyphens)
- Always review .gitignore before pushing
- Check for API keys and secrets first
- Write good commit messages
- Add screenshots to READMEs

## Need Help?

See `GITHUB_ORGANIZATION_GUIDE.md` in the project root for detailed documentation.
