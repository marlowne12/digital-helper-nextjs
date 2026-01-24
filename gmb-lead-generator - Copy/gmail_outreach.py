"""
Gmail Outreach Module
Handles Gmail API integration for personalized email draft creation.
"""

from typing import Dict, List, Any, Optional
from datetime import datetime
import json
import base64


class GmailOutreach:
    """Gmail integration for automated outreach draft creation."""

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Gmail outreach manager.

        Args:
            config: Dictionary containing Gmail API credentials and templates
        """
        self.credentials = config.get('gmail_credentials')
        self.sender_email = config.get('sender_email', 'your-email@example.com')
        self.email_templates = config.get('email_templates', {})
        self.signature = config.get('email_signature', '')

    def create_outreach_drafts(
        self,
        leads: List[Dict[str, Any]],
        template_name: str = 'default',
        max_drafts: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Create personalized Gmail drafts for leads.

        Args:
            leads: List of qualified leads
            template_name: Name of email template to use
            max_drafts: Maximum number of drafts to create (None for all)

        Returns:
            Dictionary with draft creation results
        """
        # In production, use Gmail API:
        # from googleapiclient.discovery import build
        # service = build('gmail', 'v1', credentials=creds)

        template = self._get_template(template_name)
        leads_to_email = leads[:max_drafts] if max_drafts else leads

        drafts_created = []
        errors = []

        for lead in leads_to_email:
            try:
                draft = self._create_draft_for_lead(lead, template)
                drafts_created.append(draft)
            except Exception as e:
                errors.append({
                    'business_name': lead.get('name', 'Unknown'),
                    'error': str(e)
                })

        return {
            'drafts_created': len(drafts_created),
            'errors': len(errors),
            'error_details': errors,
            'drafts': drafts_created,
            'success': len(errors) == 0
        }

    def _create_draft_for_lead(
        self,
        lead: Dict[str, Any],
        template: Dict[str, str]
    ) -> Dict[str, Any]:
        """
        Create a personalized email draft for a single lead.

        Args:
            lead: Lead data dictionary
            template: Email template dictionary

        Returns:
            Dictionary with draft information
        """
        # Extract lead information
        recipient_email = lead.get('contact_info', {}).get('email', '')
        if not recipient_email:
            raise ValueError('No email address available')

        # Personalize email content
        subject = self._personalize_subject(lead, template.get('subject', ''))
        body = self._personalize_body(lead, template.get('body', ''))

        # Create email message
        message = self._create_email_message(
            to=recipient_email,
            subject=subject,
            body=body
        )

        # In production, create draft via Gmail API:
        # draft = service.users().drafts().create(userId='me', body={'message': message}).execute()

        # Simulated draft creation
        draft = {
            'id': f'draft_{lead.get("name", "").replace(" ", "_")}_{datetime.now().timestamp()}',
            'recipient': recipient_email,
            'business_name': lead.get('name', ''),
            'subject': subject,
            'created_at': datetime.now().isoformat(),
            'gmail_url': f'https://mail.google.com/mail/u/0/#drafts'
        }

        return draft

    def _personalize_subject(self, lead: Dict[str, Any], template_subject: str) -> str:
        """
        Personalize email subject line.

        Args:
            lead: Lead data
            template_subject: Subject template string

        Returns:
            Personalized subject line
        """
        business_name = lead.get('name', 'Your Business')
        category = lead.get('category', 'business').title()

        # Replace template variables
        subject = template_subject.replace('{business_name}', business_name)
        subject = subject.replace('{category}', category)

        return subject

    def _personalize_body(self, lead: Dict[str, Any], template_body: str) -> str:
        """
        Personalize email body with specific SEO findings.

        Args:
            lead: Lead data
            template_body: Body template string

        Returns:
            Personalized email body
        """
        # Extract data for personalization
        business_name = lead.get('name', 'Your Business')
        category = lead.get('category', 'business')
        scoring = lead.get('scoring', {})
        opportunities = scoring.get('opportunities', [])
        seo_score = lead.get('seo_analysis', {}).get('overall_score', 0)

        # Build findings section
        findings = self._format_seo_findings(lead, opportunities)

        # Replace template variables
        body = template_body.replace('{business_name}', business_name)
        body = body.replace('{category}', category)
        body = body.replace('{seo_findings}', findings)
        body = body.replace('{seo_score}', str(seo_score))

        # Add signature
        if self.signature:
            body += f'\n\n{self.signature}'

        return body

    def _format_seo_findings(
        self,
        lead: Dict[str, Any],
        opportunities: List[str]
    ) -> str:
        """
        Format SEO findings for email body.

        Args:
            lead: Lead data
            opportunities: List of opportunity strings

        Returns:
            Formatted findings text
        """
        if not opportunities:
            return "I noticed some opportunities to improve your online presence."

        findings_text = "I noticed a few areas where we could help improve your online visibility:\n\n"

        for i, opportunity in enumerate(opportunities[:3], 1):  # Top 3 only
            findings_text += f"{i}. {opportunity}\n"

        # Add specific insights
        seo_analysis = lead.get('seo_analysis', {})
        if not seo_analysis.get('error'):
            page_speed = seo_analysis.get('page_speed', {})
            mobile_score = page_speed.get('mobile_score', 100)

            if mobile_score < 60:
                findings_text += f"\nYour mobile site speed is currently scoring {mobile_score}/100, which could be affecting your search rankings and user experience."

        return findings_text.strip()

    def _create_email_message(
        self,
        to: str,
        subject: str,
        body: str
    ) -> Dict[str, Any]:
        """
        Create email message in Gmail API format.

        Args:
            to: Recipient email address
            subject: Email subject
            body: Email body

        Returns:
            Message dictionary for Gmail API
        """
        message_text = f"To: {to}\nSubject: {subject}\n\n{body}"

        # In production, encode for Gmail API:
        # message_bytes = message_text.encode('utf-8')
        # message_b64 = base64.urlsafe_b64encode(message_bytes).decode('utf-8')

        return {
            'raw': base64.urlsafe_b64encode(message_text.encode('utf-8')).decode('utf-8')
        }

    def _get_template(self, template_name: str) -> Dict[str, str]:
        """
        Get email template by name.

        Args:
            template_name: Name of template

        Returns:
            Template dictionary with subject and body
        """
        default_template = {
            'subject': 'Quick question about {business_name}\'s online presence',
            'body': '''Hi there,

I came across {business_name} while researching {category}s in your area, and I wanted to reach out with something that might be helpful.

{seo_findings}

I specialize in helping local {category}s improve their online visibility and would love to chat about some quick wins we could implement to help you attract more customers.

Would you be open to a brief 15-minute call to discuss how we could help? No pressure—just wanted to share what I found.

Looking forward to hearing from you!'''
        }

        return self.email_templates.get(template_name, default_template)

    def list_drafts(self) -> List[Dict[str, Any]]:
        """
        List existing Gmail drafts.

        Returns:
            List of draft summaries
        """
        # In production, fetch from Gmail API:
        # results = service.users().drafts().list(userId='me').execute()
        # drafts = results.get('drafts', [])

        return []

    def delete_draft(self, draft_id: str) -> Dict[str, Any]:
        """
        Delete a Gmail draft.

        Args:
            draft_id: ID of draft to delete

        Returns:
            Dictionary with deletion result
        """
        # In production, delete via Gmail API:
        # service.users().drafts().delete(userId='me', id=draft_id).execute()

        return {
            'draft_id': draft_id,
            'deleted': True,
            'timestamp': datetime.now().isoformat()
        }


def main():
    """Example usage of Gmail outreach."""
    # Load config
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Initialize outreach manager
    gmail = GmailOutreach(config)

    # Example lead data
    leads = [
        {
            'name': 'Example Restaurant',
            'category': 'restaurant',
            'contact_info': {
                'email': 'contact@example-restaurant.com'
            },
            'seo_analysis': {
                'overall_score': 55,
                'page_speed': {
                    'mobile_score': 45
                }
            },
            'scoring': {
                'total_score': 72,
                'tier': 'warm',
                'opportunities': [
                    'Incomplete GMB profile: missing Business hours, Photos',
                    'Low review count (8 reviews)',
                    'Poor mobile page speed (45/100)',
                    'Missing SEO elements: meta description, Open Graph tags'
                ]
            }
        }
    ]

    # Create drafts
    result = gmail.create_outreach_drafts(leads, template_name='default', max_drafts=10)

    print(f"\nGmail Drafts Created: {result['drafts_created']}")
    print(f"Errors: {result['errors']}")

    if result['drafts']:
        print(f"\nFirst draft:")
        draft = result['drafts'][0]
        print(f"  To: {draft['recipient']}")
        print(f"  Business: {draft['business_name']}")
        print(f"  Subject: {draft['subject']}")
        print(f"  URL: {draft['gmail_url']}")


if __name__ == "__main__":
    main()
