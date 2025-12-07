import { GoogleGenAI, Type } from "@google/genai";
import { IkigaiState, IkigaiAnalysis } from "../types";

// Declaration to avoid TypeScript errors if types are missing
declare const process: {
  env: {
    API_KEY: string;
  };
};

export const generateIkigaiAnalysis = async (data: IkigaiState): Promise<IkigaiAnalysis> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("Clé API manquante. Veuillez configurer la variable d'environnement API_KEY dans Vercel.");
  }

  // Initialize only when needed
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    Agis comme un expert HumanLab : un stratège de vie radical, rationnel et opérationnel.
    
    TON TON (CRITIQUE) :
    - INTERDIT : La poésie mystique ("architecte du vivant", "âme des fleurs"), le jargon "New Age", l'emphase divine ("Vous êtes le sauveur de...").
    - INTERDIT : Les termes cliniques ou psychologiques (Dépression, Trauma, Syndrome de l'Imposteur).
    - OBLIGATOIRE : Sois CONCRET, BUSINESS et COMPORTEMENTAL.
    - Ton style doit être celui d'un partenaire senior : charismatique mais ancré dans le réel. Équilibre l'inspiration avec la rationalité.

    DONNÉES UTILISATEUR :
    1. AIME : ${data.love.join(", ")}
    2. DOUÉ : ${data.goodAt.join(", ")}
    3. MONDE : ${data.needs.join(", ")}
    4. PAYÉ : ${data.paid.join(", ")}
    
    CONTEXTE HUMAIN :
    - Valeurs : ${data.values.join(", ")}
    - Contraintes : ${data.constraints.join(", ")}
    - Énergie : ${data.energyLevel}/5

    INSTRUCTIONS SPÉCIFIQUES (Mise à jour v2.4 - Professionalisation) :

    1. ANALYSE STRATÉGIQUE :
       - Ne dis pas "Vous êtes le magicien de X". Dis "Votre positionnement est celui d'un expert en X".
       - Évite les superlatifs. Reste juste.

    2. RISQUES (Catégorie "Personnelles") - SÉCURITÉ :
       - INTERDICTION ABSOLUE de poser un diagnostic (pas de "burn-out", "anxiété", "imposteur").
       - Parle de COMPORTEMENT et de SITUATION.
       - Ex: Au lieu de "Syndrome de l'imposteur", dis "Tendance à sous-évaluer votre expertise technique".
       - Ex: Au lieu de "Risque dépressif", dis "Baisse d'énergie liée à l'isolement du solopreneur".

    3. PLAN D'ACTION (Timeline) - MESURES DE SUCCÈS :
       - Chaque objectif DOIT contenir un CHIFFRE (KPI).
       - Mauvais : "Valider l'idée".
       - Bon : "Obtenir 3 retours qualitatifs de prospects".
       - Bon : "Réaliser 5 entretiens de découverte".

    4. SCORES :
       - Note sévèrement (0 à 10). La moyenne sera calculée automatiquement, sois cohérent dans les sous-notes.

    FORMAT JSON STRICT :
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          passion: { type: Type.STRING, description: "Synthèse Passion" },
          mission: { type: Type.STRING, description: "Synthèse Mission" },
          profession: { type: Type.STRING, description: "Synthèse Profession" },
          vocation: { type: Type.STRING, description: "Synthèse Vocation" },
          ikigaiStatement: { type: Type.STRING, description: "Phrase centrale (Pragmatique et inspirante)" },
          ikigaiDescription: { type: Type.STRING, description: "Analyse dense. Pas de poésie floue." },
          
          keyInsight: { type: Type.STRING, description: "La phrase 'Wow' rationnelle" },
          pivotPoint: { type: Type.STRING, description: "La condition sine qua non de réussite" },
          signaturePhrase: { type: Type.STRING, description: "Une phrase identitaire courte" },

          contradictions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tensions internes" },
          
          viability: {
            type: Type.OBJECT,
            properties: {
              reasoning: { type: Type.STRING },
              breakdown: {
                type: Type.OBJECT,
                properties: {
                  motivation: { type: Type.NUMBER, description: "Note sur 10" },
                  skills: { type: Type.NUMBER, description: "Note sur 10" },
                  market: { type: Type.NUMBER, description: "Note sur 10" },
                  time: { type: Type.NUMBER, description: "Note sur 10" },
                  financial: { type: Type.NUMBER, description: "Note sur 10" }
                },
                required: ["motivation", "skills", "market", "time", "financial"]
              }
            },
            required: ["reasoning", "breakdown"]
          },

          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING, enum: ["Structurelles", "Personnelles", "Stratégiques"] },
                description: { type: Type.STRING, description: "Description comportementale, pas clinique." }
              },
              required: ["category", "description"]
            }
          },

          minimalistIkigai: { type: Type.STRING },
          realityTests: { type: Type.ARRAY, items: { type: Type.STRING } },
          
          timelineContext: { type: Type.STRING },
          timeline: {
            type: Type.OBJECT,
            properties: {
              week1: { 
                type: Type.OBJECT, 
                properties: { objective: { type: Type.STRING, description: "Objectif avec chiffre (KPI)" }, actions: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["objective", "actions"]
              },
              month1: { 
                type: Type.OBJECT, 
                properties: { objective: { type: Type.STRING, description: "Objectif avec chiffre (KPI)" }, actions: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["objective", "actions"]
              },
              month3: { 
                type: Type.OBJECT, 
                properties: { objective: { type: Type.STRING, description: "Objectif avec chiffre (KPI)" }, actions: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["objective", "actions"]
              }
            },
            required: ["week1", "month1", "month3"]
          }
        },
        required: [
            "passion", "mission", "profession", "vocation", 
            "ikigaiStatement", "ikigaiDescription", "keyInsight", "pivotPoint", "signaturePhrase",
            "contradictions", "viability", 
            "risks", "minimalistIkigai", "realityTests", "timeline", "timelineContext"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Pas de réponse de l'IA");
  }

  const parsedData = JSON.parse(text) as IkigaiAnalysis;

  // CORRECTION MATHEMATIQUE DU SCORE
  // On calcule la moyenne des sous-scores pour obtenir un score sur 100 cohérent
  const bd = parsedData.viability.breakdown;
  const totalPoints = bd.motivation + bd.skills + bd.market + bd.time + bd.financial;
  const calculatedScore = Math.round((totalPoints / 5) * 10); // Moyenne sur 10 multipliée par 10 pour avoir sur 100

  // On injecte le score calculé mathématiquement
  parsedData.viability.score = calculatedScore;

  return parsedData;
};