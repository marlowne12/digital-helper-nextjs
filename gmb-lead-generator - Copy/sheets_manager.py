"""
Sheets Manager Module
Handles Google Sheets integration for lead tracking and pipeline management.
"""

from typing import Dict, List, Any, Optional
from datetime import datetime
import json


class SheetsManager:
    """Google Sheets integration for lead management."""

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Sheets manager with configuration.

        Args:
            config: Dictionary containing Google Sheets API credentials
        """
        self.credentials = config.get('sheets_credentials')
        self.spreadsheet_id = config.get('spreadsheet_id')
        self.sheet_name = config.get('sheet_name', 'SEO Leads')

    def create_or_update_sheet(
        self,
        leads: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Create or update Google Sheet with lead data.

        Args:
            leads: List of enriched lead dictionaries

        Returns:
            Dictionary with operation results
        """
        # In production, use google-api-python-client:
        # from googleapiclient.discovery import build
        # service = build('sheets', 'v4', credentials=creds)

        headers = self._get_sheet_headers()
        rows = self._format_leads_for_sheet(leads)

        # Simulated API interaction
        result = {
            'spreadsheet_id': self.spreadsheet_id or 'new_spreadsheet_id',
            'sheet_name': self.sheet_name,
            'rows_added': len(rows),
            'total_columns': len(headers),
            'url': f'https://docs.google.com/spreadsheets/d/{self.spreadsheet_id or "new_id"}',
            'success': True
        }

        return result

    def _get_sheet_headers(self) -> List[str]:
        """
        Get column headers for the lead tracking sheet.

        Returns:
            List of header column names
        """
        return [
            'Business Name',
            'Category',
            'Address',
            'Phone',
            'Email',
            'Website',
            'GMB Profile URL',
            'Review Count',
            'Average Rating',
            'GMB Completeness %',
            'Missing GMB Fields',
            'Page Speed Mobile',
            'Page Speed Desktop',
            'Mobile Friendly',
            'Missing Meta Tags',
            'SEO Overall Score',
            'Lead Score',
            'Lead Tier',
            'Priority',
            'Opportunities',
            'Status',
            'Notes',
            'Date Added',
            'Last Contact',
            'Recommended Action'
        ]

    def _format_leads_for_sheet(
        self,
        leads: List[Dict[str, Any]]
    ) -> List[List[Any]]:
        """
        Format lead data into rows for Google Sheets.

        Args:
            leads: List of enriched lead dictionaries

        Returns:
            List of row data (each row is a list of cell values)
        """
        rows = []

        for lead in leads:
            # Extract data with safe fallbacks
            gmb_data = lead
            seo_analysis = lead.get('seo_analysis', {})
            scoring = lead.get('scoring', {})

            row = [
                gmb_data.get('name', ''),
                gmb_data.get('category', ''),
                gmb_data.get('address', ''),
                gmb_data.get('contact_info', {}).get('phone', ''),
                gmb_data.get('contact_info', {}).get('email', ''),
                gmb_data.get('contact_info', {}).get('website', ''),
                gmb_data.get('gmb_url', ''),
                gmb_data.get('review_analysis', {}).get('review_count', 0),
                gmb_data.get('review_analysis', {}).get('average_rating', 0),
                gmb_data.get('profile_analysis', {}).get('completeness_percentage', 0),
                ', '.join(gmb_data.get('profile_analysis', {}).get('missing_fields', [])),
                seo_analysis.get('page_speed', {}).get('mobile_score', 'N/A'),
                seo_analysis.get('page_speed', {}).get('desktop_score', 'N/A'),
                'Yes' if seo_analysis.get('mobile_friendly', {}).get('is_mobile_friendly') else 'No',
                ', '.join(seo_analysis.get('meta_tags', {}).get('missing_tags', [])),
                seo_analysis.get('overall_score', 0),
                scoring.get('total_score', 0),
                scoring.get('tier', '').upper(),
                scoring.get('priority_level', 4),
                '\n'.join(scoring.get('opportunities', [])),
                'New',  # Initial status
                '',     # Notes (empty initially)
                datetime.now().strftime('%Y-%m-%d'),
                '',     # Last contact (empty initially)
                scoring.get('recommended_action', '')
            ]

            rows.append(row)

        return rows

    def append_leads(
        self,
        leads: List[Dict[str, Any]],
        check_duplicates: bool = True
    ) -> Dict[str, Any]:
        """
        Append new leads to existing sheet.

        Args:
            leads: List of lead dictionaries
            check_duplicates: Whether to check for existing leads

        Returns:
            Dictionary with operation results
        """
        if check_duplicates:
            # In production, fetch existing data and filter duplicates
            existing_leads = self._get_existing_leads()
            new_leads = self._filter_duplicates(leads, existing_leads)
        else:
            new_leads = leads

        if not new_leads:
            return {
                'rows_added': 0,
                'duplicates_skipped': len(leads),
                'message': 'All leads already exist in sheet'
            }

        return self.create_or_update_sheet(new_leads)

    def _get_existing_leads(self) -> List[Dict[str, Any]]:
        """
        Fetch existing leads from sheet.

        Returns:
            List of existing lead data
        """
        # In production, fetch from Google Sheets API
        # For template, return empty list
        return []

    def _filter_duplicates(
        self,
        new_leads: List[Dict[str, Any]],
        existing_leads: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Filter out duplicate leads.

        Args:
            new_leads: New leads to add
            existing_leads: Existing leads in sheet

        Returns:
            List of non-duplicate leads
        """
        # Create set of existing identifiers (website or GMB URL)
        existing_identifiers = set()
        for lead in existing_leads:
            website = lead.get('website', '').strip().lower()
            gmb_url = lead.get('gmb_url', '').strip().lower()
            if website:
                existing_identifiers.add(website)
            if gmb_url:
                existing_identifiers.add(gmb_url)

        # Filter new leads
        filtered_leads = []
        for lead in new_leads:
            website = lead.get('contact_info', {}).get('website', '').strip().lower()
            gmb_url = lead.get('gmb_url', '').strip().lower()

            is_duplicate = (
                (website and website in existing_identifiers) or
                (gmb_url and gmb_url in existing_identifiers)
            )

            if not is_duplicate:
                filtered_leads.append(lead)

        return filtered_leads

    def update_lead_status(
        self,
        business_name: str,
        status: str,
        notes: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Update status of an existing lead.

        Args:
            business_name: Name of business to update
            status: New status (New/Contacted/Qualified/Converted)
            notes: Optional notes to add

        Returns:
            Dictionary with update results
        """
        # In production, find row and update specific cells
        # For template, return simulated result

        return {
            'business_name': business_name,
            'status_updated': status,
            'notes_added': notes or '',
            'last_updated': datetime.now().isoformat(),
            'success': True
        }

    def get_leads_by_tier(self, tier: str) -> List[Dict[str, Any]]:
        """
        Retrieve leads filtered by tier.

        Args:
            tier: Lead tier (hot/warm/cold/poor_fit)

        Returns:
            List of leads matching tier
        """
        # In production, query sheet with filter
        # For template, return empty list
        return []

    def format_sheet_with_conditional_formatting(self) -> Dict[str, Any]:
        """
        Apply conditional formatting rules to the sheet.

        Returns:
            Dictionary with formatting results
        """
        # In production, apply conditional formatting via API:
        # - Color-code by lead tier (hot=red, warm=yellow, cold=blue)
        # - Highlight low SEO scores
        # - Format dates
        # - Add data validation for Status column

        formatting_rules = [
            {
                'column': 'Lead Tier',
                'rule': 'Color by value',
                'values': {
                    'HOT': '#ff0000',      # Red
                    'WARM': '#ffa500',     # Orange
                    'COLD': '#4285f4',     # Blue
                    'POOR_FIT': '#9e9e9e'  # Gray
                }
            },
            {
                'column': 'SEO Overall Score',
                'rule': 'Color scale',
                'min_color': '#ff0000',    # Red (low score)
                'max_color': '#00ff00'     # Green (high score)
            },
            {
                'column': 'Status',
                'rule': 'Data validation',
                'allowed_values': ['New', 'Contacted', 'Qualified', 'Converted', 'Not Interested']
            }
        ]

        return {
            'formatting_rules_applied': len(formatting_rules),
            'success': True
        }


def main():
    """Example usage of Sheets manager."""
    # Load config
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Initialize manager
    manager = SheetsManager(config)

    # Example lead data
    leads = [
        {
            'name': 'Example Restaurant',
            'category': 'restaurant',
            'address': '123 Main St, Chicago, IL',
            'gmb_url': 'https://goo.gl/maps/example',
            'contact_info': {
                'phone': '(555) 123-4567',
                'email': 'contact@example.com',
                'website': 'https://example.com'
            },
            'review_analysis': {
                'review_count': 8,
                'average_rating': 3.7
            },
            'profile_analysis': {
                'completeness_percentage': 60,
                'missing_fields': ['Business hours', 'Photos']
            },
            'seo_analysis': {
                'overall_score': 55,
                'page_speed': {
                    'mobile_score': 45,
                    'desktop_score': 68
                },
                'mobile_friendly': {
                    'is_mobile_friendly': True
                },
                'meta_tags': {
                    'missing_tags': ['meta description']
                }
            },
            'scoring': {
                'total_score': 72,
                'tier': 'warm',
                'priority_level': 2,
                'opportunities': [
                    'Incomplete GMB profile',
                    'Low review count',
                    'Poor mobile page speed'
                ],
                'recommended_action': 'Schedule outreach - moderate SEO needs present'
            }
        }
    ]

    # Create/update sheet
    result = manager.create_or_update_sheet(leads)

    print(f"\nGoogle Sheet Updated:")
    print(f"  Spreadsheet: {result['url']}")
    print(f"  Rows added: {result['rows_added']}")
    print(f"  Sheet name: {result['sheet_name']}")


if __name__ == "__main__":
    main()
