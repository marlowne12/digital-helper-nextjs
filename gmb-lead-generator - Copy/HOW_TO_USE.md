# How to Use This Skill

Hey Claude—I just added the "gmb-lead-generator" skill. Can you find SEO leads in my area and create outreach campaigns?

## Example Invocations

### Example 1: Basic Lead Discovery
```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you find restaurants in Chicago with poor online presence and create a Google Sheet with the results?
```

### Example 2: Full Workflow
```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you:
1. Search for plumbers in Miami within 20 miles
2. Filter for businesses with fewer than 10 reviews or incomplete GMB profiles
3. Analyze their websites for SEO issues
4. Score and rank the leads
5. Add the top leads to my Google Sheet
6. Create Gmail drafts for the top 15 prospects
```

### Example 3: Category-Specific Search
```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you find dentists and orthodontists in Los Angeles with low review counts, analyze their SEO, and generate outreach emails using the "professional_services" template?
```

### Example 4: Quick Analysis
```
Hey Claude—I just added the "gmb-lead-generator" skill. I have a list of business websites. Can you analyze their SEO and score them as leads?
```

### Example 5: Follow-Up Campaign
```
Hey Claude—I just added the "gmb-lead-generator" skill. Can you pull the "warm" tier leads from my Google Sheet and create follow-up email drafts?
```

## What to Provide

### Required Information
- **Geographic location**: City, region, ZIP code, or coordinates
- **Business categories**: Types of businesses to target (e.g., "restaurant", "plumber", "dentist")

### Optional Parameters
- **Search radius**: Distance in miles/kilometers (default: 25 miles)
- **Lead criteria**: Review count thresholds, rating thresholds, profile completeness requirements
- **Analysis depth**: Which SEO checks to perform (page speed, meta tags, mobile-friendliness)
- **Output preferences**: Create Google Sheet, Gmail drafts, both, or analysis only
- **Email template**: Which template to use (default, restaurant, professional_services, or custom)
- **Quantity limits**: Maximum number of leads, drafts, etc.

## What You'll Get

### 1. Lead Discovery Results
- Complete list of businesses matching your criteria
- Business contact information (name, address, phone, email, website)
- GMB profile data and completeness analysis
- Review count and ratings

### 2. SEO Analysis Reports
- Overall SEO score (0-100) for each business
- Page speed metrics (mobile and desktop)
- Meta tag analysis (missing title, description, Open Graph tags, etc.)
- Mobile-friendliness assessment
- On-page SEO evaluation (H1 tags, alt text, internal links, etc.)
- Specific recommendations for improvement

### 3. Lead Scoring & Qualification
- Total opportunity score (0-100) for each lead
- Lead tier classification (Hot/Warm/Cold/Poor Fit)
- Priority ranking (1-4)
- Breakdown by scoring components:
  - GMB profile completeness
  - Review performance
  - Website SEO quality
  - Contact availability
- List of specific opportunities for each lead

### 4. Google Sheets Export
- Comprehensive lead tracking spreadsheet
- 25+ columns with detailed metrics
- Conditional formatting by lead tier
- Status tracking (New/Contacted/Qualified/Converted)
- Timestamped entries
- Shareable link to the spreadsheet

### 5. Gmail Outreach Drafts
- Personalized email drafts saved to Gmail
- Custom subject lines with business name
- Body text referencing specific SEO findings
- Professional formatting with signature
- Ready for manual review and sending
- Direct links to each draft in Gmail

### 6. Summary Analytics
- Total leads found and analyzed
- Breakdown by tier (hot/warm/cold)
- Average scores across metrics
- Key statistics and insights

## Workflow Options

### Option A: Full Automation
Run the complete workflow from discovery to outreach in one command. Best for experienced users who have tested their criteria.

### Option B: Staged Approach
1. **Stage 1**: Discovery only - Find and list potential leads
2. **Stage 2**: Analysis - Audit SEO for selected businesses
3. **Stage 3**: Scoring - Qualify and rank the leads
4. **Stage 4**: Export - Add to Google Sheets
5. **Stage 5**: Outreach - Create email drafts for top leads

### Option C: Manual Review Points
Add review steps between stages to approve leads before moving forward. Recommended for first-time use.

## Tips for Best Results

1. **Start Narrow**: Test with one category and small radius first
2. **Refine Criteria**: Adjust thresholds based on initial results
3. **Review Samples**: Check a few SEO analyses manually to validate accuracy
4. **Customize Templates**: Tailor email templates for your specific services and tone
5. **Track Performance**: Monitor which lead tiers convert best and refine scoring weights
6. **Respect Limits**: Stay within Google API daily quotas
7. **Personalize Outreach**: Always review and customize Gmail drafts before sending
8. **Update Regularly**: Keep Google Sheet status current to avoid duplicate outreach

## Common Use Cases

**Local SEO Agency**: Find small businesses in your service area with poor SEO and pitch optimization services

**Web Design Firm**: Identify businesses with outdated or non-existent websites for redesign opportunities

**Marketing Consultant**: Discover businesses with low GMB engagement and offer local marketing services

**Review Management Service**: Target businesses with few reviews and offer reputation management

**Digital Marketing**: Build targeted outreach lists for Google Ads, local SEO, or content marketing services

## Configuration Requirements

Before using this skill, ensure you have:
- [ ] Google My Business API access enabled
- [ ] Google Sheets API access enabled
- [ ] Gmail API access enabled
- [ ] PageSpeed Insights API key (optional but recommended)
- [ ] `config.json` file created from `config.example.json`
- [ ] All API credentials added to `config.json`
- [ ] OAuth 2.0 authorization completed for Gmail and Sheets
- [ ] Email templates customized (optional)

## Troubleshooting

**No leads found?**
- Expand search radius
- Lower threshold requirements (e.g., accept more reviews)
- Try different business categories

**API errors?**
- Check credentials in `config.json`
- Verify API quotas haven't been exceeded
- Re-authenticate OAuth tokens if expired

**Missing contact information?**
- Some businesses don't publish email addresses
- Use phone numbers as backup contact method
- Consider LinkedIn or website contact forms

**Low-quality SEO analysis?**
- Some websites may block automated analysis
- Increase timeout settings in config
- Manually verify sample results

**Gmail drafts not creating?**
- Ensure Gmail API is enabled
- Check OAuth authorization is current
- Verify email addresses are valid format
