import { Check } from 'lucide-react';
import { BlanketIcon } from '../icons';

export default function RecommendationCard({ recommendation, horse, currentBlanketId, setCurrentBlanketId }) {
  const weightLabels = {
    none: "No Blanket Needed",
    sheet: "Rain Sheet",
    light: "Lightweight",
    medium: "Medium Weight",
    heavy: "Heavyweight",
  };

  const weightColors = {
    none: "bg-[#9CAF88]",
    sheet: "bg-[#A0522D]",
    light: "bg-[#D4A84B]",
    medium: "bg-[#E89B3C]",
    heavy: "bg-[#5C4033]",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[rgba(139,69,19,0.1)] overflow-hidden">
      {/* Hero recommendation */}
      <div className={`${weightColors[recommendation.weightNeeded]} px-8 py-10 text-center text-white`}>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <BlanketIcon className="w-12 h-12" />
          </div>
        </div>
        <h2 className="font-display text-3xl font-bold mb-1">
          {weightLabels[recommendation.weightNeeded]}
        </h2>
        {recommendation.needsNeckRug && (
          <p className="text-white/90 font-medium">+ Neck Rug</p>
        )}
        <p className="text-white/75 text-sm mt-2">
          for {horse.name} • {recommendation.gramsNeeded}g fill
          {recommendation.needsWaterproof && " • Waterproof"}
        </p>
      </div>

      {/* Details section */}
      <div className="p-6">
        <p className="text-[#6B5344] leading-relaxed mb-6">{recommendation.reasoning}</p>

        {recommendation.recommendedBlanket && (
          <button
            onClick={() => setCurrentBlanketId(recommendation.recommendedBlanket.id)}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              currentBlanketId === recommendation.recommendedBlanket.id
                ? "bg-[#9CAF88]/15 text-[#6B8E5C] border border-[#9CAF88]"
                : "bg-[#8B4513] text-white hover:bg-[#5C4033]"
            }`}
          >
            {currentBlanketId === recommendation.recommendedBlanket.id
              ? <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Wearing {recommendation.recommendedBlanket.name}</span>
              : `Use ${recommendation.recommendedBlanket.name}`}
          </button>
        )}
      </div>
    </div>
  );
}
