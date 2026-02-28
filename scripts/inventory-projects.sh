#!/bin/bash

# Project Inventory Script
# Scans your local system for projects that should be on GitHub

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   PROJECT INVENTORY SCANNER            ║${NC}"
echo -e "${BLUE}║   Finding projects to organize         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Common project locations (adjust as needed)
SEARCH_PATHS=(
    "$HOME/Desktop"
    "$HOME/Documents"
    "$HOME/Projects"
    "$HOME/Development"
    "$HOME/Code"
    "$HOME/Work"
    "$HOME/Clients"
)

# Output file
OUTPUT_FILE="project-inventory.md"

# Initialize output
cat > "$OUTPUT_FILE" << 'EOF'
# Project Inventory
> Generated on $(date +"%Y-%m-%d %H:%M:%S")

This document lists all projects found on your system that could be organized into GitHub repositories.

## Summary

EOF

# Counters
total_projects=0
node_projects=0
git_projects=0
no_git_projects=0

echo -e "${CYAN}🔍 Scanning for projects...${NC}"
echo ""

# Create temporary file for project list
temp_projects=$(mktemp)

# Find all directories with package.json (Node/JS projects)
for search_path in "${SEARCH_PATHS[@]}"; do
    if [ -d "$search_path" ]; then
        echo -e "${YELLOW}📁 Scanning: $search_path${NC}"
        find "$search_path" -name "node_modules" -prune -o -type f -name "package.json" -print 2>/dev/null | while read -r package_file; do
            project_dir=$(dirname "$package_file")
            echo "$project_dir" >> "$temp_projects"
        done
    fi
done

# Also find Python projects (with requirements.txt or setup.py)
for search_path in "${SEARCH_PATHS[@]}"; do
    if [ -d "$search_path" ]; then
        find "$search_path" -type f \( -name "requirements.txt" -o -name "setup.py" \) -print 2>/dev/null | while read -r python_file; do
            project_dir=$(dirname "$python_file")
            echo "$project_dir" >> "$temp_projects"
        done
    fi
done

# Remove duplicates and sort
sort -u "$temp_projects" -o "$temp_projects"

# Process each project
{
    echo "| Project Name | Path | Has Git | Type | Last Modified | Action Needed |"
    echo "|--------------|------|---------|------|---------------|---------------|"
} >> "$OUTPUT_FILE"

while IFS= read -r project_dir; do
    if [ ! -d "$project_dir" ]; then
        continue
    fi

    total_projects=$((total_projects + 1))

    # Get project name
    project_name=$(basename "$project_dir")

    # Check if it's a git repository
    has_git="❌"
    action_needed="Create repo"
    if [ -d "$project_dir/.git" ]; then
        has_git="✅"
        git_projects=$((git_projects + 1))

        # Check if it has a remote
        cd "$project_dir"
        if git remote -v | grep -q "github"; then
            action_needed="✅ On GitHub"
        else
            action_needed="Add remote"
        fi
    else
        no_git_projects=$((no_git_projects + 1))
    fi

    # Determine project type
    project_type="Unknown"
    if [ -f "$project_dir/package.json" ]; then
        node_projects=$((node_projects + 1))
        if grep -q "next" "$project_dir/package.json" 2>/dev/null; then
            project_type="Next.js"
        elif grep -q "react" "$project_dir/package.json" 2>/dev/null; then
            project_type="React"
        elif grep -q "vue" "$project_dir/package.json" 2>/dev/null; then
            project_type="Vue"
        else
            project_type="Node.js"
        fi
    elif [ -f "$project_dir/requirements.txt" ] || [ -f "$project_dir/setup.py" ]; then
        project_type="Python"
    fi

    # Get last modified date
    last_modified=$(stat -f "%Sm" -t "%Y-%m-%d" "$project_dir" 2>/dev/null || stat -c "%y" "$project_dir" 2>/dev/null | cut -d' ' -f1 || echo "Unknown")

    # Truncate long paths for display
    short_path=$(echo "$project_dir" | sed "s|$HOME|~|")
    if [ ${#short_path} -gt 40 ]; then
        short_path="...${short_path: -37}"
    fi

    # Add to table
    echo "| $project_name | $short_path | $has_git | $project_type | $last_modified | $action_needed |" >> "$OUTPUT_FILE"

    # Console output
    if [ "$action_needed" = "Create repo" ]; then
        echo -e "${YELLOW}📦 $project_name${NC} - ${RED}Not on GitHub${NC}"
    elif [ "$action_needed" = "Add remote" ]; then
        echo -e "${YELLOW}📦 $project_name${NC} - ${YELLOW}Git initialized, needs remote${NC}"
    else
        echo -e "${GREEN}📦 $project_name${NC} - ${GREEN}Already on GitHub${NC}"
    fi

done < "$temp_projects"

# Add summary to output
{
    echo ""
    echo "## Statistics"
    echo ""
    echo "- **Total Projects Found:** $total_projects"
    echo "- **Node.js Projects:** $node_projects"
    echo "- **Projects with Git:** $git_projects"
    echo "- **Projects without Git:** $no_git_projects"
    echo ""
    echo "## Priority Actions"
    echo ""
    echo "### 🔴 High Priority (No Git)"
    echo ""
} >> "$OUTPUT_FILE"

# List projects without git
while IFS= read -r project_dir; do
    if [ ! -d "$project_dir/.git" ]; then
        project_name=$(basename "$project_dir")
        echo "- [ ] **$project_name** - \`$project_dir\`" >> "$OUTPUT_FILE"
        echo "  - Run: \`./scripts/create-repo.sh \"$project_dir\" \"$project_name\" \"Project description\"\`" >> "$OUTPUT_FILE"
    fi
done < "$temp_projects"

{
    echo ""
    echo "### 🟡 Medium Priority (Git but no remote)"
    echo ""
} >> "$OUTPUT_FILE"

# List projects with git but no remote
while IFS= read -r project_dir; do
    if [ -d "$project_dir/.git" ]; then
        cd "$project_dir"
        if ! git remote -v | grep -q "github"; then
            project_name=$(basename "$project_dir")
            echo "- [ ] **$project_name** - \`$project_dir\`" >> "$OUTPUT_FILE"
            echo "  - Run: \`cd \"$project_dir\" && gh repo create marlowne12/$project_name --public --source=. --remote=origin --push\`" >> "$OUTPUT_FILE"
        fi
    fi
done < "$temp_projects"

{
    echo ""
    echo "## Quick Commands"
    echo ""
    echo "\`\`\`bash"
    echo "# Make the creation script executable"
    echo "chmod +x ./scripts/create-repo.sh"
    echo ""
    echo "# Create a repo for a project"
    echo "./scripts/create-repo.sh /path/to/project \"repo-name\" \"Description\""
    echo ""
    echo "# Example:"
    echo "./scripts/create-repo.sh ~/Projects/client-site \"client-website\" \"Client website built with Next.js\""
    echo "\`\`\`"
    echo ""
    echo "## Next Steps"
    echo ""
    echo "1. Review the projects listed above"
    echo "2. Prioritize which ones to publish first (client work, portfolio pieces)"
    echo "3. Run the create-repo.sh script for each project"
    echo "4. Update your portfolio website with links to the repos"
    echo "5. Pin your best 6 repos on your GitHub profile"
    echo ""
    echo "---"
    echo ""
    echo "*Generated by Digital Helper GitHub Organization System*"
} >> "$OUTPUT_FILE"

# Clean up
rm "$temp_projects"

# Summary output
echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SCAN COMPLETE                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📊 Summary:${NC}"
echo -e "  ${GREEN}Total Projects:${NC} $total_projects"
echo -e "  ${GREEN}Node.js Projects:${NC} $node_projects"
echo -e "  ${GREEN}With Git:${NC} $git_projects"
echo -e "  ${YELLOW}Without Git:${NC} $no_git_projects"
echo ""
echo -e "${GREEN}✅ Inventory saved to: $OUTPUT_FILE${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "  1. Review $OUTPUT_FILE"
echo "  2. Make create-repo.sh executable: chmod +x ./scripts/create-repo.sh"
echo "  3. Start creating repos for your projects!"
echo ""
