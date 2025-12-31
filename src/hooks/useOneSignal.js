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

    try {
      // Check if login function is available
      if (typeof OneSignal?.login !== 'function') {
        return;
      }

      OneSignal.login(userId).catch((err) => {
        console.error('OneSignal login failed:', err);
      });
    } catch (err) {
      console.warn('OneSignal login not available:', err.message);
    }
  }, [ready, userId]);

  useEffect(() => {
    if (!ready || !settings?.notifications || !userId) return;

    // Wrap in try-catch to prevent crashes if OneSignal API isn't available
    try {
      // Check if OneSignal.User is available (may not be in all environments)
      if (!OneSignal?.User?.addTags) {
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
    } catch (err) {
      // Silently ignore OneSignal errors - notifications are non-critical
      console.warn('OneSignal not available:', err.message);
    }
  }, [
    ready,
    userId,
    settings?.notifications?.blanketChange,
    settings?.notifications?.severeWeather,
    settings?.notifications?.dailySummary,
  ]);
}