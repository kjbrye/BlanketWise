import { useState } from 'react';
import { Heart, Snowflake, ChevronDown, Home } from 'lucide-react';
import { ClipperIcon, SeniorHorseIcon, FoalIcon } from '../components/icons';
import { version } from '../../package.json';

// Icon map for generic icons
const iconMap = {
  heart: Heart,
  snowflake: Snowflake,
  coat: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18M6 8l6-5 6 5M6 16l6 5 6-5" />
    </svg>
  ),
  sliders: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <circle cx="4" cy="12" r="2" /><circle cx="12" cy="10" r="2" /><circle cx="20" cy="14" r="2" />
    </svg>
  ),
};

function Icon({ name, className = "w-5 h-5" }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

// Section component for consistent styling
function AboutSection({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-[rgba(139,69,19,0.15)] mb-6">
      <div className="mb-4 pb-4 border-b border-[rgba(139,69,19,0.15)]">
        <h2 className="font-display text-lg sm:text-xl font-semibold text-[#5C4033]">{title}</h2>
        {description && <p className="text-sm text-[#6B5344] mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

// Collapsible FAQ item component
function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#FDF8F0] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FAF3E8] transition-colors"
      >
        <h4 className="font-medium text-[#5C4033] pr-4">{question}</h4>
        <ChevronDown
          className={`w-5 h-5 text-[#6B5344] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-48' : 'max-h-0'}`}
      >
        <p className="text-sm text-[#6B5344] px-4 pb-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FAF7F2] px-4 py-6 sm:px-6 sm:py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-6 font-display">About</h1>

      {/* Blanketing Guide */}
      <AboutSection
        title="Blanketing Guide"
        description="How recommendations are calculated"
      >
        {/* Base Thresholds */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Base Temperature Thresholds</h4>
          <p className="text-sm text-[#6B5344] mb-3">
            For a horse with a natural winter coat, acclimated to midwest weather:
          </p>
          <div className="bg-[#FDF8F0] rounded-xl p-4 text-sm">
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Above 40°F</span>
              <span className="font-medium text-[#5C4033]">No blanket</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">30–40°F</span>
              <span className="font-medium text-[#5C4033]">Lightweight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">15–30°F</span>
              <span className="font-medium text-[#5C4033]">Medium weight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Below 15°F</span>
              <span className="font-medium text-[#5C4033]">Heavyweight</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[rgba(139,69,19,0.1)]">
              <span className="text-[#6B5344]">Below 10°F or wind &gt;20mph</span>
              <span className="font-medium text-[#5C4033]">+ Neck rug</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B5344]">Rain expected (any temp)</span>
              <span className="font-medium text-[#5C4033]">Waterproof / sheet</span>
            </div>
          </div>
        </div>

        {/* Horse Profile Modifiers */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Horse Profile Modifiers</h4>
          <p className="text-sm text-[#6B5344] mb-3">
            These adjust thresholds based on your horse's profile. Positive values mean blankets are recommended at warmer temperatures.
          </p>
          <div className="space-y-3">
            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A84B] flex items-center justify-center flex-shrink-0">
                  <ClipperIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Clipped</div>
                  <div className="text-sm text-[#6B5344]">+15°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Clipped horses lose significant natural insulation and need blankets much sooner.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                  <SeniorHorseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Senior Horse (20+ years)</div>
                  <div className="text-sm text-[#6B5344]">+5°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Older horses may have reduced ability to regulate body temperature.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A0522D] flex items-center justify-center flex-shrink-0">
                  <SeniorHorseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Thin/Hard Keeper</div>
                  <div className="text-sm text-[#6B5344]">+8°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Horses below ideal weight have less body fat for insulation.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A84B] flex items-center justify-center flex-shrink-0">
                  <FoalIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Foal (6 months or younger)</div>
                  <div className="text-sm text-[#6B5344]">+10°F to all thresholds</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Young foals have developing thermoregulation and need extra warmth protection.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shelter Access */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Shelter Access</h4>
          <p className="text-sm text-[#6B5344] mb-3">
            Shelter type affects how exposed your horse is to weather. Run-in shed is the baseline for a typical turnout horse.
          </p>
          <div className="bg-[#FDF8F0] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C9A92] flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#5C4033]">Shelter Type Adjustments</div>
                <div className="text-sm text-[#6B5344] space-y-1 mt-2">
                  <div className="flex justify-between">
                    <span>Stall</span>
                    <span className="font-medium">-8°F (warmer, protected)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Run-in Shed</span>
                    <span className="font-medium">Baseline (no adjustment)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees Only</span>
                    <span className="font-medium">+3°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No Shelter</span>
                    <span className="font-medium">+5°F</span>
                  </div>
                </div>
                <div className="text-xs text-[#6B5344] mt-2">
                  Stalled horses are also protected from wind and rain. Horses with less shelter trigger waterproof and neck rug recommendations at lower thresholds.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coat & Tolerance Sliders */}
        <div className="mb-6">
          <h4 className="font-medium text-[#5C4033] mb-3">Coat & Tolerance Adjustments</h4>
          <div className="space-y-3">
            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6B5344] flex items-center justify-center flex-shrink-0">
                  <Icon name="coat" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Coat Growth Level</div>
                  <div className="text-sm text-[#6B5344]">-5°F to +5°F range</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Light coat adds up to +5°F (blanket sooner). Heavy coat subtracts up to 5°F (blanket later).
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5C7C9A] flex items-center justify-center flex-shrink-0">
                  <Icon name="snowflake" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#5C4033]">Cold Tolerance</div>
                  <div className="text-sm text-[#6B5344]">-5°F to +5°F range</div>
                  <div className="text-xs text-[#6B5344] mt-1">
                    Sensitive horses add up to +5°F. Hardy horses subtract up to 5°F.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Buffer */}
        <div>
          <h4 className="font-medium text-[#5C4033] mb-3">Temperature Buffer (Settings)</h4>
          <div className="bg-[#FDF8F0] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#9CAF88] flex items-center justify-center flex-shrink-0">
                <Icon name="sliders" className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-[#5C4033]">User Preference</div>
                <div className="text-sm text-[#6B5344]">0°F to +15°F (default: 0)</div>
                <div className="text-xs text-[#6B5344] mt-1">
                  Add extra degrees if you prefer more conservative (warmer) recommendations. This stacks with all other modifiers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* FAQ */}
      <AboutSection title="Frequently Asked Questions">
        <div className="space-y-3">
          <FAQItem
            question="Why is the recommendation different from what I expected?"
            answer="Recommendations are based on multiple factors including temperature, wind, precipitation, and your horse's profile settings. Clipped horses, seniors, thin horses, and foals all have adjusted thresholds. Check your horse's profile to ensure the settings match their actual condition."
            defaultOpen
          />
          <FAQItem
            question="How does wind and rain affect recommendations?"
            answer="Wind chill significantly impacts how cold it feels to your horse. Strong winds (over 20 mph) may trigger a neck rug recommendation. Any expected rain will suggest a waterproof sheet or blanket to keep your horse dry, regardless of temperature."
          />
          <FAQItem
            question="Can I save multiple horses?"
            answer="Yes! You can add multiple horses with different profiles. Each horse can have unique settings for coat type, age, body condition, and cold tolerance. Switch between horses to see personalized recommendations for each one."
          />
          <FAQItem
            question="How often does the weather data update?"
            answer="Weather data is fetched fresh each time you open the app or refresh the page. The forecast includes hourly predictions so you can plan ahead for changing conditions throughout the day."
          />
          <FAQItem
            question="What if my horse lives in a different climate?"
            answer="The base thresholds are designed for horses acclimated to midwest weather. If your horse is in a warmer or colder climate, use the Cold Tolerance slider and Temperature Buffer in Settings to adjust recommendations to better suit your region."
          />
          <FAQItem
            question="Is my data stored securely?"
            answer="Your horse profiles and settings are stored securely. Location data is only used to fetch weather information and is not shared with third parties. You can manage your data at any time through the app settings."
          />
          <FAQItem
            question="How do I add BlanketWise to my homescreen?"
            answer="On iPhone: Open BlanketWise in Safari, tap the Share button (square with arrow), then tap 'Add to Home Screen'. On Android: Open in Chrome, tap the three-dot menu, then tap 'Add to Home Screen' or 'Install App'. Once installed, BlanketWise will work like a native app and be accessible directly from your homescreen."
          />
        </div>
      </AboutSection>

      {/* About the App */}
      <AboutSection title="About BlanketWise">
        <div className="text-center py-4">
          <img src="/BlanketWise-Logo.svg" alt="BlanketWise" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#5C4033] tracking-wide" style={{ fontFamily: "'Recoleta', Georgia, serif" }}>BlanketWise</h3>
          <p className="text-[#6B5344] mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Keep them cozy</p>
          <p className="text-sm text-[#6B5344] mt-4">Version {version}</p>
          <p className="text-xs text-[#6B5344] mt-2 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for horse owners everywhere
          </p>
          <p className="text-xs text-[#6B5344] mt-4 px-4 leading-relaxed">
            Recommendations are based on a standardized algorithm that makes assumptions using the modifiers you configure. Every horse and climate is different—please use your best judgment when blanketing and caring for your horse.
          </p>
        </div>
      </AboutSection>
    </div>
  );
}
