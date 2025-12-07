export type Step = 'intro' | 'input' | 'result';

export interface IkigaiState {
  // Les 4 cercles classiques
  love: string[];
  goodAt: string[];
  paid: string[];
  needs: string[];
  
  // Le "Contexte Humain"
  values: string[]; // 3 valeurs cardinales
  constraints: string[]; // Freins, temps, argent
  energyLevel: number; // 1 à 5
}

export interface TimelinePhase {
  objective: string; // Objectif chiffré/concret (ex: "3 contenus publiés")
  actions: string[];
}

export interface IkigaiAnalysis {
  // Résultats classiques
  passion: string;
  mission: string;
  profession: string;
  vocation: string;
  ikigaiStatement: string;
  ikigaiDescription: string;
  
  // Nouveautés v2.2 (Insight & Pivot)
  keyInsight: string; // La phrase "Wow" / Paradoxe résolu
  pivotPoint: string; // Ce qu'il faut accepter (La vérité difficile)
  signaturePhrase: string; // La phrase d'identité mémorable (ex: Artisan de vitalité)

  contradictions: string[]; // Tensions internes détectées
  
  // Viabilité détaillée
  viability: {
    score: number; // Global 0-100 (Calculé via code maintenant)
    reasoning: string;
    breakdown: {
      motivation: number;
      skills: number;
      market: number;
      time: number;
      financial: number;
    }
  };

  // Risques catégorisés (Structurelles, Personnelles, Stratégiques)
  risks: {
    category: 'Structurelles' | 'Personnelles' | 'Stratégiques';
    description: string;
  }[];

  minimalistIkigai: string;
  realityTests: string[];
  
  // Plan d'action temporel enrichi
  timelineContext: string;
  timeline: {
    week1: TimelinePhase;
    month1: TimelinePhase;
    month3: TimelinePhase;
  };
}