import { GoogleGenAI, Type } from "@google/genai";
import { IkigaiState, IkigaiAnalysis } from "../types";

// Normally we would error here, but for the sake of the demo, we assume the environment is set up correctly
// or the build process injects it.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIkigaiAnalysis = async (data: IkigaiState): Promise<IkigaiAnalysis> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    En tant qu'expert en développement personnel et coach de carrière, analyse les données suivantes d'un utilisateur cherchant son Ikigai.
    
    Données de l'utilisateur:
    - CE QU'IL AIME: ${data.love.join(", ")}
    - CE POUR QUOI IL EST DOUÉ: ${data.goodAt.join(", ")}
    - CE DONT LE MONDE A BESOIN: ${data.needs.join(", ")}
    - CE POUR QUOI IL PEUT ÊTRE PAYÉ: ${data.paid.join(", ")}

    Ta mission est de synthétiser ces informations pour trouver les intersections :
    1. PASSION (Aime + Doué)
    2. MISSION (Aime + Besoin)
    3. VOCATION (Besoin + Payé)
    4. PROFESSION (Doué + Payé)
    
    Et enfin, le centre : L'IKIGAI.
    
    Sois inspirant, précis et bienveillant. Réponds en JSON uniquement selon le schéma défini.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          passion: { type: Type.STRING, description: "Synthèse de la passion (croisement Aime & Doué)" },
          mission: { type: Type.STRING, description: "Synthèse de la mission (croisement Aime & Besoin)" },
          profession: { type: Type.STRING, description: "Synthèse de la profession (croisement Doué & Payé)" },
          vocation: { type: Type.STRING, description: "Synthèse de la vocation (croisement Besoin & Payé)" },
          ikigaiStatement: { type: Type.STRING, description: "Une phrase courte et percutante résumant l'Ikigai" },
          ikigaiDescription: { type: Type.STRING, description: "Un paragraphe expliquant en détail cet Ikigai et pourquoi il correspond" },
          actionableSteps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3 à 5 petites étapes concrètes pour avancer vers cet Ikigai"
          }
        },
        required: ["passion", "mission", "profession", "vocation", "ikigaiStatement", "ikigaiDescription", "actionableSteps"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Pas de réponse de l'IA");
  }

  return JSON.parse(text) as IkigaiAnalysis;
};