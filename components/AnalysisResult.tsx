import { FC } from 'react';
import { IkigaiAnalysis, IkigaiState, TimelinePhase } from '../types';

interface AnalysisResultProps {
  analysis: IkigaiAnalysis | null;
  data: IkigaiState;
  onReset: () => void;
}

export const AnalysisResult: FC<AnalysisResultProps> = ({ analysis, data, onReset }) => {
  if (!analysis) return null;

  const ViabilityBar = ({ label, score }: { label: string, score: number }) => (
    <div className="flex items-center gap-2 text-sm mb-2">
      <span className="w-24 font-medium text-gray-600">{label}</span>
      <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${score >= 7 ? 'bg-green-400' : score >= 4 ? 'bg-orange-400' : 'bg-red-400'}`} 
          style={{ width: `${score * 10}%` }}
        ></div>
      </div>
      <span className="w-8 text-right font-bold text-gray-700">{score}/10</span>
    </div>
  );

  const TimelineBlock = ({ phase, title, colorClass, icon }: { phase: TimelinePhase, title: string, colorClass: string, icon: string }) => (
    <div className="relative pl-12">
        <div className={`absolute left-0 top-0 w-8 h-8 ${colorClass.replace('text-', 'bg-').replace('700', '100')} ${colorClass} rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm`}>{icon}</div>
        <h4 className={`font-bold ${colorClass} text-lg flex items-center gap-2`}>
            {title}
        </h4>
        <div className="bg-gray-50 border-l-4 border-gray-300 p-2 my-2 text-sm font-semibold text-gray-700">
            🎯 Objectif : {phase.objective}
        </div>
        <ul className="space-y-2 mt-2">
            {phase.actions.map((item, i) => (
                <li key={i} className="text-gray-600 flex items-start gap-2 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span> {item}
                </li>
            ))}
        </ul>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* HEADER HERO */}
      <div className="text-center space-y-6 py-8">
        <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold tracking-wide mb-2 uppercase">
          Analyse v2.4 - HumanLab Pro
        </div>
        
        {/* Titre Ikigai */}
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight">
          "{analysis.ikigaiStatement}"
        </h2>

        {/* PHRASE SIGNATURE */}
        <div className="max-w-3xl mx-auto">
             <h3 className="text-xl md:text-2xl font-serif text-gray-800 font-bold leading-relaxed border-l-4 border-iki-good pl-6 italic">
              {analysis.signaturePhrase}
            </h3>
        </div>

        <p className="text-gray-500 font-medium mt-4">
          {analysis.minimalistIkigai}
        </p>
      </div>

      {/* SECTION INSIGHT & PIVOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl relative overflow-hidden transition-transform hover:-translate-y-1 duration-300">
             <div className="absolute -right-6 -top-6 text-9xl opacity-10 text-amber-500">💡</div>
             <h3 className="font-bold text-amber-800 uppercase tracking-widest text-sm mb-3">L'Insight Clé</h3>
             <p className="text-lg font-serif text-amber-900 font-medium leading-relaxed">
                 "{analysis.keyInsight}"
             </p>
        </div>
        <div className="bg-slate-800 text-white p-6 rounded-2xl relative overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300">
             <div className="absolute -right-6 -top-6 text-9xl opacity-10 text-white">⚖️</div>
             <h3 className="font-bold text-slate-300 uppercase tracking-widest text-sm mb-3">Le Point de Bascule</h3>
             <p className="text-lg font-medium leading-relaxed text-slate-100">
                 "{analysis.pivotPoint}"
             </p>
             <p className="text-xs text-slate-400 mt-2 italic">C'est la vérité difficile à accepter pour réussir.</p>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLONNE GAUCHE : VIABILITÉ & RISQUES */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Carte Viabilité */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              📊 Viabilité
            </h3>
            
            <div className="flex items-center justify-between mb-2">
               <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase font-bold">Score Global</span>
                  <span className={`text-4xl font-black ${analysis.viability.score >= 50 ? 'text-indigo-600' : 'text-orange-600'}`}>
                    {analysis.viability.score}<span className="text-lg text-gray-400 font-normal">/100</span>
                  </span>
               </div>
               <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${analysis.viability.score >= 70 ? 'bg-green-100 text-green-700' : analysis.viability.score >= 40 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                  {analysis.viability.score >= 70 ? 'Solide' : analysis.viability.score >= 40 ? 'Challenging' : 'Risqué'}
               </div>
            </div>
            {/* Explication du calcul pour rassurer l'utilisateur */}
            <p className="text-[10px] text-gray-400 text-center mb-6 uppercase tracking-wide">
                (Moyenne pondérée des 5 piliers)
            </p>

            <div className="space-y-1 mb-4">
              <ViabilityBar label="Motivation" score={analysis.viability.breakdown.motivation} />
              <ViabilityBar label="Compétences" score={analysis.viability.breakdown.skills} />
              <ViabilityBar label="Marché" score={analysis.viability.breakdown.market} />
              <ViabilityBar label="Temps" score={analysis.viability.breakdown.time} />
              <ViabilityBar label="Finances" score={analysis.viability.breakdown.financial} />
            </div>

            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg italic leading-relaxed">
              {analysis.viability.reasoning}
            </p>
          </div>

          {/* Carte Risques Catégorisés */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
              🧱 Obstacles & Réalité
            </h3>
            
            <div className="space-y-4">
               {['Structurelles', 'Personnelles', 'Stratégiques'].map((cat) => {
                 const risks = analysis.risks.filter(r => r.category === cat);
                 if (risks.length === 0) return null;
                 return (
                   <div key={cat}>
                     <h4 className="text-xs font-black uppercase text-red-400 mb-1 border-b border-red-200 pb-1 flex justify-between">
                        {cat}
                        {cat === 'Personnelles' && <span className="text-[10px] bg-red-200 text-red-800 px-1 rounded">Vigilance</span>}
                     </h4>
                     <ul className="space-y-1">
                       {risks.map((r, i) => (
                         <li key={i} className="text-sm text-red-900 leading-snug">• {r.description}</li>
                       ))}
                     </ul>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>

        {/* COLONNE CENTRALE : ANALYSE & ACTION */}
        <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border-l-8 border-indigo-500">
                <h3 className="text-xl font-bold text-gray-800 mb-4">L'Analyse Stratégique</h3>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line font-medium">
                    {analysis.ikigaiDescription}
                </p>
            </div>

            {/* Timeline 90 Jours avec Objectifs */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    🚀 Plan d'Action - Horizon 90 Jours
                </h3>
                
                {/* Context Sentence */}
                <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 italic">
                  💡 {analysis.timelineContext}
                </div>
                
                <div className="space-y-10 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    <TimelineBlock 
                        phase={analysis.timeline.week1} 
                        title="Semaine 1 : Lancement" 
                        colorClass="text-green-700" 
                        icon="1" 
                    />
                    <TimelineBlock 
                        phase={analysis.timeline.month1} 
                        title="Mois 1 : Validation" 
                        colorClass="text-blue-700" 
                        icon="M1" 
                    />
                    <TimelineBlock 
                        phase={analysis.timeline.month3} 
                        title="Mois 3 : Consolidation" 
                        colorClass="text-purple-700" 
                        icon="M3" 
                    />
                </div>
            </div>

            {/* Reality Tests */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
             <h3 className="font-bold text-indigo-900 mb-4">🧪 3 Tests de Réalité (Immédiats)</h3>
             <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.realityTests.map((test, i) => (
                    <li key={i} className="text-sm text-indigo-900 bg-white p-4 rounded-lg shadow-sm border border-indigo-100 font-medium flex items-center justify-center text-center">
                        {test}
                    </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-sm"
        >
          Nouvelle Analyse
        </button>
      </div>
    </div>
  );
};