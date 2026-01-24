---
name: gmb-lead-generator
description: Automated lead generation workflow that finds SEO opportunities from Google My Business data, analyzes websites, scores leads, and manages outreach via Gmail and Google Sheets
---

# GMB Lead Generator

This skill automates the complete lead generation workflow for finding and qualifying SEO service opportunities using Google My Business data.

## Capabilities

- **GMB Data Extraction**: Query Google My Business API to find local businesses matching lead criteria
- **Multi-Criteria Lead Discovery**: Identify prospects with missing/poor websites, low reviews, or incomplete GMB profiles
- **SEO Website Audit**: Automated analysis of page speed, meta tags, mobile-friendliness, and on-page SEO
- **Lead Scoring**: Intelligent qualification system ranking leads by SEO opportunity potential
- **Google Sheets Integration**: Automated lead tracking with detailed SEO metrics and pipeline status
- **Gmail Outreach Automation**: Generate personalized email drafts for manual review before sending
- **Progress Tracking**: Full pipeline visibility from discovery to outreach

## Input Requirements

**GMB Search Parameters**:
- Geographic location (city, region, or lat/long coordinates)
- Business categories to target (e.g., "restaurant", "plumber", "dentist")
- Search radius (in miles or kilometers)
- Minimum/maximum criteria thresholds

**Lead Qualification Criteria**:
- Review count threshold (e.g., fewer than 10 reviews)
- Rating threshold (e.g., below 4.0 stars)
- GMB profile completeness check
- Website quality requirements

**Configuration** (via config.json):
- Google My Business API credentials
- Google Sheets API credentials
- Gmail API credentials
- SEO analysis preferences
- Outreach email templates

## Output Formats

### Google Sheets Structure
Detailed lead tracker with columns:
- Business Name
- Contact Email/Phone
- Website URL
- GMB Profile URL
- Review Count & Rating
- GMB Completeness Score
- Page Speed Score (Mobile/Desktop)
- Mobile-Friendly Status
- Missing Meta Tags
- SEO Opportunity Score (0-100)
- Status (New/Contacted/Qualified/Converted)
- Notes
- Date Added
- Last Contact Date

### Gmail Drafts
Personalized email drafts include:
- Customized greeting with business name
- Specific SEO findings from audit
- Value proposition tailored to their weaknesses
- Clear call-to-action
- Professional signature

### Analysis Reports
- Lead discovery summary
- SEO audit findings per prospect
- Prioritized outreach list
- Aggregate opportunity metrics

## How to Use

**Basic Workflow**:
```
"Find SEO leads in Chicago for restaurants with poor online presence"
"Analyze GMB listings in Miami for plumbers with incomplete profiles"
"Generate outreach emails for the top 20 SEO leads"
```

**Advanced Usage**:
```
"Search GMB for dentists within 25 miles of ZIP 90210 with fewer than 15 reviews,
audit their websites, score the leads, add to my Google Sheet, and create Gmail
drafts for the top 10 prospects"
```

## Scripts

- `gmb_client.py`: Google My Business API integration for business discovery
- `seo_analyzer.py`: Website SEO audit engine (page speed, meta tags, mobile-friendliness)
- `lead_scorer.py`: Lead qualification and scoring algorithm
- `sheets_manager.py`: Google Sheets integration for lead tracking
- `gmail_outreach.py`: Gmail API integration for draft creation
- `config.example.json`: Configuration template for API credentials

## Setup Requirements

### API Access Needed
1. **Google My Business API** - Business profile access
2. **Google Sheets API** - Spreadsheet management
3. **Gmail API** - Draft email creation
4. **PageSpeed Insights API** (optional) - Website performance metrics

### Installation Steps
1. Copy `config.example.json` to `config.json`
2. Add your API credentials to `config.json`
3. Enable required Google APIs in Google Cloud Console
4. Set up OAuth 2.0 credentials for Gmail and Sheets
5. Configure email templates in `config.json`
6. Install Python dependencies: `google-api-python-client`, `google-auth`, `requests`, `beautifulsoup4`

## Best Practices

1. **Start Small**: Test with a small geographic area before scaling
2. **Respect Rate Limits**: GMB API has quotas - batch requests appropriately
3. **Verify Emails**: Always review Gmail drafts before sending to avoid spam complaints
4. **Update Sheets Regularly**: Keep lead status current to avoid duplicate outreach
5. **Personalize Templates**: Customize email templates for different business categories
6. **Monitor Quality**: Review SEO analysis accuracy with sample manual audits
7. **Track Metrics**: Monitor conversion rates to refine lead scoring criteria

## Workflow Stages

### Stage 1: Discovery
- Query GMB API with search criteria
- Filter businesses by review count, ratings, profile completeness
- Extract contact information and website URLs
- Initial lead list creation

### Stage 2: Analysis
- Automated website SEO audit for each lead
- Page speed testing (mobile + desktop)
- Meta tag analysis (title, description, keywords)
- Mobile-friendliness check
- Missing SEO elements detection

### Stage 3: Qualification
- Calculate SEO opportunity score (0-100)
- Rank leads by priority
- Filter by minimum score threshold
- Categorize by business type

### Stage 4: Export
- Create/update Google Sheet with all lead data
- Include detailed SEO metrics
- Set initial status to "New"
- Add timestamp

### Stage 5: Outreach
- Generate personalized Gmail drafts
- Reference specific SEO findings
- Include business name and category
- Save to Gmail drafts folder for manual review

## Lead Scoring Algorithm

Scores calculated based on:
- **GMB Profile Issues** (30 points): Incomplete hours, missing photos, no description
- **Review Performance** (20 points): Low review count or poor ratings
- **Website Quality** (30 points): Slow page speed, missing meta tags, not mobile-friendly
- **Contact Availability** (20 points): Email/phone present and valid

**Score Interpretation**:
- 80-100: Hot lead - Significant SEO opportunity
- 60-79: Warm lead - Moderate SEO needs
- 40-59: Cold lead - Minor improvements needed
- 0-39: Poor fit - May not need services

## Limitations

- **API Quotas**: GMB, Sheets, and Gmail APIs have daily limits
- **Data Accuracy**: Business information may be outdated or incomplete
- **Website Access**: Some websites may block automated analysis
- **Email Deliverability**: Requires manual sending to maintain sender reputation
- **Geographic Scope**: GMB data quality varies by region
- **Analysis Depth**: Basic SEO audit only - not comprehensive technical analysis
- **GDPR/Privacy**: Ensure compliance with data protection regulations

## Privacy & Compliance

- Store only publicly available business information
- Respect opt-out requests immediately
- Follow CAN-SPAM Act requirements
- Obtain consent before adding to email lists
- Secure API credentials properly
- Don't abuse GMB data for spam

## Troubleshooting

**Common Issues**:
- **API Authentication Errors**: Re-authenticate OAuth tokens
- **Rate Limit Exceeded**: Reduce batch size or add delays
- **Website Timeouts**: Increase timeout settings or skip slow sites
- **Missing Data**: Handle null values gracefully in scoring
- **Duplicate Leads**: Check for existing entries before adding to sheet

## Future Enhancements

Potential additions:
- Competitor analysis integration
- Social media presence auditing
- Local SEO ranking checks
- Automated follow-up sequences
- CRM integration (HubSpot, Salesforce)
- Advanced reporting dashboards
- A/B testing for email templates
