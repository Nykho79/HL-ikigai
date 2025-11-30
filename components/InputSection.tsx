import { useState, KeyboardEvent, FC } from 'react';

interface InputSectionProps {
  title: string;
  description: string;
  color: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}

export const InputSection: FC<InputSectionProps> = ({ 
  title, 
  description, 
  color, 
  items, 
  onAdd, 
  onRemove 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className={`${color} p-4`}>
        <h3 className="font-bold text-lg text-gray-800 uppercase tracking-wide">{title}</h3>
        <p className="text-sm text-gray-700 opacity-80">{description}</p>
      </div>
      
      <div className="p-4 flex-grow flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ajouter un élément..."
            className="flex-grow p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          />
          <button 
            onClick={handleAddClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <ul className="space-y-2 overflow-y-auto max-h-48 custom-scrollbar">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md group">
              <span className="text-gray-700">{item}</span>
              <button 
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-center text-gray-400 italic text-sm mt-4">
              La liste est vide.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};