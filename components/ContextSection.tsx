import { FC, useState, KeyboardEvent } from 'react';

interface ContextSectionProps {
  values: string[];
  constraints: string[];
  energyLevel: number;
  onUpdateValues: (vals: string[]) => void;
  onUpdateConstraints: (cons: string[]) => void;
  onUpdateEnergy: (lvl: number) => void;
}

export const ContextSection: FC<ContextSectionProps> = ({
  values,
  constraints,
  energyLevel,
  onUpdateValues,
  onUpdateConstraints,
  onUpdateEnergy
}) => {
  const [valInput, setValInput] = useState('');
  const [consInput, setConsInput] = useState('');

  const addValue = () => {
    if (valInput.trim() && values.length < 3) {
      onUpdateValues([...values, valInput.trim()]);
      setValInput('');
    }
  };

  const addConstraint = () => {
    if (consInput.trim()) {
      onUpdateConstraints([...constraints, consInput.trim()]);
      setConsInput('');
    }
  };

  const handleKeyDownVal = (e: KeyboardEvent) => e.key === 'Enter' && addValue();
  const handleKeyDownCons = (e: KeyboardEvent) => e.key === 'Enter' && addConstraint();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 animate-fade-in mt-8">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h3 className="text-2xl font-bold text-iki-dark flex items-center gap-2">
          <span className="text-2xl">🧬</span> Paramètres Humains
        </h3>
        <p className="text-gray-500">Pour un résultat réaliste, nous devons comprendre qui vous êtes au-delà des listes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Valeurs */}
        <div className="space-y-4">
          <label className="block font-bold text-gray-700 uppercase tracking-wide text-sm">
            Vos 3 Valeurs Cardinales
            <span className="block text-xs font-normal text-gray-400 normal-case mt-1">Ce qui est non-négociable pour vous (ex: Liberté, Sécurité, Justice...)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={valInput}
              onChange={(e) => setValInput(e.target.value)}
              onKeyDown={handleKeyDownVal}
              disabled={values.length >= 3}
              placeholder={values.length >= 3 ? "3 valeurs maximum" : "Ajouter une valeur..."}
              className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all disabled:bg-gray-50"
            />
            <button onClick={addValue} disabled={values.length >= 3} className="bg-indigo-50 text-indigo-600 p-3 rounded-lg hover:bg-indigo-100 disabled:opacity-50">
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {values.map((v, i) => (
              <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                {v}
                <button onClick={() => onUpdateValues(values.filter((_, idx) => idx !== i))} className="hover:text-indigo-900">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Énergie */}
        <div className="space-y-4">
          <label className="block font-bold text-gray-700 uppercase tracking-wide text-sm">
            Niveau d'Énergie Actuel
            <span className="block text-xs font-normal text-gray-400 normal-case mt-1">Sur une échelle de 1 (Épuisé) à 5 (Explosif)</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={energyLevel}
            onChange={(e) => onUpdateEnergy(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>Épuisé 😫</span>
            <span>Moyen 😐</span>
            <span>Explosif 🚀</span>
          </div>
          <div className="text-center font-bold text-indigo-600 text-xl">{energyLevel}/5</div>
        </div>

        {/* Contraintes */}
        <div className="md:col-span-2 space-y-4">
          <label className="block font-bold text-gray-700 uppercase tracking-wide text-sm">
            Contraintes & Réalités
            <span className="block text-xs font-normal text-gray-400 normal-case mt-1">Temps, argent, responsabilités familiales, santé, géographie... Soyez honnête.</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={consInput}
              onChange={(e) => setConsInput(e.target.value)}
              onKeyDown={handleKeyDownCons}
              placeholder="Ex: Je ne peux pas déménager, J'ai 2h par jour max..."
              className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            />
            <button onClick={addConstraint} className="bg-red-50 text-red-600 p-3 rounded-lg hover:bg-red-100">
              +
            </button>
          </div>
          <ul className="space-y-2">
            {constraints.map((c, i) => (
              <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-md border-l-4 border-gray-300">
                <span className="text-gray-600 text-sm">{c}</span>
                <button onClick={() => onUpdateConstraints(constraints.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};