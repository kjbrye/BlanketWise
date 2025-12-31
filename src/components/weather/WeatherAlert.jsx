import { AlertTriangle } from 'lucide-react';

export default function WeatherAlert({ message }) {
  return (
    <div className="bg-[#E89B3C]/10 border border-[#E89B3C]/30 rounded-xl p-4 mt-4">
      <div className="font-semibold text-[#E89B3C] flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5" /> Weather Alert
      </div>
      <p className="text-sm text-[#2C1810]">{message}</p>
    </div>
  );
}
