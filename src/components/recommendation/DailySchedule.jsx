import { ScheduleIcon } from '../icons';

export default function DailySchedule({ schedule }) {
  const recLabels = { none: "None", sheet: "Sheet", light: "Light", medium: "Med", heavy: "Heavy" };

  return (
    <div className="bg-white rounded-xl border border-[rgba(139,69,19,0.1)] overflow-hidden">
      <div className="grid grid-cols-4 divide-x divide-[rgba(139,69,19,0.1)]">
        {schedule.map((time, i) => (
          <div
            key={i}
            className={`py-4 px-3 text-center ${time.current ? 'bg-[#D4A84B]/10' : ''}`}
          >
            <div className="text-xs text-[#6B5344] mb-1">{time.label.split(' ')[0]}</div>
            <div className="flex justify-center text-[#6B5344] mb-1">
              <ScheduleIcon time={time.iconType} className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-[#5C4033]">{time.temp}°F</div>
            <div className="text-xs text-[#8B4513] font-medium mt-1">
              {recLabels[time.recommendation]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
