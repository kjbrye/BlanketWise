# 🐴 BlanketWise - Smart Horse Blanketing Advisor

A beautiful React + Tailwind application with a warm equestrian aesthetic to help determine the optimal blanket for your horse based on weather conditions and individual horse factors.

## Features

### 🐎 Horse Profile Management
- Multiple horse profiles with individual settings
- **Coat Growth Level** slider (Light → Heavy winter coat)
- **Cold Tolerance** slider (Sensitive → Hardy)
- Body clipping toggle
- Senior horse consideration (20+ years)
- Thin/hard keeper adjustment
- Shelter access tracking (none, run-in, stall)

### 🌡️ Weather Integration
- Current temperature with feels-like calculation
- Wind speed and wind chill factor
- Humidity percentage
- Precipitation probability
- Tonight's low temperature
- Weather condition icons

### 🧥 Smart Recommendations
- **Confidence score** for each recommendation
- Plain-language **reasoning explanations**
- Factors grid showing what influenced the decision:
  - Feels-like temperature
  - Coat level
  - Exercise today
  - Shelter access
- Daily schedule (Morning, Afternoon, Evening, Overnight)
- 7-day forecast with blanket recommendations

### ⚙️ Recommendation Settings
- **Use Feels-Like Temp**: Account for wind chill
- **Rain/Precip Priority**: Prioritize waterproof blankets
- **Exercise Adjustment**: Adjust for sweat/chill risk
- **Temperature Buffer**: Blanket earlier/warmer preference (+0-15°F)

### 📦 Blanket Inventory
- Track all owned blankets with fill weights (grams)
- Waterproof/breathable indicators
- Status tracking (Available, In Use)
- Color-coded inventory cards
- One-click to mark blanket as in use

### 🔔 Notifications & Alerts
- Blanket change alerts when recommendation changes
- Severe weather warnings
- Daily summary option
- Weather alert banner for upcoming conditions

### 📱 Quick Actions
- Log Blanket Change
- Log Exercise
- View History
- Set Alert

## Design

The app features a warm **equestrian aesthetic** with:
- **Saddle brown** and **leather** tones
- **Hay gold** accents
- **Cream** backgrounds
- **Soft sage** for positive indicators
- **Frost blue** for weather elements
- **Playfair Display** serif headings
- **Source Sans 3** body text

### Three-Column Layout
1. **Left Sidebar**: Horse profiles and settings
2. **Main Content**: Weather, recommendations, schedules
3. **Right Sidebar**: Settings, inventory, quick actions

## Algorithm

### Base Temperature Thresholds
| Weight | Temperature Range |
|--------|------------------|
| None | Above 60°F |
| Sheet | 45-60°F (or rain) |
| Light | 32-45°F |
| Medium | 20-32°F |
| Heavy | Below 20°F |

### Adjustments Applied
- **Coat Growth**: ±5°F based on coat thickness
- **Cold Tolerance**: ±5°F based on individual sensitivity
- **Clipped**: +10-15°F (needs blanket sooner)
- **Senior**: +5°F (benefits from warmer coverage)
- **Thin Keeper**: +8°F (less natural insulation)
- **Temperature Buffer**: User preference (+0-15°F)

## Installation

```bash
cd blanket-app
npm install
npm run dev
```

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS 3.4** - Styling
- **Vite 5** - Build tool
- **Playfair Display** - Display typography
- **Source Sans 3** - Body typography

## Future Enhancements

- [ ] Weather API integration for real-time data
- [ ] Push notifications
- [ ] Exercise logging with time stamps
- [ ] Historical blanket usage tracking
- [ ] Barn/stable sharing for multiple caretakers
- [ ] Photo logging of coat condition
- [ ] Calendar integration

---

Made with ❤️ for Tucker 🐴
