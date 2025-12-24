import React, { useState } from 'react';

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
function BlanketCard({ blanket, isInUse, onUpdate, onDelete, onSetInUse }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(blanket.name);
  const [editGrams, setEditGrams] = useState(blanket.grams);
  const [editWaterproof, setEditWaterproof] = useState(blanket.waterproof);
  const [editColor, setEditColor] = useState(blanket.color);

  const category = getWeightCategory(blanket.grams);

  const handleSave = () => {
    onUpdate({
      name: editName,
      grams: parseInt(editGrams),
      waterproof: editWaterproof,
      color: editColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(blanket.name);
    setEditGrams(blanket.grams);
    setEditWaterproof(blanket.waterproof);
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
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.label}
              </span>
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
          <div className="col-span-2">
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
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">⚖️</div>
            <div className="text-xs text-[#6B5344]">Fill Weight</div>
            <div className="font-semibold text-[#5C4033]">{blanket.grams}g</div>
          </div>
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{blanket.waterproof ? '💧' : '🌬️'}</div>
            <div className="text-xs text-[#6B5344]">Type</div>
            <div className="font-semibold text-[#5C4033]">{blanket.waterproof ? 'Waterproof' : 'Breathable'}</div>
          </div>
          <div className="bg-[#FDF8F0] rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">🌡️</div>
            <div className="text-xs text-[#6B5344]">Best For</div>
            <div className="font-semibold text-[#5C4033]">
              {blanket.grams === 0 ? '50°F+' :
               blanket.grams <= 150 ? '40-50°F' :
               blanket.grams <= 300 ? '25-40°F' : 'Below 25°F'}
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

// Main Blanket Inventory Page
export default function BlanketInventory({ blankets, setBlankets, currentBlanketId, setCurrentBlanketId }) {
  const [showAddForm, setShowAddForm] = useState(false);
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
      if (currentBlanketId === blanketId) {
        setCurrentBlanketId(blankets.find(b => b.id !== blanketId)?.id);
      }
    }
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
  const inUseCount = currentBlanketId ? 1 : 0;

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
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="text-3xl mb-2">🧥</div>
          <div className="text-2xl font-bold text-[#5C4033]">{totalBlankets}</div>
          <div className="text-sm text-[#6B5344]">Total Blankets</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="text-3xl mb-2">💧</div>
          <div className="text-2xl font-bold text-[#5C4033]">{waterproofCount}</div>
          <div className="text-sm text-[#6B5344]">Waterproof</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-[#5C4033]">{inUseCount}</div>
          <div className="text-sm text-[#6B5344]">In Use</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-[rgba(139,69,19,0.15)]">
          <div className="text-3xl mb-2">📦</div>
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
          <div className="text-6xl mb-4">🧥</div>
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
                <span className="text-white text-xl">
                  {cat.max === 0 ? '🌧️' : cat.max <= 150 ? '🍂' : cat.max <= 300 ? '❄️' : '🥶'}
                </span>
              </div>
              <div className="font-semibold text-[#5C4033]">{cat.label.split(' ')[0]}</div>
              <div className="text-xs text-[#6B5344]">
                {cat.max === 0 ? '50°F+' : cat.max <= 150 ? '40-50°F' : cat.max <= 300 ? '25-40°F' : 'Below 25°F'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
