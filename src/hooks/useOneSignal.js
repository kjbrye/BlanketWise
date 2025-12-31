// src/hooks/useOneSignal.js
import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import { useSettings } from './useSettings';

const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID;

let initStarted = false;

export function useOneSignal(userId) {
  const { settings } = useSettings();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (initStarted || !ONESIGNAL_APP_ID) return;
    initStarted = true;

    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
    })
      .then(() => {
        setReady(true);
      })
      .catch((err) => {
        console.error('OneSignal initialization failed:', err);
      });
  }, []);

  useEffect(() => {
    if (!ready || !userId) return;

    // Check if login function is available
    if (typeof OneSignal.login !== 'function') {
      return;
    }

    OneSignal.login(userId).catch((err) => {
      console.error('OneSignal login failed:', err);
    });
  }, [ready, userId]);

  useEffect(() => {
    if (!ready || !settings?.notifications || !userId) return;

    // Check if OneSignal.User is available (may not be in all environments)
    if (!OneSignal.User || typeof OneSignal.User.addTags !== 'function') {
      return;
    }

    const tags = {
      blanket_change: String(settings.notifications.blanketChange === true),
      severe_weather: String(settings.notifications.severeWeather === true),
      daily_summary: String(settings.notifications.dailySummary === true),
    };

    OneSignal.User.addTags(tags).catch((err) => {
      console.error('OneSignal tag sync failed:', err);
    });
  }, [
    ready,
    userId,
    settings?.notifications?.blanketChange,
    settings?.notifications?.severeWeather,
    settings?.notifications?.dailySummary,
  ]);
}