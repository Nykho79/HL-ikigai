import { useState } from 'react';
import { IkigaiState, IkigaiAnalysis, Step } from './types';
import { generateIkigaiAnalysis } from './services/geminiService';
import { InputSection } from './components/InputSection';
import { VennDiagram } from './components/VennDiagram';
import { AnalysisResult } from './components/AnalysisResult';
import { Header } from './components/Header';
import { Loader } from './components/Loader';

const INITIAL_STATE: IkigaiState = {
  love: [],
  goodAt: [],
  paid: [],
  needs: []
};

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [data, setData] = useState<IkigaiState>(INITIAL_STATE);
  const [analysis, setAnalysis] = useState<IkigaiAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = (section: keyof IkigaiState, item: string) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const handleRemoveItem = (section: keyof IkigaiState, index: number) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleAnalyze = async () => {
    if (data.love.length === 0 || data.goodAt.length === 0 || data.paid.length === 0 || data.needs.length === 0) {
      setError("Veuillez remplir au moins un élément dans chaque section.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateIkigaiAnalysis(data);
      setAnalysis(result);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'analyse. Veuillez vérifier votre clé API ou réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    switch (step) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto p-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-iki-dark">Découvrez votre Ikigai</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              L'Ikigai est un concept japonais qui signifie "la raison d'être". 
              C'est le point de rencontre entre ce que vous aimez, ce pour quoi vous êtes doué, 
              ce dont le monde a besoin et ce pour quoi vous pouvez être payé.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-full">
              <VennDiagram data={data} simple />
            </div>
            <button 
              onClick={() => setStep('input')}
              className="px-8 py-3 bg-iki-dark text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Commencer l'expérience
            </button>
          </div>
        );

      case 'input':
        return (
          <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputSection 
                title="Ce que vous AIMEZ" 
                description="Vos passions, ce qui vous enthousiasme."
                color="bg-iki-love" 
                items={data.love} 
                onAdd={(item) => handleAddItem('love', item)}
                onRemove={(index) => handleRemoveItem('love', index)}
              />
              <InputSection 
                title="Ce pour quoi vous êtes DOUÉ" 
                description="Vos talents, compétences et savoir-faire."
                color="bg-iki-good" 
                items={data.goodAt} 
                onAdd={(item) => handleAddItem('goodAt', item)}
                onRemove={(index) => handleRemoveItem('goodAt', index)}
              />
              <InputSection 
                title="Ce pour quoi vous pouvez être PAYÉ" 
                description="Services, emplois, sources de revenus."
                color="bg-iki-paid" 
                items={data.paid} 
                onAdd={(item) => handleAddItem('paid', item)}
                onRemove={(index) => handleRemoveItem('paid', index)}
              />
              <InputSection 
                title="Ce dont le monde a BESOIN" 
                description="Causes, problèmes à résoudre, contribution."
                color="bg-iki-need" 
                items={data.needs} 
                onAdd={(item) => handleAddItem('needs', item)}
                onRemove={(index) => handleRemoveItem('needs', index)}
              />
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
                {error}
              </div>
            )}

            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md p-4 border-t border-gray-100 flex justify-between items-center z-50">
              <button 
                 onClick={() => setStep('intro')}
                 className="px-6 py-2 text-gray-500 hover:text-gray-800 font-medium"
              >
                Retour
              </button>
              <button 
                onClick={handleAnalyze}
                disabled={isLoading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Analyser avec l'IA</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </button>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="max-w-5xl mx-auto p-4 animate-fade-in pb-24">
            <AnalysisResult analysis={analysis} data={data} onReset={() => setStep('input')} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col font-sans text-iki-dark">
      <Header />
      <main className="flex-grow flex flex-col pt-6">
        {renderContent()}
      </main>
      <footer className="text-center p-6 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} HumanLab - Ikigai. Propulsé par Google Gemini.</p>
      </footer>
    </div>
  );
}