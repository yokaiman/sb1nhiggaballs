import React from 'react';
import { Check, Plus } from 'lucide-react';
import { useStore } from '../lib/store';
import { LLMConfig } from '../lib/types';

export default function LLMSelector() {
  const { llms, selectedLLMs, toggleLLM, addLocalLLM } = useStore(state => ({
    llms: state.settings.llmPaths,
    selectedLLMs: state.settings.defaultLLMs,
    toggleLLM: state.toggleLLM,
    addLocalLLM: state.addLocalLLM,
  }));

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newLLM: LLMConfig = {
        id: crypto.randomUUID(),
        name: file.name,
        path: file.path,
        type: 'local',
        enabled: true,
      };
      addLocalLLM(newLLM);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Available LLMs</h3>
        <label className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-3 py-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Local LLM</span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept=".bin,.gguf,.ggml"
          />
        </label>
      </div>

      <div className="space-y-2">
        {llms.map((llm) => (
          <button
            key={llm.id}
            onClick={() => toggleLLM(llm.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${
              selectedLLMs.includes(llm.id)
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{llm.name}</span>
            {selectedLLMs.includes(llm.id) && <Check className="w-4 h-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}