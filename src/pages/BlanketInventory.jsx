import React, { useState } from 'react';
import { Scale, Droplet, Wind, Thermometer, Check, Package, CloudRain, Leaf, Snowflake } from 'lucide-react';

// Custom blanket icon (not available in lucide-react)
function BlanketIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 283.5 283.5" fill="currentColor" preserveAspectRatio="xMidYMid meet">
      <path d="M 262.8125 196.472656 C 258.90625 202.710938 216.382812 195.386719 182.480469 202.277344 C 148.578125 209.164062 33.691406 214.589844 27.234375 202.277344 C 21.269531 190.9375 28.265625 159.152344 24.25 146.566406 C 23.925781 145.484375 23.4375 144.507812 22.949219 143.746094 C 16.277344 134.039062 72.582031 69.054688 72.582031 69.054688 C 72.582031 69.054688 76.648438 69.488281 82.507812 72.199219 C 87.011719 74.316406 92.542969 77.789062 98.078125 83.484375 C 110.824219 96.664062 141.253906 98.617188 172.335938 89.722656 C 203.417969 80.824219 237.753906 86.898438 252.234375 105.941406 C 266.71875 124.980469 266.71875 190.179688 262.8125 196.472656 Z" />
    </svg>
  );
}

// Icon mapping
const iconMap = {
  blanket: BlanketIcon,
  scale: Scale,
  droplet: Droplet,
  wind: Wind,
  thermometer: Thermometer,
  check: Check,
  box: Package,
  rain: CloudRain,
  leaf: Leaf,
  snowflake: Snowflake,
};

function Icon({ name, className = "w-5 h-5" }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

// Weight categories for blankets
const weightCategories = [
  { label: 'Sheet (0g)', min: 0, max: 0, color: '#A0522D' },
  { label: 'Lightweight (50-150g)', min: 50, max: 150, color: '#D4A84B' },
  { label: 'Medium (200-300g)', min: 200, max: 300, color: '#E89B3C' },
  { label: 'Heavyweight (350g+)', min: 350, max: 500, color: '#5C4033' },
];

function getWeightCategory(grams) {
  if (grams === 0) return weightCategories[0];
  if (grams <= 150) return weightCategories[1];
  if (grams <= 300) return weightCategories[2];
  return weightCategories[3];
}

// Blanket Card Component
function BlanketCard({ blanket, pairedLiner, isInUse, onUpdate, onDelete, onSetInUse }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(blanket.name);
  const [editGrams, setEditGrams] = useState(blanket.grams);
  const [editWaterproof, setEditWaterproof] = useState(blanket.waterproof);
  const [editHasNeckRug, setEditHasNeckRug] = useState(blanket.hasNeckRug || false);
  const [editColor, setEditColor] = useState(blanket.color);

  const category = getWeightCategory(blanket.grams);

  const handleSave = () => {
    onUpdate({
      name: editName,
      grams: parseInt(editGrams),
      waterproof: editWaterproof,
      hasNeckRug: editHasNeckRug,
      color: editColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(blanket.name);
    setEditGrams(blanket.grams);
    setEditWaterproof(blanket.waterproof);
    setEditHasNeckRug(blanket.hasNeckRug || false);
    setEditColor(blanket.color);
    setIsEditing(false);
  };

  const colorOptions = [
    { value: '#B8D4E3', label: 'Light Blue' },
    { value: '#D4A84B', label: 'Gold' },
    { value: '#9CAF88', label: 'Sage Green' },
    { value: '#A0522D', label: 'Brown' },
    { value: '#8B4513', label: 'Saddle Brown' },
    { value: '#5C4033', label: 'Dark Brown' },
    { value: '#2C3E50', label: 'Navy' },
    { value: '#8E44AD', label: 'Purple' },
    { value: '#C0392B', label: 'Red' },
    { value: '#27AE60', label: 'Green' },
    { value: '#E74C3C', label: 'Coral' },
    { value: '#3498DB', label: 'Blue' },
  ];

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
      isInUse ? 'border-[#E89B3C]' : 'border-[rgba(139,69,19,0.15)]'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: blanket.color }}
          >
            <svg className="w-10 h-10" viewBox="0 0 283.5 283.5" fill="none" preserveAspectRatio="xMidYMid meet">
              <path fill="white" fillOpacity="0.9" d="M 262.8125 196.472656 C 258.90625 202.710938 216.382812 195.386719 182.480469 202.277344 C 148.578125 209.164062 33.691406 214.589844 27.234375 202.277344 C 21.269531 190.9375 28.265625 159.152344 24.25 146.566406 C 23.925781 145.484375 23.4375 144.507812 22.949219 143.746094 C 16.277344 134.039062 72.582031 69.054688 72.582031 69.054688 C 72.582031 69.054688 76.648438 69.488281 82.507812 72.199219 C 87.011719 74.316406 92.542969 77.789062 98.078125 83.484375 C 110.824219 96.664062 141.253906 98.617188 172.335938 89.722656 C 203.417969 80.824219 237.753906 86.898438 252.234375 105.941406 C 266.71875 124.980469 266.71875 190.179688 262.8125 196.472656 Z" />
            </svg>
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-xl font-display font-bold text-[#5C4033] border-b-2 border-[#D4A84B] bg-transparent focus:outline-none"
              />
            ) : (
              <h3 className="font-display text-xl font-bold text-[#5C4033]">{blanket.name}</h3>
            )}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.label}
              </span>
              {pairedLiner && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#9CAF88]/20 text-[#9CAF88]">
                  + {pairedLiner.name}
                </span>
              )}
              {isInUse && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E89B3C]/20 text-[#E89B3C]">
                  Currently In Use
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#9CAF88] text-white rounded-lg hover:bg-[#7d9470] transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 bg-[#FDF8F0] text-[#8B4513] rounded-lg hover:bg-[#D4A84B]/20 transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Details */}
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Fill Weight (grams)</label>
            <input
              type="number"
              value={editGrams}
              onChange={(e) => setEditGrams(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
              min="0"
              max="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setEditColor(option.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    editColor === option.value ? 'border-[#5C4033] scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: option.value }}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editWaterproof}
                onChange={(e) => setEditWaterproof(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#9CAF88] focus:ring-[#9CAF88]"
              />
              <span className="text-sm font-medium text-[#2C1810]">Waterproof</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editHasNeckRug}
                onChange={(e) => setEditHasNeckRug(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#9CAF88] focus:ring-[#9CAF88]"
              />
              <span className="text-sm font-medium text-[#2C1810]">Has Neck Rug</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className={`rounded-xl p-3 text-center ${pairedLiner ? 'bg-[#9CAF88]/10' : 'bg-[#FDF8F0]'}`}>
            <div className="flex justify-center text-[#8B4513] mb-1">
              <Icon name="scale" className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#6B5344]">{pairedLiner ? 'Combined' : 'Fill Weight'}</div>
            {pairedLiner ? (
              <div>
                <div className="font-semibold text-[#5C4033]">{blanket.grams + pairedLiner.grams}g</div>
                <div className="text-xs text-[#6B5344]">{blanket.grams}g + {pairedLiner.grams}g</div>
              </div>
            ) : (
              <div className="font-semibold text-[#5C4033]">{blanket.grams}g</div>
            )}
          </div>
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="flex justify-center text-[#8B4513] mb-1">
              <Icon name={blanket.waterproof ? 'droplet' : 'wind'} className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#6B5344]">Type</div>
            <div className="font-semibold text-[#5C4033]">{blanket.waterproof ? 'Waterproof' : 'Breathable'}</div>
          </div>
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="flex justify-center text-[#8B4513] mb-1">
              <Icon name="check" className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#6B5344]">Neck Rug</div>
            <div className="font-semibold text-[#5C4033]">{blanket.hasNeckRug ? 'Yes' : 'No'}</div>
          </div>
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="flex justify-center text-[#8B4513] mb-1">
              <Icon name="thermometer" className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#6B5344]">Best For</div>
            <div className="font-semibold text-[#5C4033]">
              {blanket.grams === 0 ? 'Above 40°F' :
               blanket.grams <= 150 ? '30-40°F' :
               blanket.grams <= 300 ? '15-30°F' : 'Below 15°F'}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {!isEditing && (
        <button
          onClick={onSetInUse}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            isInUse
              ? 'bg-[#E89B3C]/20 text-[#E89B3C] border-2 border-[#E89B3C]'
              : 'bg-[#8B4513] text-white hover:bg-[#5C4033]'
          }`}
        >
          {isInUse ? 'Currently In Use' : 'Mark as In Use'}
        </button>
      )}
    </div>
  );
}

// Add Blanket Form
function AddBlanketForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [grams, setGrams] = useState('200');
  const [waterproof, setWaterproof] = useState(true);
  const [hasNeckRug, setHasNeckRug] = useState(false);
  const [color, setColor] = useState('#B8D4E3');

  const colorOptions = [
    { value: '#B8D4E3', label: 'Light Blue' },
    { value: '#D4A84B', label: 'Gold' },
    { value: '#9CAF88', label: 'Sage Green' },
    { value: '#A0522D', label: 'Brown' },
    { value: '#8B4513', label: 'Saddle Brown' },
    { value: '#5C4033', label: 'Dark Brown' },
    { value: '#2C3E50', label: 'Navy' },
    { value: '#8E44AD', label: 'Purple' },
    { value: '#C0392B', label: 'Red' },
    { value: '#27AE60', label: 'Green' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: Date.now(),
      name: name.trim(),
      grams: parseInt(grams),
      waterproof,
      hasNeckRug,
      color,
      status: 'available',
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-[#D4A84B]">
      <h2 className="font-display text-xl font-semibold text-[#5C4033] mb-4">Add New Blanket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2C1810] mb-1">Blanket Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
            placeholder="e.g., Dover Heavyweight"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Fill Weight (grams)</label>
            <select
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
            >
              <option value="0">Sheet (0g)</option>
              <option value="100">Lightweight (100g)</option>
              <option value="150">Lightweight (150g)</option>
              <option value="200">Medium (200g)</option>
              <option value="250">Medium (250g)</option>
              <option value="300">Medium (300g)</option>
              <option value="360">Heavyweight (360g)</option>
              <option value="400">Heavyweight (400g)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Type</label>
            <select
              value={waterproof ? 'waterproof' : 'breathable'}
              onChange={(e) => setWaterproof(e.target.value === 'waterproof')}
              className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
            >
              <option value="waterproof">Waterproof Turnout</option>
              <option value="breathable">Breathable/Stable</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C1810] mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setColor(option.value)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  color === option.value ? 'border-[#5C4033] scale-110' : 'border-gray-200'
                }`}
                style={{ backgroundColor: option.value }}
                title={option.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasNeckRug}
              onChange={(e) => setHasNeckRug(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#9CAF88] focus:ring-[#9CAF88]"
            />
            <span className="text-sm font-medium text-[#2C1810]">Has Neck Rug</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#5C4033] transition-colors"
          >
            Add Blanket
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Liner Card Component
function LinerCard({ liner, blankets, onUpdate, onDelete, onPair }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(liner.name);
  const [editGrams, setEditGrams] = useState(liner.grams);
  const [editColor, setEditColor] = useState(liner.color);

  const pairedBlanket = blankets.find(b => b.id === liner.pairedWithBlanketId);
  const availableBlankets = blankets.filter(b =>
    !blankets.some(bl => bl.id === b.id && liner.pairedWithBlanketId !== b.id)
  );

  const handleSave = () => {
    onUpdate({
      name: editName,
      grams: parseInt(editGrams),
      color: editColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(liner.name);
    setEditGrams(liner.grams);
    setEditColor(liner.color);
    setIsEditing(false);
  };

  const colorOptions = [
    { value: '#E8D4C4', label: 'Cream' },
    { value: '#C9B8A8', label: 'Taupe' },
    { value: '#D4A84B', label: 'Gold' },
    { value: '#8B4513', label: 'Saddle Brown' },
    { value: '#2C3E50', label: 'Navy' },
    { value: '#27AE60', label: 'Green' },
  ];

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-lg border-2 transition-all ${
      pairedBlanket ? 'border-[#9CAF88]' : 'border-[rgba(139,69,19,0.15)]'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: liner.color }}
          >
            <Leaf className="w-6 h-6 text-white/90" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-lg font-display font-bold text-[#5C4033] border-b-2 border-[#D4A84B] bg-transparent focus:outline-none"
              />
            ) : (
              <h3 className="font-display text-lg font-bold text-[#5C4033]">{liner.name}</h3>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-[#6B5344]">{liner.grams}g</span>
              {pairedBlanket && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#9CAF88]/20 text-[#9CAF88]">
                  Paired
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="px-3 py-1.5 bg-[#9CAF88] text-white rounded-lg text-sm hover:bg-[#7d9470]">Save</button>
              <button onClick={handleCancel} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="px-2 py-1.5 bg-[#FDF8F0] text-[#8B4513] rounded-lg text-sm hover:bg-[#D4A84B]/20">Edit</button>
              <button onClick={onDelete} className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">Delete</button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-[#2C1810] mb-1">Weight (grams)</label>
            <select
              value={editGrams}
              onChange={(e) => setEditGrams(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none text-sm"
            >
              <option value="100">100g (Light)</option>
              <option value="150">150g (Light)</option>
              <option value="200">200g (Medium)</option>
              <option value="250">250g (Medium)</option>
              <option value="300">300g (Heavy)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2C1810] mb-1">Color</label>
            <div className="flex flex-wrap gap-1">
              {colorOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setEditColor(option.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${editColor === option.value ? 'border-[#5C4033] scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: option.value }}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          {pairedBlanket ? (
            <div className="bg-[#9CAF88]/10 rounded-xl p-3">
              <div className="text-xs text-[#6B5344] mb-1">Paired with</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md" style={{ backgroundColor: pairedBlanket.color }} />
                <span className="font-medium text-[#5C4033]">{pairedBlanket.name}</span>
                <span className="text-sm text-[#6B5344]">({pairedBlanket.grams}g + {liner.grams}g = {pairedBlanket.grams + liner.grams}g)</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#FDF8F0] rounded-xl p-3 text-center text-[#6B5344] text-sm">
              Not paired with any blanket
            </div>
          )}
        </div>
      )}

      {!isEditing && (
        <div className="flex gap-2">
          <select
            value={liner.pairedWithBlanketId || ''}
            onChange={(e) => onPair(e.target.value ? parseInt(e.target.value) : null)}
            className="flex-1 px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none text-sm"
          >
            <option value="">No blanket (unpaired)</option>
            {blankets.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.grams}g)</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// Add Liner Form
function AddLinerForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [grams, setGrams] = useState('100');
  const [color, setColor] = useState('#E8D4C4');

  const colorOptions = [
    { value: '#E8D4C4', label: 'Cream' },
    { value: '#C9B8A8', label: 'Taupe' },
    { value: '#D4A84B', label: 'Gold' },
    { value: '#8B4513', label: 'Saddle Brown' },
    { value: '#2C3E50', label: 'Navy' },
    { value: '#27AE60', label: 'Green' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: Date.now(),
      name: name.trim(),
      grams: parseInt(grams),
      color,
      pairedWithBlanketId: null,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-dashed border-[#9CAF88]">
      <h3 className="font-display text-lg font-semibold text-[#5C4033] mb-3">Add New Liner</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-[#2C1810] mb-1">Liner Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#9CAF88] focus:outline-none"
            placeholder="e.g., Fleece Liner"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Weight</label>
            <select
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#9CAF88] focus:outline-none"
            >
              <option value="100">100g (Light)</option>
              <option value="150">150g (Light)</option>
              <option value="200">200g (Medium)</option>
              <option value="250">250g (Medium)</option>
              <option value="300">300g (Heavy)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${color === option.value ? 'border-[#5C4033] scale-110' : 'border-gray-200'}`}
                  style={{ backgroundColor: option.value }}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" className="flex-1 py-2 bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470]">Add Liner</button>
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// Main Blanket Inventory Page
export default function BlanketInventory({ blankets, setBlankets, liners, setLiners, currentBlanketId, setCurrentBlanketId }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddLinerForm, setShowAddLinerForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleAddBlanket = (newBlanket) => {
    setBlankets([...blankets, newBlanket]);
    setShowAddForm(false);
  };

  const handleUpdateBlanket = (blanketId, updates) => {
    setBlankets(blankets.map(b => b.id === blanketId ? { ...b, ...updates } : b));
  };

  const handleDeleteBlanket = (blanketId) => {
    if (blankets.length <= 1) {
      alert("You must have at least one blanket.");
      return;
    }
    if (confirm(`Are you sure you want to delete this blanket?`)) {
      setBlankets(blankets.filter(b => b.id !== blanketId));
      // Unpair any liners that were paired with this blanket
      if (liners && setLiners) {
        setLiners(liners.map(l => l.pairedWithBlanketId === blanketId ? { ...l, pairedWithBlanketId: null } : l));
      }
      if (currentBlanketId === blanketId) {
        setCurrentBlanketId(blankets.find(b => b.id !== blanketId)?.id);
      }
    }
  }

  // Liner handlers
  const handleAddLiner = (newLiner) => {
    setLiners([...liners, newLiner]);
    setShowAddLinerForm(false);
  };

  const handleUpdateLiner = (linerId, updates) => {
    setLiners(liners.map(l => l.id === linerId ? { ...l, ...updates } : l));
  };

  const handleDeleteLiner = (linerId) => {
    if (confirm(`Are you sure you want to delete this liner?`)) {
      setLiners(liners.filter(l => l.id !== linerId));
    }
  };

  const handlePairLiner = (linerId, blanketId) => {
    // First, unpair any other liner that was paired with this blanket
    const updatedLiners = liners.map(l => {
      if (l.id === linerId) {
        return { ...l, pairedWithBlanketId: blanketId };
      }
      // Unpair other liners from the same blanket
      if (blanketId && l.pairedWithBlanketId === blanketId) {
        return { ...l, pairedWithBlanketId: null };
      }
      return l;
    });
    setLiners(updatedLiners);
  };

  const filteredBlankets = filterCategory === 'all'
    ? blankets
    : blankets.filter(b => {
        const cat = getWeightCategory(b.grams);
        return cat.label.toLowerCase().includes(filterCategory.toLowerCase());
      });

  // Summary stats
  const totalBlankets = blankets.length;
  const waterproofCount = blankets.filter(b => b.waterproof).length;
  const neckRugCount = blankets.filter(b => b.hasNeckRug).length;
  const inUseCount = currentBlanketId ? 1 : 0;
  const totalLiners = liners?.length || 0;
  const pairedLiners = liners?.filter(l => l.pairedWithBlanketId !== null).length || 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#5C4033]">Blanket Inventory</h1>
          <p className="text-[#6B5344] mt-1">Manage your horse blankets and track their usage</p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470] transition-colors"
          >
            <span className="text-xl">+</span> Add Blanket
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center text-[#8B4513] mb-2">
            <Icon name="blanket" className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-[#5C4033]">{totalBlankets}</div>
          <div className="text-sm text-[#6B5344]">Total Blankets</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center text-[#8B4513] mb-2">
            <Icon name="droplet" className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-[#5C4033]">{waterproofCount}</div>
          <div className="text-sm text-[#6B5344]">Waterproof</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center text-[#8B4513] mb-2">
            <Icon name="check" className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-[#5C4033]">{neckRugCount}</div>
          <div className="text-sm text-[#6B5344]">With Neck Rug</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center text-[#9CAF88] mb-2">
            <Icon name="check" className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-[#5C4033]">{inUseCount}</div>
          <div className="text-sm text-[#6B5344]">In Use</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center text-[#8B4513] mb-2">
            <Icon name="box" className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-[#5C4033]">{totalBlankets - inUseCount}</div>
          <div className="text-sm text-[#6B5344]">Available</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'sheet', 'lightweight', 'medium', 'heavyweight'].map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterCategory === category
                ? 'bg-[#8B4513] text-white'
                : 'bg-white text-[#6B5344] hover:bg-[#FDF8F0] border border-[rgba(139,69,19,0.15)]'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Blanket Form */}
      {showAddForm && (
        <div className="mb-6">
          <AddBlanketForm onAdd={handleAddBlanket} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {/* Blanket Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredBlankets.map(blanket => (
          <BlanketCard
            key={blanket.id}
            blanket={blanket}
            pairedLiner={liners?.find(l => l.pairedWithBlanketId === blanket.id)}
            isInUse={blanket.id === currentBlanketId}
            onUpdate={(updates) => handleUpdateBlanket(blanket.id, updates)}
            onDelete={() => handleDeleteBlanket(blanket.id)}
            onSetInUse={() => setCurrentBlanketId(blanket.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlankets.length === 0 && !showAddForm && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[rgba(139,69,19,0.15)]">
          <div className="flex justify-center mb-4 text-[#8B4513]">
            <Icon name="blanket" className="w-16 h-16" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#5C4033] mb-2">
            {filterCategory === 'all' ? 'No blankets yet' : `No ${filterCategory} blankets`}
          </h2>
          <p className="text-[#6B5344] mb-6">
            {filterCategory === 'all'
              ? 'Add your first blanket to start tracking your inventory'
              : 'Try a different filter or add a new blanket'}
          </p>
          {filterCategory === 'all' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#5C4033] transition-colors"
            >
              Add Your First Blanket
            </button>
          )}
        </div>
      )}

      {/* Liners Section */}
      {liners && setLiners && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#5C4033]">Blanket Liners</h2>
              <p className="text-[#6B5344] text-sm mt-1">
                {totalLiners} liner{totalLiners !== 1 ? 's' : ''} • {pairedLiners} paired
              </p>
            </div>
            {!showAddLinerForm && (
              <button
                onClick={() => setShowAddLinerForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470] transition-colors text-sm"
              >
                <span className="text-lg">+</span> Add Liner
              </button>
            )}
          </div>

          {/* Add Liner Form */}
          {showAddLinerForm && (
            <div className="mb-4">
              <AddLinerForm onAdd={handleAddLiner} onCancel={() => setShowAddLinerForm(false)} />
            </div>
          )}

          {/* Liner Grid */}
          {liners.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {liners.map(liner => (
                <LinerCard
                  key={liner.id}
                  liner={liner}
                  blankets={blankets}
                  onUpdate={(updates) => handleUpdateLiner(liner.id, updates)}
                  onDelete={() => handleDeleteLiner(liner.id)}
                  onPair={(blanketId) => handlePairLiner(liner.id, blanketId)}
                />
              ))}
            </div>
          ) : !showAddLinerForm && (
            <div className="text-center py-8 bg-white rounded-2xl border border-[rgba(139,69,19,0.15)]">
              <div className="flex justify-center mb-3 text-[#9CAF88]">
                <Leaf className="w-12 h-12" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#5C4033] mb-2">No liners yet</h3>
              <p className="text-[#6B5344] mb-4 text-sm">Add liners to pair with your blanket shells for extra warmth</p>
              <button
                onClick={() => setShowAddLinerForm(true)}
                className="px-5 py-2 bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470] transition-colors"
              >
                Add Your First Liner
              </button>
            </div>
          )}
        </div>
      )}

      {/* Weight Guide */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow border border-[rgba(139,69,19,0.15)]">
        <h2 className="font-display text-xl font-semibold text-[#5C4033] mb-4">Blanket Weight Guide</h2>
        <div className="grid grid-cols-4 gap-4">
          {weightCategories.map(cat => (
            <div key={cat.label} className="text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: cat.color }}
              >
                <span className="text-white">
                  <Icon
                    name={cat.max === 0 ? 'rain' : cat.max <= 150 ? 'leaf' : 'snowflake'}
                    className="w-5 h-5"
                  />
                </span>
              </div>
              <div className="font-semibold text-[#5C4033]">{cat.label.split(' ')[0]}</div>
              <div className="text-xs text-[#6B5344]">
                {cat.max === 0 ? 'Above 40°F' : cat.max <= 150 ? '30-40°F' : cat.max <= 300 ? '15-30°F' : 'Below 15°F'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
