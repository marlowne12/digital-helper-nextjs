"""
Lead Scorer Module
Intelligent lead qualification and scoring system for SEO opportunities.
"""

from typing import Dict, List, Any, Optional


class LeadScorer:
    """Lead qualification and scoring engine."""

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize lead scorer with configuration.

        Args:
            config: Dictionary containing scoring weights and thresholds
        """
        self.weights = config.get('scoring_weights', {
            'gmb_profile': 30,
            'review_performance': 20,
            'website_quality': 30,
            'contact_availability': 20
        })

        self.thresholds = config.get('score_thresholds', {
            'hot': 80,
            'warm': 60,
            'cold': 40
        })

    def score_lead(
        self,
        gmb_data: Dict[str, Any],
        seo_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Calculate comprehensive lead score.

        Args:
            gmb_data: GMB profile and business data
            seo_analysis: SEO audit results

        Returns:
            Dictionary with score breakdown and qualification
        """
        # Calculate component scores
        gmb_score = self._score_gmb_profile(gmb_data)
        review_score = self._score_reviews(gmb_data)
        website_score = self._score_website(seo_analysis)
        contact_score = self._score_contact_info(gmb_data)

        # Calculate weighted total
        total_score = (
            gmb_score * (self.weights['gmb_profile'] / 100) +
            review_score * (self.weights['review_performance'] / 100) +
            website_score * (self.weights['website_quality'] / 100) +
            contact_score * (self.weights['contact_availability'] / 100)
        )

        # Determine qualification tier
        tier = self._determine_tier(total_score)

        # Identify opportunities
        opportunities = self._identify_opportunities(
            gmb_data, seo_analysis, gmb_score, review_score, website_score
        )

        return {
            'total_score': int(total_score),
            'tier': tier,
            'component_scores': {
                'gmb_profile': gmb_score,
                'review_performance': review_score,
                'website_quality': website_score,
                'contact_availability': contact_score
            },
            'opportunities': opportunities,
            'priority_level': self._get_priority_level(tier),
            'recommended_action': self._get_recommended_action(tier, opportunities)
        }

    def _score_gmb_profile(self, gmb_data: Dict[str, Any]) -> int:
        """
        Score GMB profile completeness (0-100, lower is better opportunity).

        Args:
            gmb_data: GMB profile data

        Returns:
            Score where lower = more opportunity
        """
        profile_analysis = gmb_data.get('profile_analysis', {})
        completeness = profile_analysis.get('completeness_percentage', 100)

        # Invert score: incomplete profile = higher opportunity
        opportunity_score = 100 - completeness

        # Boost score if critical fields missing
        missing_fields = profile_analysis.get('missing_fields', [])
        if 'Business description' in missing_fields:
            opportunity_score = min(100, opportunity_score + 10)
        if 'Business hours' in missing_fields:
            opportunity_score = min(100, opportunity_score + 10)
        if 'Photos' in missing_fields:
            opportunity_score = min(100, opportunity_score + 5)

        return int(opportunity_score)

    def _score_reviews(self, gmb_data: Dict[str, Any]) -> int:
        """
        Score review performance (0-100, lower rating/count = higher opportunity).

        Args:
            gmb_data: GMB business data

        Returns:
            Score where lower = more opportunity
        """
        review_analysis = gmb_data.get('review_analysis', {})
        review_count = review_analysis.get('review_count', 0)
        avg_rating = review_analysis.get('average_rating', 5.0)

        score = 0

        # Review count scoring
        if review_count < 5:
            score += 60
        elif review_count < 10:
            score += 40
        elif review_count < 20:
            score += 20

        # Rating scoring
        if avg_rating < 3.0:
            score += 40
        elif avg_rating < 3.5:
            score += 30
        elif avg_rating < 4.0:
            score += 20

        return min(100, score)

    def _score_website(self, seo_analysis: Dict[str, Any]) -> int:
        """
        Score website SEO quality (0-100, lower quality = higher opportunity).

        Args:
            seo_analysis: SEO audit results

        Returns:
            Score where lower = more opportunity
        """
        if seo_analysis.get('error'):
            # No website or unreachable = maximum opportunity
            return 100

        overall_seo_score = seo_analysis.get('overall_score', 100)

        # Invert SEO score: poor SEO = higher opportunity
        opportunity_score = 100 - overall_seo_score

        # Boost for specific critical issues
        page_speed = seo_analysis.get('page_speed', {})
        meta_tags = seo_analysis.get('meta_tags', {})
        mobile_friendly = seo_analysis.get('mobile_friendly', {})

        # Critical issues boost
        if page_speed.get('mobile_score', 100) < 50:
            opportunity_score = min(100, opportunity_score + 10)

        if not meta_tags.get('description', {}).get('present'):
            opportunity_score = min(100, opportunity_score + 10)

        if not mobile_friendly.get('is_mobile_friendly', True):
            opportunity_score = min(100, opportunity_score + 15)

        return int(opportunity_score)

    def _score_contact_info(self, gmb_data: Dict[str, Any]) -> int:
        """
        Score contact information availability (0-100, more contact = higher score).

        Args:
            gmb_data: GMB business data

        Returns:
            Score where higher = better (easier to contact)
        """
        contact_info = gmb_data.get('contact_info', {})
        contact_score = contact_info.get('contact_score', 0)  # 0-3

        # Convert to 0-100 scale
        score_map = {
            3: 100,  # All contact methods available
            2: 70,   # Two methods available
            1: 40,   # One method available
            0: 10    # No contact info
        }

        base_score = score_map.get(contact_score, 10)

        # Boost if email is available (preferred for outreach)
        if contact_info.get('has_email'):
            base_score = min(100, base_score + 10)

        return base_score

    def _determine_tier(self, score: float) -> str:
        """
        Determine lead qualification tier.

        Args:
            score: Total lead score

        Returns:
            Tier classification string
        """
        if score >= self.thresholds['hot']:
            return 'hot'
        elif score >= self.thresholds['warm']:
            return 'warm'
        elif score >= self.thresholds['cold']:
            return 'cold'
        else:
            return 'poor_fit'

    def _identify_opportunities(
        self,
        gmb_data: Dict[str, Any],
        seo_analysis: Dict[str, Any],
        gmb_score: int,
        review_score: int,
        website_score: int
    ) -> List[str]:
        """
        Identify specific SEO opportunities.

        Args:
            gmb_data: GMB profile data
            seo_analysis: SEO audit results
            gmb_score: GMB profile opportunity score
            review_score: Review opportunity score
            website_score: Website opportunity score

        Returns:
            List of opportunity descriptions
        """
        opportunities = []

        # GMB opportunities
        if gmb_score > 40:
            profile_analysis = gmb_data.get('profile_analysis', {})
            missing_fields = profile_analysis.get('missing_fields', [])
            if missing_fields:
                opportunities.append(
                    f"Incomplete GMB profile: missing {', '.join(missing_fields[:3])}"
                )

        # Review opportunities
        if review_score > 30:
            review_analysis = gmb_data.get('review_analysis', {})
            if review_analysis.get('has_low_reviews'):
                opportunities.append(
                    f"Low review count ({review_analysis.get('review_count', 0)} reviews)"
                )
            if review_analysis.get('has_poor_rating'):
                opportunities.append(
                    f"Below-average rating ({review_analysis.get('average_rating', 0):.1f}/5.0)"
                )

        # Website opportunities
        if website_score > 40:
            if seo_analysis.get('error'):
                opportunities.append("No functional website or website unreachable")
            else:
                # Page speed issues
                page_speed = seo_analysis.get('page_speed', {})
                if page_speed.get('mobile_score', 100) < 60:
                    opportunities.append(
                        f"Poor mobile page speed ({page_speed.get('mobile_score')} /100)"
                    )

                # Meta tag issues
                meta_tags = seo_analysis.get('meta_tags', {})
                missing_tags = meta_tags.get('missing_tags', [])
                if missing_tags:
                    opportunities.append(
                        f"Missing SEO elements: {', '.join(missing_tags[:2])}"
                    )

                # Mobile issues
                mobile_friendly = seo_analysis.get('mobile_friendly', {})
                if not mobile_friendly.get('is_mobile_friendly'):
                    opportunities.append("Website not mobile-friendly")

        return opportunities

    def _get_priority_level(self, tier: str) -> int:
        """
        Get numeric priority level (1-4).

        Args:
            tier: Lead tier classification

        Returns:
            Priority level (1=highest, 4=lowest)
        """
        priority_map = {
            'hot': 1,
            'warm': 2,
            'cold': 3,
            'poor_fit': 4
        }
        return priority_map.get(tier, 4)

    def _get_recommended_action(self, tier: str, opportunities: List[str]) -> str:
        """
        Get recommended next action.

        Args:
            tier: Lead tier classification
            opportunities: List of identified opportunities

        Returns:
            Recommended action string
        """
        if tier == 'hot':
            return f"Priority outreach - {len(opportunities)} major opportunities identified"
        elif tier == 'warm':
            return "Schedule outreach - moderate SEO needs present"
        elif tier == 'cold':
            return "Low priority - minor improvements only"
        else:
            return "Skip - insufficient opportunity"

    def rank_leads(self, scored_leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Rank leads by score and priority.

        Args:
            scored_leads: List of leads with scores

        Returns:
            Sorted list of leads (highest score first)
        """
        return sorted(
            scored_leads,
            key=lambda x: (x['total_score'], x['priority_level']),
            reverse=True
        )


def main():
    """Example usage of lead scorer."""
    # Load config
    import json
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Initialize scorer
    scorer = LeadScorer(config)

    # Example lead data
    gmb_data = {
        'name': 'Example Restaurant',
        'profile_analysis': {
            'completeness_percentage': 60,
            'missing_fields': ['Business hours', 'Photos']
        },
        'review_analysis': {
            'review_count': 8,
            'average_rating': 3.7,
            'has_low_reviews': True,
            'has_poor_rating': True
        },
        'contact_info': {
            'has_email': True,
            'has_phone': True,
            'has_website': True,
            'contact_score': 3
        }
    }

    seo_analysis = {
        'overall_score': 55,
        'page_speed': {
            'mobile_score': 45,
            'desktop_score': 68
        },
        'meta_tags': {
            'description': {'present': False},
            'missing_tags': ['meta description', 'Open Graph tags']
        },
        'mobile_friendly': {
            'is_mobile_friendly': True
        }
    }

    # Score the lead
    result = scorer.score_lead(gmb_data, seo_analysis)

    print(f"\nLead Score: {result['total_score']}/100")
    print(f"Tier: {result['tier'].upper()}")
    print(f"Priority: Level {result['priority_level']}")
    print(f"\nOpportunities:")
    for opp in result['opportunities']:
        print(f"  - {opp}")
    print(f"\nRecommended Action: {result['recommended_action']}")


if __name__ == "__main__":
    main()
