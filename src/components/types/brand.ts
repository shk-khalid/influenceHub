export interface Brand {
    id: string;
    name: string;
    sector: string;
    location: string;
    overall_rating: string;
    market_share: string;
    growth_percentage: string;
  }
  
  export interface BrandDetail extends Brand {
    recent_valuation: string;
    performance_metrics: {
      market_share: string;
      growth_rate: string;
    };
    competitors: {
      competitor_name: string;
    }[];
    gender_demographics: {
      male_percentage: string;
      female_percentage: string;
    };
    valuation_history: {
      year: number;
      valuation: string;
    }[];
    sentiment: null | {
      // Add sentiment fields if they become available
    };
  }