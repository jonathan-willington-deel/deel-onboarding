import { useMemo } from 'react';
import type { OnboardingData } from '../types';
import { defaultOnboardingData } from '../data/defaultContent';

export function encodeOnboardingData(data: OnboardingData): string {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
  } catch (e) {
    console.error('Failed to encode onboarding data:', e);
    return '';
  }
}

export function decodeOnboardingData(encoded: string): OnboardingData | null {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to decode onboarding data:', e);
    return null;
  }
}

export function useOnboardingData(encodedData: string | null): OnboardingData {
  return useMemo(() => {
    if (!encodedData) {
      return defaultOnboardingData as OnboardingData;
    }
    
    const decoded = decodeOnboardingData(encodedData);
    if (!decoded) {
      return defaultOnboardingData as OnboardingData;
    }
    
    // Merge with defaults to ensure all fields exist
    return {
      ...defaultOnboardingData,
      ...decoded,
    } as OnboardingData;
  }, [encodedData]);
}

export function generateOnboardingUrl(data: OnboardingData, baseUrl: string = window.location.origin): string {
  const encoded = encodeOnboardingData(data);
  const path = window.location.pathname.replace(/\/$/, '');
  return `${baseUrl}${path}/#/onboard?data=${encoded}`;
}
