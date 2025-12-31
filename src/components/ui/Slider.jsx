export default function Slider({ value, onChange, label, valueLabel }) {
  const sliderId = `slider-${label?.replace(/\s+/g, '-').toLowerCase() || 'range'}`;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <label id={`${sliderId}-label`} htmlFor={sliderId} className="text-sm text-[#2C1810]">{label}</label>
        <span className="text-sm font-semibold text-[#8B4513]">{valueLabel}</span>
      </div>
      <input
        id={sliderId}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        aria-labelledby={`${sliderId}-label`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={valueLabel}
        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#D4A84B]"
      />
    </div>
  );
}
