import React, { useState } from 'react';
import { Pencil, Trash2, Check, Home, Warehouse, TreePine, CloudRain } from 'lucide-react';

// Custom horse icon (not available in lucide-react)
function HorseIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 8V6c0-1.1-.9-2-2-2h-1c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2H9c0-1.1-.9-2-2-2H5C3.9 2 3 2.9 3 4v2c0 1.1.9 2 2 2h.5c.8 0 1.5.7 1.5 1.5S6.3 11 5.5 11H4v2h1.5c1.9 0 3.5-1.6 3.5-3.5 0-.5-.1-1-.3-1.5h6.6c-.2.5-.3 1-.3 1.5 0 1.9 1.6 3.5 3.5 3.5H20v-2h-1.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h.5c1.1 0 2-.9 2-2zM9.5 7h5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5z"/>
      <path d="M18 14h-3l-2 4-2-4H8l-3 6v2c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h6v1c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2l-1-6z"/>
    </svg>
  );
}

// Icon mapping
const iconMap = {
  horse: HorseIcon,
  pencil: Pencil,
  trash: Trash2,
  check: Check,
  home: Home,
  shed: Warehouse,
  tree: TreePine,
  rain: CloudRain,
};

function Icon({ name, className = "w-5 h-5" }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

// Toggle Component
function Toggle({ active, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors ${active ? 'bg-[#9CAF88]' : 'bg-gray-300'}`}
    >
      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

// Slider Component
function Slider({ value, onChange, label, valueLabel }) {
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

// Horse Profile Card (expanded version for the page)
function HorseProfileCard({ horse, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(horse.name);
  const [editBreed, setEditBreed] = useState(horse.breed);
  const [editAge, setEditAge] = useState(horse.age);

  const coatLabel = horse.coatGrowth < 33 ? "Light" : horse.coatGrowth < 66 ? "Medium" : "Heavy";
  const toleranceLabel = horse.coldTolerance < 33 ? "Sensitive" : horse.coldTolerance < 66 ? "Normal" : "Hardy";

  const handleSave = () => {
    onUpdate({ name: editName, breed: editBreed, age: parseInt(editAge) });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgba(139,69,19,0.15)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A0522D] to-[#8B4513] flex items-center justify-center text-white">
            <Icon name="horse" className="w-12 h-12" />
          </div>
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-2xl font-display font-bold text-[#5C4033] border-b-2 border-[#D4A84B] bg-transparent focus:outline-none"
                />
                <input
                  type="text"
                  value={editBreed}
                  onChange={(e) => setEditBreed(e.target.value)}
                  className="block text-[#6B5344] border-b border-[#D4A84B] bg-transparent focus:outline-none"
                  placeholder="Breed"
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="block w-20 text-[#6B5344] border-b border-[#D4A84B] bg-transparent focus:outline-none"
                  placeholder="Age"
                />
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-[#5C4033]">{horse.name}</h2>
                <p className="text-[#6B5344]">{horse.breed} • {horse.age} years old</p>
              </>
            )}
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
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#FDF8F0] text-[#8B4513] rounded-lg hover:bg-[#D4A84B]/20 transition-colors flex items-center gap-2"
              >
                <Icon name="pencil" className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <Icon name="trash" className="w-4 h-4" /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Sliders */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-[#5C4033] pb-2 border-b border-[rgba(139,69,19,0.15)]">
            Coat & Tolerance
          </h3>
          <Slider
            value={horse.coatGrowth}
            onChange={(v) => onUpdate({ coatGrowth: v })}
            label="Coat Growth Level"
            valueLabel={coatLabel}
          />
          <Slider
            value={horse.coldTolerance}
            onChange={(v) => onUpdate({ coldTolerance: v })}
            label="Cold Tolerance"
            valueLabel={toleranceLabel}
          />
        </div>

        {/* Right Column - Toggles */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-[#5C4033] pb-2 border-b border-[rgba(139,69,19,0.15)]">
            Special Conditions
          </h3>

          <div className="flex items-center justify-between py-3 border-b border-[rgba(139,69,19,0.1)]">
            <div>
              <div className="text-sm font-medium">Body Clipped</div>
              <div className="text-xs text-[#6B5344]">Full or partial clip</div>
            </div>
            <Toggle active={horse.isClipped} onChange={() => onUpdate({ isClipped: !horse.isClipped })} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[rgba(139,69,19,0.1)]">
            <div>
              <div className="text-sm font-medium">Senior Horse</div>
              <div className="text-xs text-[#6B5344]">Age 20+ years</div>
            </div>
            <Toggle active={horse.isSenior} onChange={() => onUpdate({ isSenior: !horse.isSenior })} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-medium">Thin/Hard Keeper</div>
              <div className="text-xs text-[#6B5344]">Below ideal weight</div>
            </div>
            <Toggle active={horse.isThinKeeper} onChange={() => onUpdate({ isThinKeeper: !horse.isThinKeeper })} />
          </div>
        </div>
      </div>

      {/* Shelter Access */}
      <div className="mt-6 pt-4 border-t border-[rgba(139,69,19,0.15)]">
        <h3 className="font-display text-lg font-semibold text-[#5C4033] mb-3">Shelter Access</h3>
        <div className="flex gap-3">
          {[
            { value: 'stall', label: 'Stall', iconName: 'home' },
            { value: 'run-in', label: 'Run-in Shed', iconName: 'shed' },
            { value: 'trees', label: 'Trees Only', iconName: 'tree' },
            { value: 'none', label: 'No Shelter', iconName: 'rain' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => onUpdate({ shelterAccess: option.value })}
              className={`flex-1 p-3 rounded-xl text-center transition-all ${
                horse.shelterAccess === option.value
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-[#FDF8F0] text-[#6B5344] hover:bg-[#D4A84B]/20'
              }`}
            >
              <div className="flex justify-center mb-1">
                <Icon name={option.iconName} className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">{option.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add Horse Form
function AddHorseForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: Date.now(),
      name: name.trim(),
      breed: breed.trim() || 'Unknown',
      age: parseInt(age) || 0,
      coatGrowth: 50,
      coldTolerance: 50,
      isClipped: false,
      isSenior: parseInt(age) >= 20,
      isThinKeeper: false,
      shelterAccess: 'run-in',
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-[#D4A84B]">
      <h2 className="font-display text-xl font-semibold text-[#5C4033] mb-4">Add New Horse</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2C1810] mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
            placeholder="Enter horse's name"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Breed</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
              placeholder="e.g., Quarter Horse"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-1">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[rgba(139,69,19,0.3)] focus:border-[#D4A84B] focus:outline-none"
              placeholder="e.g., 12"
              min="0"
              max="50"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#5C4033] transition-colors"
          >
            Add Horse
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

// Main MyHorses Page
export default function MyHorses({ horses, setHorses, activeHorseId, setActiveHorseId }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddHorse = (newHorse) => {
    setHorses([...horses, newHorse]);
    setShowAddForm(false);
  };

  const handleUpdateHorse = (horseId, updates) => {
    setHorses(horses.map(h => h.id === horseId ? { ...h, ...updates } : h));
  };

  const handleDeleteHorse = (horseId) => {
    if (horses.length <= 1) {
      alert("You must have at least one horse.");
      return;
    }
    if (confirm(`Are you sure you want to delete this horse?`)) {
      setHorses(horses.filter(h => h.id !== horseId));
      if (activeHorseId === horseId) {
        setActiveHorseId(horses.find(h => h.id !== horseId)?.id);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#5C4033]">My Horses</h1>
          <p className="text-[#6B5344] mt-1">Manage your horses and their blanketing preferences</p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#9CAF88] text-white rounded-xl font-semibold hover:bg-[#7d9470] transition-colors"
          >
            <span className="text-xl">+</span> Add Horse
          </button>
        )}
      </div>

      {/* Add Horse Form */}
      {showAddForm && (
        <div className="mb-6">
          <AddHorseForm onAdd={handleAddHorse} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {/* Horse List */}
      <div className="space-y-6">
        {horses.map(horse => (
          <div key={horse.id} className="relative">
            {horse.id === activeHorseId && (
              <div className="absolute -left-3 top-6 w-1.5 h-12 bg-[#D4A84B] rounded-full" />
            )}
            <HorseProfileCard
              horse={horse}
              onUpdate={(updates) => handleUpdateHorse(horse.id, updates)}
              onDelete={() => handleDeleteHorse(horse.id)}
            />
            {horse.id !== activeHorseId && (
              <button
                onClick={() => setActiveHorseId(horse.id)}
                className="mt-2 text-sm text-[#8B4513] hover:text-[#5C4033] transition-colors"
              >
                Set as active horse for recommendations
              </button>
            )}
            {horse.id === activeHorseId && (
              <div className="mt-2 text-sm text-[#9CAF88] font-medium flex items-center gap-1">
                <Icon name="check" className="w-4 h-4" /> Active horse for recommendations
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {horses.length === 0 && !showAddForm && (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4 text-[#8B4513]">
            <Icon name="horse" className="w-16 h-16" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#5C4033] mb-2">No horses yet</h2>
          <p className="text-[#6B5344] mb-6">Add your first horse to get personalized blanketing recommendations</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#5C4033] transition-colors"
          >
            Add Your First Horse
          </button>
        </div>
      )}
    </div>
  );
}
