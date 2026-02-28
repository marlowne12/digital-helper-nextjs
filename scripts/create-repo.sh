#!/bin/bash

# GitHub Repository Creator for Digital Helper
# Usage: ./create-repo.sh <project-directory> <repo-name> <description>
# Example: ./create-repo.sh ~/Projects/client-site "client-website" "Client website built with Next.js"

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_DIR=$1
REPO_NAME=$2
DESCRIPTION=$3
GITHUB_USERNAME="marlowne12"

# Validate inputs
if [ -z "$PROJECT_DIR" ] || [ -z "$REPO_NAME" ] || [ -z "$DESCRIPTION" ]; then
    echo -e "${RED}❌ Error: Missing required arguments${NC}"
    echo "Usage: ./create-repo.sh <project-directory> <repo-name> <description>"
    echo "Example: ./create-repo.sh ~/Projects/client-site \"client-website\" \"Client website built with Next.js\""
    exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Error: Project directory does not exist: $PROJECT_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Creating GitHub repository: $REPO_NAME${NC}"
echo -e "${BLUE}📁 Project: $PROJECT_DIR${NC}"
echo ""

# Navigate to project
cd "$PROJECT_DIR" || exit

# Check for sensitive files
echo -e "${YELLOW}🔍 Checking for sensitive files...${NC}"
if grep -r "sk-" . 2>/dev/null | grep -v node_modules | grep -v ".git"; then
    echo -e "${RED}⚠️  WARNING: Possible API keys found! Please review before pushing.${NC}"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo -e "${GREEN}📦 Initializing git...${NC}"
    git init
    git branch -M main
else
    echo -e "${GREEN}✓ Git already initialized${NC}"
fi

# Create comprehensive .gitignore if missing
if [ ! -f ".gitignore" ]; then
    echo -e "${GREEN}📝 Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js
bower_components/

# Production
build/
dist/
.next/
out/
*.tsbuildinfo

# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local
.vercel

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
pnpm-debug.log*

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-workspace
*.sublime-project

# Testing
coverage/
.nyc_output/
*.lcov

# Misc
.cache/
.parcel-cache/
.eslintcache

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Temporary files
*.tmp
*.temp
EOF
else
    echo -e "${GREEN}✓ .gitignore exists${NC}"
fi

# Create basic README if missing
if [ ! -f "README.md" ]; then
    echo -e "${GREEN}📄 Creating README.md...${NC}"

    # Detect tech stack
    TECH_STACK=""
    if [ -f "package.json" ]; then
        if grep -q "next" package.json; then
            TECH_STACK="$TECH_STACK\n- [Next.js](https://nextjs.org/) - React Framework"
        fi
        if grep -q "typescript" package.json; then
            TECH_STACK="$TECH_STACK\n- [TypeScript](https://www.typescriptlang.org/) - Type Safety"
        fi
        if grep -q "tailwind" package.json; then
            TECH_STACK="$TECH_STACK\n- [Tailwind CSS](https://tailwindcss.com/) - Styling"
        fi
    fi

    cat > README.md << EOF
# $REPO_NAME

$DESCRIPTION

## Features

- Modern, responsive design
- Lightning-fast performance
- SEO optimized
- Mobile-first approach

## Tech Stack
$TECH_STACK

## Installation

\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Then edit .env.local with your values
\`\`\`

## Development

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Deployment

This project is deployed on [Vercel](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/$GITHUB_USERNAME/$REPO_NAME)

## Environment Variables

Create a \`.env.local\` file with the following variables:

\`\`\`
# Add your environment variables here
NEXT_PUBLIC_API_URL=
\`\`\`

## License

© $(date +%Y) Digital Helper Agency. All rights reserved.
EOF
else
    echo -e "${GREEN}✓ README.md exists${NC}"
fi

# Create .env.example if .env exists but .env.example doesn't
if [ -f ".env" ] && [ ! -f ".env.example" ]; then
    echo -e "${GREEN}📝 Creating .env.example...${NC}"
    sed 's/=.*/=/' .env > .env.example
fi

# Stage all files
echo -e "${GREEN}📦 Staging files...${NC}"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    # Initial commit
    echo -e "${GREEN}💾 Creating initial commit...${NC}"
    git commit -m "Initial commit: $DESCRIPTION

- Set up project structure
- Add documentation
- Configure environment

Created by Digital Helper Agency"
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI (gh) not found${NC}"
    echo -e "${BLUE}Please install it: https://cli.github.com/${NC}"
    echo -e "${BLUE}Or create the repo manually and run:${NC}"
    echo -e "${BLUE}git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git${NC}"
    echo -e "${BLUE}git push -u origin main${NC}"
    exit 1
fi

# Create GitHub repo using gh CLI
echo -e "${GREEN}🌐 Creating GitHub repository...${NC}"
if gh repo create "$GITHUB_USERNAME/$REPO_NAME" \
    --description "$DESCRIPTION" \
    --public \
    --source=. \
    --remote=origin \
    --push; then

    echo ""
    echo -e "${GREEN}✅ Repository created successfully!${NC}"
    echo -e "${BLUE}🔗 https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "  1. Add topics/tags to your repo"
    echo "  2. Add a screenshot to README"
    echo "  3. Set repository homepage URL"
    echo "  4. Add to your portfolio website"
else
    echo -e "${RED}❌ Failed to create repository${NC}"
    echo "The repository may already exist or there was an authentication issue."
    exit 1
fi
