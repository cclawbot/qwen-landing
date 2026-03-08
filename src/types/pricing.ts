export type PricingCategory = 'flagship' | 'standard' | 'lightweight';
export type PricingStatus = 'available' | 'coming-soon' | 'standard';

export interface PricingModel {
  id: string;
  name: string;
  category: PricingCategory;
  inputPrice: number;
  outputPrice: number;
  status: PricingStatus;
  // Comparison data (from competitor)
  competitorInput?: number;
  competitorOutput?: number;
  competitorName?: string;
}

export interface PricingResponse {
  lastUpdated: string;
  models: PricingModel[];
}
