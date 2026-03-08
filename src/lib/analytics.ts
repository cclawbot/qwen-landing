/**
 * Analytics tracking utility
 * Privacy-focused: no personal data, no cookies required
 */

export type AnalyticsEventType = 
  | 'pageview'
  | 'calculator_used'
  | 'form_viewed'
  | 'faq_clicked'
  | 'theme_toggled';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  path?: string;
  questionId?: string;
  to?: 'light' | 'dark';
  timestamp: string;
}

/**
 * Track an analytics event
 * Sends to the analytics API endpoint
 */
export async function trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullEvent),
    });
  } catch (error) {
    // Silently fail - analytics should not break the app
    console.debug('Analytics tracking failed:', error);
  }
}

/**
 * Track a page view
 */
export function trackPageView(path: string): void {
  trackEvent({ type: 'pageview', path });
}

/**
 * Track calculator usage
 */
export function trackCalculatorUsed(): void {
  trackEvent({ type: 'calculator_used' });
}

/**
 * Track form view
 */
export function trackFormViewed(): void {
  trackEvent({ type: 'form_viewed' });
}

/**
 * Track FAQ click
 */
export function trackFaqClicked(questionId: string): void {
  trackEvent({ type: 'faq_clicked', questionId });
}

/**
 * Track theme toggle
 */
export function trackThemeToggled(to: 'light' | 'dark'): void {
  trackEvent({ type: 'theme_toggled', to });
}
