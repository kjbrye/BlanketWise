import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

export default function WeatherIcon({ condition, className = "w-6 h-6" }) {
  const icons = {
    "clear": Sun,
    "partly-cloudy": Cloud,
    "cloudy": Cloud,
    "rain": CloudRain,
    "snow": Snowflake,
  };
  const IconComponent = icons[condition] || Cloud;
  return <IconComponent className={className} />;
}
