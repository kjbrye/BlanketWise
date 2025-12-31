import { memo } from 'react';
import { Check } from 'lucide-react';
import { BlanketIcon } from '../icons';

export default memo(function RecommendationCard({ recommendation, horse, settings, currentBlanketId, setCurrentBlanketId }) {
  const showCombinedWeight = settings?.liner?.showCombinedWeight !== false;
  const showLiner = recommendation.recommendedLiner && showCombinedWeight;
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
      <div className={`${weightColors[recommendation.weightNeeded]} px-4 sm:px-8 py-8 sm:py-10 text-center text-white`}>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <BlanketIcon className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          {weightLabels[recommendation.weightNeeded]}
        </h2>
        {settings?.showConfidence && (
          <p className="text-white/80 text-sm font-medium">{recommendation.confidence}% confidence</p>
        )}
        {showLiner && (
          <p className="text-white/90 font-medium">+ {recommendation.recommendedLiner.name}</p>
        )}
        {recommendation.needsNeckRug && (
          <p className="text-white/90 font-medium">+ Neck Rug</p>
        )}
        <p className="text-white/75 text-sm mt-2">
          for {horse.name} • {showLiner
            ? `${recommendation.gramsNeeded + recommendation.recommendedLiner.grams}g combined`
            : `${recommendation.gramsNeeded}g fill`}
          {recommendation.needsWaterproof && " • Waterproof"}
        </p>
      </div>

      {/* Details section */}
      <div className="p-4 sm:p-6">
        <p className="text-[#6B5344] leading-relaxed mb-6 text-sm sm:text-base">{recommendation.reasoning}</p>

        {recommendation.recommendedBlanket && (
          <button
            onClick={() => setCurrentBlanketId(recommendation.recommendedBlanket.id)}
            className={`w-full py-3 min-h-[44px] rounded-xl font-medium transition-colors text-sm sm:text-base ${
              currentBlanketId === recommendation.recommendedBlanket.id
                ? "bg-[#9CAF88]/15 text-[#6B8E5C] border border-[#9CAF88]"
                : "bg-[#8B4513] text-white hover:bg-[#5C4033]"
            }`}
          >
            {currentBlanketId === recommendation.recommendedBlanket.id
              ? <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Wearing {recommendation.recommendedBlanket.name}
                  {showLiner && ` + ${recommendation.recommendedLiner.name}`}
                </span>
              : `Use ${weightLabels[recommendation.weightNeeded]}${showLiner ? ` + ${recommendation.recommendedLiner.name}` : ''}`}
          </button>
        )}
      </div>
    </div>
  );
});
