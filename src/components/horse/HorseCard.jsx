import { HorseIcon } from '../icons';

export default function HorseCard({ horse, isActive, onClick }) {
  const coatLevel = horse.coatGrowth < 33 ? "Light" : horse.coatGrowth < 66 ? "Medium" : "Heavy";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl mb-3 transition-all border-2 ${
        isActive
          ? 'border-[#8B4513] bg-white shadow-lg'
          : 'border-transparent bg-[#FDF8F0] hover:border-[#D4A84B]'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-white">
          <HorseIcon className="w-7 h-7" />
        </div>
        <div>
          <div className="font-semibold text-[#2C1810]">{horse.name}</div>
          <div className="text-sm text-[#6B5344]">{horse.breed}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-dashed border-[rgba(139,69,19,0.15)]">
        <div className="text-xs">
          <span className="text-[#6B5344]">Age: </span>
          <span className="font-medium">{horse.age} yrs</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Coat: </span>
          <span className="font-medium">{coatLevel}</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Body: </span>
          <span className="font-medium">{horse.isThinKeeper ? "Thin" : "Normal"}</span>
        </div>
        <div className="text-xs">
          <span className="text-[#6B5344]">Clipped: </span>
          <span className="font-medium">{horse.isClipped ? "Yes" : "No"}</span>
        </div>
      </div>
    </button>
  );
}
