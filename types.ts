export type Step = 'intro' | 'input' | 'result';

export interface IkigaiState {
  love: string[];
  goodAt: string[];
  paid: string[];
  needs: string[];
}

export interface IkigaiAnalysis {
  passion: string;
  mission: string;
  profession: string;
  vocation: string;
  ikigaiStatement: string;
  ikigaiDescription: string;
  actionableSteps: string[];
}
