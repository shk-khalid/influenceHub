export interface Brand {
    id: string;
    logo?: string;
    name: string;
    sector: string;
    location: string;
    rating: number;
    value: {
        year: number;
        amount: number;
    }[];
    marketShare: number;
    growthRate: number;
}

export interface Competitor {
    competitor_name: string;
}

export interface GenderDemographics {
    male_percentage: number;
    female_percentage: number;
}

export interface ValuationHistory {
    year: number;
    valuation: number;
}

export interface BrandDetails {
    id: string;
    logo?: string;
    name: string;
    sector: string;
    location: string;
    rating: number;
    value: number;
    share: number;
    growth: number;
    performance_metrics: {
        share: number;
        rate: number;
    };
    competitors: Competitor[];
    gender_demographics: GenderDemographics;
    valuation_history: ValuationHistory[];
    sentiment: string | null;
}