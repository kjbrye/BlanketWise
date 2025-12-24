import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

export default function ScheduleIcon({ time, className = "w-5 h-5" }) {
  const icons = {
    "morning": Sunrise,
    "afternoon": Sun,
    "evening": Sunset,
    "overnight": Moon,
  };
  const IconComponent = icons[time] || Sun;
  return <IconComponent className={className} />;
}
