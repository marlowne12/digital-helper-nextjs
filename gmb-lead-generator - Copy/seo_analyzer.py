"""
SEO Analyzer Module
Performs automated website SEO audits including page speed, meta tags, and mobile-friendliness.
"""

from typing import Dict, List, Any, Optional
import json
import re


class SEOAnalyzer:
    """Automated SEO audit engine for website analysis."""

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize SEO analyzer with configuration.

        Args:
            config: Dictionary containing analysis settings and API keys
        """
        self.pagespeed_api_key = config.get('pagespeed_api_key')
        self.timeout = config.get('analysis_timeout', 30)
        self.user_agent = 'Mozilla/5.0 (SEO Analyzer Bot)'

    def analyze_website(self, url: str) -> Dict[str, Any]:
        """
        Perform comprehensive SEO audit on a website.

        Args:
            url: Website URL to analyze

        Returns:
            Dictionary with complete SEO audit results
        """
        if not url or not self._is_valid_url(url):
            return self._create_error_result('Invalid URL')

        # In production, these would make actual HTTP requests
        # For this template, we simulate the analysis

        try:
            page_speed = self._analyze_page_speed(url)
            meta_tags = self._analyze_meta_tags(url)
            mobile_friendly = self._check_mobile_friendliness(url)
            on_page_seo = self._analyze_on_page_seo(url)

            return {
                'url': url,
                'page_speed': page_speed,
                'meta_tags': meta_tags,
                'mobile_friendly': mobile_friendly,
                'on_page_seo': on_page_seo,
                'overall_score': self._calculate_overall_score(
                    page_speed, meta_tags, mobile_friendly, on_page_seo
                ),
                'analysis_date': self._get_timestamp()
            }

        except Exception as e:
            return self._create_error_result(f'Analysis failed: {str(e)}')

    def _analyze_page_speed(self, url: str) -> Dict[str, Any]:
        """
        Analyze page speed using PageSpeed Insights API.

        Args:
            url: Website URL

        Returns:
            Dictionary with page speed metrics
        """
        # In production, call PageSpeed Insights API:
        # https://developers.google.com/speed/docs/insights/v5/get-started

        # Simulated response
        return {
            'mobile_score': 65,  # 0-100
            'desktop_score': 78,  # 0-100
            'first_contentful_paint': 2.5,  # seconds
            'speed_index': 3.8,  # seconds
            'time_to_interactive': 4.2,  # seconds
            'total_blocking_time': 350,  # milliseconds
            'largest_contentful_paint': 3.2,  # seconds
            'cumulative_layout_shift': 0.15,  # score
            'metrics': {
                'mobile_issues': ['Slow server response time', 'Unoptimized images'],
                'desktop_issues': ['Render-blocking resources'],
                'recommendations': [
                    'Enable text compression',
                    'Optimize images',
                    'Reduce server response time',
                    'Eliminate render-blocking resources'
                ]
            }
        }

    def _analyze_meta_tags(self, url: str) -> Dict[str, Any]:
        """
        Analyze meta tags and SEO elements.

        Args:
            url: Website URL

        Returns:
            Dictionary with meta tag analysis
        """
        # In production, fetch and parse HTML with BeautifulSoup
        # from bs4 import BeautifulSoup

        # Simulated analysis
        return {
            'title': {
                'present': True,
                'value': 'Example Business - Services',
                'length': 32,
                'optimal': False,  # Should be 50-60 chars
                'issues': ['Title too short']
            },
            'description': {
                'present': False,
                'value': None,
                'length': 0,
                'optimal': False,
                'issues': ['Missing meta description']
            },
            'keywords': {
                'present': False,
                'value': None,
                'issues': ['No meta keywords (less important)']
            },
            'og_tags': {
                'present': False,
                'count': 0,
                'issues': ['Missing Open Graph tags for social sharing']
            },
            'canonical': {
                'present': False,
                'issues': ['No canonical URL specified']
            },
            'robots': {
                'present': True,
                'value': 'index, follow',
                'issues': []
            },
            'viewport': {
                'present': True,
                'value': 'width=device-width, initial-scale=1',
                'issues': []
            },
            'missing_tags': [
                'meta description',
                'Open Graph tags',
                'canonical URL'
            ]
        }

    def _check_mobile_friendliness(self, url: str) -> Dict[str, Any]:
        """
        Check mobile-friendliness of website.

        Args:
            url: Website URL

        Returns:
            Dictionary with mobile-friendliness analysis
        """
        # In production, use Google Mobile-Friendly Test API
        # or analyze responsive design features

        return {
            'is_mobile_friendly': True,
            'has_viewport_meta': True,
            'text_readable': True,
            'tap_targets_sized': False,
            'content_fits_screen': True,
            'issues': [
                'Some tap targets too small for mobile users'
            ],
            'mobile_usability_score': 85  # 0-100
        }

    def _analyze_on_page_seo(self, url: str) -> Dict[str, Any]:
        """
        Analyze on-page SEO elements.

        Args:
            url: Website URL

        Returns:
            Dictionary with on-page SEO analysis
        """
        # In production, parse HTML and analyze structure

        return {
            'h1_tags': {
                'count': 1,
                'optimal': True,
                'issues': []
            },
            'h2_tags': {
                'count': 3,
                'optimal': True,
                'issues': []
            },
            'image_alt_tags': {
                'total_images': 12,
                'images_with_alt': 8,
                'percentage': 67,
                'issues': ['4 images missing alt text']
            },
            'internal_links': {
                'count': 15,
                'issues': []
            },
            'external_links': {
                'count': 5,
                'nofollow_count': 2,
                'issues': []
            },
            'word_count': 850,
            'keyword_optimization': {
                'primary_keyword_present': True,
                'keyword_density': 2.3,  # percentage
                'issues': []
            }
        }

    def _calculate_overall_score(
        self,
        page_speed: Dict[str, Any],
        meta_tags: Dict[str, Any],
        mobile_friendly: Dict[str, Any],
        on_page_seo: Dict[str, Any]
    ) -> int:
        """
        Calculate overall SEO score (0-100).

        Args:
            page_speed: Page speed analysis results
            meta_tags: Meta tag analysis results
            mobile_friendly: Mobile-friendliness results
            on_page_seo: On-page SEO results

        Returns:
            Overall SEO score (0-100)
        """
        # Weighted scoring
        speed_score = (page_speed['mobile_score'] + page_speed['desktop_score']) / 2
        meta_score = self._calculate_meta_score(meta_tags)
        mobile_score = mobile_friendly['mobile_usability_score']
        onpage_score = self._calculate_onpage_score(on_page_seo)

        # Weights: Page Speed 30%, Meta Tags 30%, Mobile 20%, On-Page 20%
        overall = (
            speed_score * 0.30 +
            meta_score * 0.30 +
            mobile_score * 0.20 +
            onpage_score * 0.20
        )

        return int(overall)

    def _calculate_meta_score(self, meta_tags: Dict[str, Any]) -> int:
        """Calculate score for meta tags (0-100)."""
        score = 100
        deductions = {
            'missing_title': 30,
            'missing_description': 30,
            'missing_og_tags': 20,
            'missing_canonical': 10,
            'suboptimal_title': 10
        }

        if not meta_tags['title']['present']:
            score -= deductions['missing_title']
        elif not meta_tags['title']['optimal']:
            score -= deductions['suboptimal_title']

        if not meta_tags['description']['present']:
            score -= deductions['missing_description']

        if not meta_tags['og_tags']['present']:
            score -= deductions['missing_og_tags']

        if not meta_tags['canonical']['present']:
            score -= deductions['missing_canonical']

        return max(0, score)

    def _calculate_onpage_score(self, on_page_seo: Dict[str, Any]) -> int:
        """Calculate score for on-page SEO (0-100)."""
        score = 100

        # Deduct for H1 issues
        if on_page_seo['h1_tags']['count'] == 0:
            score -= 20
        elif on_page_seo['h1_tags']['count'] > 1:
            score -= 10

        # Deduct for alt text issues
        alt_percentage = on_page_seo['image_alt_tags']['percentage']
        if alt_percentage < 50:
            score -= 20
        elif alt_percentage < 80:
            score -= 10

        # Deduct for low word count
        if on_page_seo['word_count'] < 300:
            score -= 15

        return max(0, score)

    def _is_valid_url(self, url: str) -> bool:
        """Validate URL format."""
        url_pattern = re.compile(
            r'^https?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
            r'localhost|'  # localhost
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # or IP
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE
        )
        return bool(url_pattern.match(url))

    def _create_error_result(self, error_message: str) -> Dict[str, Any]:
        """Create error result structure."""
        return {
            'error': True,
            'message': error_message,
            'overall_score': 0,
            'analysis_date': self._get_timestamp()
        }

    def _get_timestamp(self) -> str:
        """Get current timestamp."""
        from datetime import datetime
        return datetime.now().isoformat()


def main():
    """Example usage of SEO analyzer."""
    # Load config
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Initialize analyzer
    analyzer = SEOAnalyzer(config)

    # Analyze website
    result = analyzer.analyze_website('https://example.com')

    print(f"\nSEO Analysis for {result['url']}")
    print(f"Overall Score: {result['overall_score']}/100")
    print(f"\nPage Speed:")
    print(f"  Mobile: {result['page_speed']['mobile_score']}/100")
    print(f"  Desktop: {result['page_speed']['desktop_score']}/100")
    print(f"\nMobile Friendly: {result['mobile_friendly']['is_mobile_friendly']}")
    print(f"Missing Meta Tags: {', '.join(result['meta_tags']['missing_tags'])}")


if __name__ == "__main__":
    main()
