import React from 'react';
import { IkigaiAnalysis, IkigaiState } from '../types';
import { VennDiagram } from './VennDiagram';

interface AnalysisResultProps {
  analysis: IkigaiAnalysis | null;
  data: IkigaiState;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, data, onReset }) => {
  if (!analysis) return null;

  const IntersectionCard = ({ title, content, color }: { title: string, content: string, color: string }) => (
    <div className={`p-5 rounded-xl ${color} bg-opacity-30 border border-gray-100 shadow-sm`}>
      <h4 className="font-bold text-gray-700 mb-2 uppercase text-sm tracking-wider">{title}</h4>
      <p className="text-gray-800 font-medium">{content}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header Result */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Votre Ikigai
        </h2>
        <p className="text-2xl font-medium text-gray-800 italic">"{analysis.ikigaiStatement}"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Visual */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 order-2 lg:order-1">
          <VennDiagram data={data} />
        </div>

        {/* Detailed Text */}
        <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-500">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                    Analyse
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {analysis.ikigaiDescription}
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Prochaines Étapes
                </h3>
                <ul className="space-y-3">
                    {analysis.actionableSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                            <span className="bg-indigo-100 text-indigo-700 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">{idx + 1}</span>
                            <span className="text-gray-700">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Grid of Intersections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <IntersectionCard title="Passion (Aime + Doué)" content={analysis.passion} color="bg-iki-love" />
        <IntersectionCard title="Mission (Aime + Besoin)" content={analysis.mission} color="bg-iki-need" />
        <IntersectionCard title="Profession (Doué + Payé)" content={analysis.profession} color="bg-iki-good" />
        <IntersectionCard title="Vocation (Besoin + Payé)" content={analysis.vocation} color="bg-iki-paid" />
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-sm"
        >
          Recommencer une analyse
        </button>
      </div>
    </div>
  );
};