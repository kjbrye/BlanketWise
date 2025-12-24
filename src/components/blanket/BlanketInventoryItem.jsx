export default function BlanketInventoryItem({ blanket, isInUse, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 p-3 bg-[#FDF8F0] rounded-xl hover:bg-[#FDF8F0]/80 transition-colors text-left"
    >
      <div className="w-3 h-9 rounded" style={{ backgroundColor: blanket.color }} />
      <div className="flex-1">
        <div className="font-medium text-sm">{blanket.name}</div>
        <div className="text-xs text-[#6B5344]">
          {blanket.grams}g fill • {blanket.waterproof ? "Waterproof" : "Breathable"}
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded font-medium ${
        isInUse
          ? 'bg-[#E89B3C]/20 text-[#E89B3C]'
          : 'bg-[#9CAF88]/20 text-[#9CAF88]'
      }`}>
        {isInUse ? "In Use" : "Available"}
      </span>
    </button>
  );
}
