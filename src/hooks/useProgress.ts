import { useState, useEffect, useCallback } from 'react';
import type { ProgressData } from '../types';

const generateStorageKey = (dataHash: string) => `onboard_progress_${dataHash}`;

// Simple hash function for creating unique storage keys
const hashData = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

export function useProgress(encodedData: string) {
  const storageKey = generateStorageKey(hashData(encodedData));
  
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
    }
    return {
      completedItems: [],
      lastVisited: 'line-manager-actions',
      lastUpdated: Date.now(),
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress, storageKey]);

  const toggleItem = useCallback((itemId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedItems.includes(itemId);
      const newCompletedItems = isCompleted
        ? prev.completedItems.filter((id) => id !== itemId)
        : [...prev.completedItems, itemId];
      
      return {
        ...prev,
        completedItems: newCompletedItems,
        lastUpdated: Date.now(),
      };
    });
  }, []);

  const isItemCompleted = useCallback((itemId: string) => {
    return progress.completedItems.includes(itemId);
  }, [progress.completedItems]);

  const setLastVisited = useCallback((sectionId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastVisited: sectionId,
      lastUpdated: Date.now(),
    }));
  }, []);

  const getCompletedCount = useCallback((itemIds: string[]) => {
    return itemIds.filter((id) => progress.completedItems.includes(id)).length;
  }, [progress.completedItems]);

  const getSectionProgress = useCallback((sectionItemIds: string[]) => {
    const completed = getCompletedCount(sectionItemIds);
    return {
      completed,
      total: sectionItemIds.length,
      percentage: sectionItemIds.length > 0 ? (completed / sectionItemIds.length) * 100 : 0,
      isComplete: completed === sectionItemIds.length && sectionItemIds.length > 0,
    };
  }, [getCompletedCount]);

  return {
    progress,
    toggleItem,
    isItemCompleted,
    setLastVisited,
    getCompletedCount,
    getSectionProgress,
    totalCompleted: progress.completedItems.length,
  };
}
