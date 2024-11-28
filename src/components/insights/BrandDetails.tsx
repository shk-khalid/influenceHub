import React from 'react';
import { Brand } from '../types';
import { BrandOverview } from './BrandOverview';
import { MetricsCard } from './cards/MetricsCard';
import { CompetitorsCard } from './cards/CompetitorCard';
import { DemographicsCard } from './cards/DemographicsCard';
import { ValueHistoryCard } from './cards/ValueHistoryCard';
import { SentimentCard } from './cards/SentimentsCard';

interface BrandDetailsProps {
  brand: Brand;
}

export const BrandDetails: React.FC<BrandDetailsProps> = ({ brand }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <BrandOverview brand={brand} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsCard brand={brand} />
        <CompetitorsCard brand={brand} />
        <DemographicsCard brand={brand} />
        <ValueHistoryCard brand={brand} />
        <SentimentCard brand={brand} />
      </div>
    </div>
  );
};