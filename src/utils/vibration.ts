import store from '@/redux/store';
import * as Haptics from 'expo-haptics';

export const vibrateError = () => {
  let isVibrate = store.getState().settings.vibrate;

  if (!isVibrate) {
    return;
  }
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const onPressVibrate = (callback: Function) => {
  let isVibrate = store.getState().settings.vibrate;

  if (!isVibrate) {
    callback();
    return;
  }
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  callback();
};
