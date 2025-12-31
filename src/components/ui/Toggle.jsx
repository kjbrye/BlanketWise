export default function Toggle({ active, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors ${active ? 'bg-[#9CAF88]' : 'bg-gray-300'}`}
    >
      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}
