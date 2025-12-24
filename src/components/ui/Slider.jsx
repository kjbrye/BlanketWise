export default function Slider({ value, onChange, label, valueLabel }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[#2C1810]">{label}</span>
        <span className="text-sm font-semibold text-[#8B4513]">{valueLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#D4A84B]"
      />
    </div>
  );
}
