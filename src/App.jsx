import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import MyHorses from './pages/MyHorses';
import BlanketInventory from './pages/BlanketInventory';
import Settings from './pages/Settings';

// Components
import { Navigation, Dashboard } from './components/layout';

// Data
import { defaultHorse, defaultBlankets, defaultWeather, defaultSettings } from './data/defaults';

export default function App() {
  const [horses, setHorses] = useState([defaultHorse]);
  const [activeHorseId, setActiveHorseId] = useState(1);
  const [blankets, setBlankets] = useState(defaultBlankets);
  const [currentBlanketId, setCurrentBlanketId] = useState(2);
  const [weather] = useState(defaultWeather);
  const [settings, setSettings] = useState(defaultSettings);
  const [location, setLocation] = useState("Madison, WI");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDF8F0]">
        <Navigation location={location} />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                horses={horses}
                activeHorseId={activeHorseId}
                setActiveHorseId={setActiveHorseId}
                blankets={blankets}
                currentBlanketId={currentBlanketId}
                setCurrentBlanketId={setCurrentBlanketId}
                weather={weather}
                settings={settings}
                location={location}
              />
            }
          />
          <Route
            path="/horses"
            element={
              <MyHorses
                horses={horses}
                setHorses={setHorses}
                activeHorseId={activeHorseId}
                setActiveHorseId={setActiveHorseId}
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <BlanketInventory
                blankets={blankets}
                setBlankets={setBlankets}
                currentBlanketId={currentBlanketId}
                setCurrentBlanketId={setCurrentBlanketId}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                settings={settings}
                setSettings={setSettings}
                location={location}
                setLocation={setLocation}
              />
            }
          />
        </Routes>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

          body {
            font-family: 'Source Sans 3', sans-serif;
          }

          .font-display {
            font-family: 'Playfair Display', serif;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}
