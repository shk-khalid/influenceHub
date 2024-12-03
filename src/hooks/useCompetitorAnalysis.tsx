import { useMemo } from 'react';
import { useCompetitor } from '../context/CompetitorContext';
import { CompetitorMetrics } from '../components/types';

export function useCompetitorAnalytics(): CompetitorMetrics {
  const { filteredCompetitors } = useCompetitor();
  const competitors = filteredCompetitors();

  return useMemo(() => {
    const totalCompetitors = competitors.length;
    
    if (totalCompetitors === 0) {
      return {
        totalCompetitors: 0,
        averageEngagement: '0',
        topPerformer: undefined,
        platformDistribution: {},
      };
    }

    const averageEngagement = (
      competitors.reduce((acc, curr) => acc + Number(curr.engagement), 0) / totalCompetitors
    ).toFixed(1);
    
    const topPerformer = competitors.reduce((prev, current) => 
      (Number(current.engagement) > Number(prev.engagement)) ? current : prev
    );

    const platformDistribution = competitors.reduce((acc, curr) => {
      acc[curr.platform] = (acc[curr.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCompetitors,
      averageEngagement,
      topPerformer,
      platformDistribution,
    };
  }, [competitors]);
}