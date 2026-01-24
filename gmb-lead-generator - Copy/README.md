# GMB Lead Generator Skill

**Version**: 1.0.0
**Author**: Claude Code Skills Factory
**Last Updated**: October 30, 2025

## Overview

The GMB Lead Generator skill automates the complete lead generation workflow for finding and qualifying SEO service opportunities using Google My Business data. This skill combines GMB profile analysis, website SEO auditing, intelligent lead scoring, Google Sheets tracking, and Gmail outreach automation into a streamlined workflow.

## What This Skill Does

1. **Discovers Leads**: Searches Google My Business for local businesses matching your criteria
2. **Analyzes SEO**: Performs automated website audits (page speed, meta tags, mobile-friendliness)
3. **Scores Opportunities**: Intelligently ranks leads based on SEO opportunity potential
4. **Tracks Pipeline**: Organizes leads in Google Sheets with detailed metrics
5. **Automates Outreach**: Creates personalized Gmail drafts for manual review and sending

## Key Features

- ✅ Multi-criteria lead discovery (low reviews, incomplete profiles, poor websites)
- ✅ Comprehensive SEO website audits
- ✅ Intelligent lead scoring algorithm (0-100 scale)
- ✅ Tier classification (Hot/Warm/Cold/Poor Fit)
- ✅ Automated Google Sheets export with 25+ data columns
- ✅ Personalized Gmail draft generation
- ✅ Duplicate lead detection
- ✅ Customizable email templates
- ✅ Full pipeline tracking and status management

## Installation

### Prerequisites

1. **Python 3.8+** installed on your system
2. **Google Cloud Project** with APIs enabled:
   - Google My Business API
   - Google Sheets API
   - Gmail API
   - PageSpeed Insights API (optional)
3. **API Credentials**:
   - Service account credentials for GMB and Sheets
   - OAuth 2.0 credentials for Gmail
4. **Claude Code** installed and configured

### Step 1: Install the Skill

**Option A: Claude Code (Recommended)**
```bash
# Copy skill folder to Claude Code skills directory
cp -r gmb-lead-generator ~/.claude/skills/

# Or install project-level
cp -r gmb-lead-generator .claude/skills/
```

**Option B: Manual Installation**
```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Extract skill files
unzip gmb-lead-generator.zip -d ~/.claude/skills/
```

### Step 2: Install Python Dependencies

```bash
cd ~/.claude/skills/gmb-lead-generator

# Install required packages
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib requests beautifulsoup4
```

**Required Python Packages**:
- `google-api-python-client` - Google APIs client library
- `google-auth-httplib2` - HTTP library for Google Auth
- `google-auth-oauthlib` - OAuth 2.0 support
- `requests` - HTTP library for SEO analysis
- `beautifulsoup4` - HTML parsing for meta tag analysis

### Step 3: Set Up Google Cloud Project

#### 3.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Note your Project ID

#### 3.2 Enable Required APIs

1. Navigate to **APIs & Services > Library**
2. Search for and enable:
   - Google My Business API
   - Google Sheets API
   - Gmail API
3. (Optional) Enable PageSpeed Insights API for detailed page speed analysis

#### 3.3 Create Service Account (for GMB and Sheets)

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. Name it "GMB Lead Generator" and create
4. Click on the service account
5. Go to **Keys** tab
6. Click **Add Key > Create New Key**
7. Choose **JSON** format
8. Download the JSON file (this contains your service account credentials)

#### 3.4 Create OAuth 2.0 Credentials (for Gmail)

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. Choose **Desktop App** as application type
4. Name it "GMB Lead Generator Gmail"
5. Download the credentials JSON file
6. Run OAuth authorization flow:

```bash
python -m google_auth_oauthlib.tool \
  --client-secrets-file=downloaded_credentials.json \
  --scope='https://www.googleapis.com/auth/gmail.compose' \
  --save \
  --credentials-dir=~/.claude/skills/gmb-lead-generator/
```

7. This will open a browser for authorization
8. Authorize the application
9. Credentials will be saved for future use

### Step 4: Configure the Skill

1. **Copy the example config**:
```bash
cp config.example.json config.json
```

2. **Edit config.json** with your credentials:

```json
{
  "gmb_api_key": "your_gmb_api_key",
  "gmb_credentials": {
    // Paste service account JSON contents here
  },
  "sheets_credentials": {
    // Paste service account JSON contents here (can be same as GMB)
  },
  "gmail_credentials": {
    // Paste OAuth credentials here
  },
  "pagespeed_api_key": "your_pagespeed_api_key",
  "spreadsheet_id": "",  // Leave empty to create new sheet automatically
  "sheet_name": "SEO Leads",
  "sender_email": "your-email@example.com",
  // ... other settings
}
```

3. **Customize email templates** (optional):
   - Edit the `email_templates` section in `config.json`
   - Create templates for different industries
   - Personalize tone and messaging

4. **Adjust scoring weights** (optional):
   - Modify `scoring_weights` to prioritize different factors
   - Change `score_thresholds` to adjust tier classifications

### Step 5: Test the Installation

```bash
# Test GMB client
python gmb_client.py

# Test SEO analyzer
python seo_analyzer.py

# Test lead scorer
python lead_scorer.py

# Test Sheets manager
python sheets_manager.py

# Test Gmail outreach
python gmail_outreach.py
```

Each script has a `main()` function that demonstrates basic usage.

## File Structure

```
gmb-lead-generator/
├── SKILL.md                    # Skill definition and instructions
├── README.md                   # This file
├── HOW_TO_USE.md              # Usage examples and invocation patterns
├── config.example.json         # Configuration template
├── config.json                 # Your credentials (create from example)
├── gmb_client.py              # GMB API integration
├── seo_analyzer.py            # SEO audit engine
├── lead_scorer.py             # Lead scoring algorithm
├── sheets_manager.py          # Google Sheets integration
├── gmail_outreach.py          # Gmail draft automation
├── sample_input.json          # Example input format
└── expected_output.json       # Example output format
```

## Usage

Once installed, invoke the skill through Claude Code:

### Basic Usage

```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you find restaurants
in Chicago with poor online presence and create a lead tracking sheet?
```

### Full Workflow

```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you:
1. Search for plumbers in Miami within 20 miles
2. Filter for businesses with fewer than 10 reviews
3. Analyze their websites for SEO issues
4. Score and rank the leads
5. Add them to Google Sheets
6. Create Gmail drafts for the top 15 prospects
```

See **HOW_TO_USE.md** for more examples and detailed invocation patterns.

## Configuration Options

### Search Criteria
- `search_radius`: Distance in miles (default: 25)
- `categories`: Business types to search
- `min_reviews`: Minimum review threshold
- `max_rating`: Maximum rating threshold

### Scoring Weights
- `gmb_profile`: Weight for GMB completeness (default: 30%)
- `review_performance`: Weight for review metrics (default: 20%)
- `website_quality`: Weight for SEO quality (default: 30%)
- `contact_availability`: Weight for contact info (default: 20%)

### Score Thresholds
- `hot`: Minimum score for hot leads (default: 80)
- `warm`: Minimum score for warm leads (default: 60)
- `cold`: Minimum score for cold leads (default: 40)

### Email Templates
- `default`: Generic professional template
- `restaurant`: Tailored for food service businesses
- `professional_services`: For lawyers, accountants, consultants, etc.
- Custom templates can be added

## API Quotas and Limits

Be aware of Google API quotas:

- **GMB API**: 1,000 requests per day (check current limits)
- **Sheets API**: 100 requests per 100 seconds per user
- **Gmail API**:
  - Send quota: 100-500 per day (varies by account type)
  - Draft creation: More generous limits
- **PageSpeed Insights API**: 25,000 requests per day

**Recommendation**: Start with small batches (10-20 leads) and scale up gradually.

## Security Best Practices

1. **Protect config.json**: Never commit this file to version control
   ```bash
   # Add to .gitignore
   echo "config.json" >> .gitignore
   ```

2. **Restrict API Credentials**:
   - Use service accounts with minimum required permissions
   - Rotate credentials periodically
   - Enable 2FA on Google accounts

3. **Secure Email Access**:
   - Use OAuth 2.0 (not legacy passwords)
   - Limit scope to `gmail.compose` only
   - Review authorized applications regularly

4. **Data Privacy**:
   - Only collect publicly available information
   - Comply with GDPR, CAN-SPAM, and local regulations
   - Provide opt-out mechanism in emails
   - Delete data when no longer needed

## Troubleshooting

### "Authentication failed" errors
- **Solution**: Re-run OAuth authorization flow
- Check credentials in `config.json` are valid
- Verify API is enabled in Google Cloud Console

### "Quota exceeded" errors
- **Solution**: Reduce batch sizes
- Add delays between API calls
- Wait for quota reset (usually 24 hours)
- Consider upgrading API quotas if needed

### "Permission denied" errors
- **Solution**: Check service account has access to spreadsheet
- Share Google Sheet with service account email
- Verify OAuth scopes include required permissions

### SEO analysis timing out
- **Solution**: Increase `analysis_timeout` in config.json
- Some websites may be genuinely slow or blocking bots
- Skip problematic websites and continue

### No leads found
- **Solution**: Relax search criteria
- Expand search radius
- Try different business categories
- Lower review/rating thresholds

## Advanced Features

### Custom Scoring Algorithms
Modify `lead_scorer.py` to implement your own scoring logic:
- Add new scoring components
- Adjust weights dynamically based on business category
- Incorporate additional data sources

### Multi-Language Support
Update email templates to support different languages:
- Add language-specific template sets
- Detect business location and use appropriate language
- Customize for regional preferences

### Integration with CRM
Extend `sheets_manager.py` to integrate with:
- HubSpot
- Salesforce
- Pipedrive
- Custom CRM systems via API

### Automated Follow-Ups
Create follow-up sequences:
- Track days since last contact
- Generate reminder emails
- Update status based on responses

## Performance Optimization

**For Large-Scale Operations**:
1. Use batch API requests where possible
2. Implement caching for repeated analyses
3. Parallelize SEO analysis with threading
4. Use async I/O for API calls
5. Store intermediate results to resume interrupted workflows

## Support and Contributions

**Issues**: Report bugs or request features via GitHub Issues
**Documentation**: Full documentation at [docs link]
**Examples**: Additional examples in `examples/` directory

## License

This skill is part of the Claude Code Skills Factory and is provided as-is for customization and use.

## Changelog

### Version 1.0.0 (2025-10-30)
- Initial release
- GMB lead discovery
- SEO website auditing
- Lead scoring and qualification
- Google Sheets integration
- Gmail outreach automation
- 5 Python modules
- Configurable templates and scoring
- Comprehensive documentation

## Roadmap

**Planned Features**:
- [ ] Competitor analysis integration
- [ ] Social media presence auditing
- [ ] Local keyword ranking checks
- [ ] Automated follow-up sequences
- [ ] CRM integrations (HubSpot, Salesforce)
- [ ] A/B testing for email templates
- [ ] Advanced reporting dashboards
- [ ] Multi-location business support
- [ ] Franchise chain analysis
- [ ] Industry-specific scoring models

---

**Questions?** Refer to HOW_TO_USE.md for usage examples or consult the official Claude Skills documentation.
