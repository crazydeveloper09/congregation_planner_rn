import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

type Orientation = 'portrait' | 'landscape' | 'unknown';

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>('unknown');

  const determineOrientation = (value: ScreenOrientation.Orientation) => {
    switch (value) {
      case ScreenOrientation.Orientation.PORTRAIT_UP:
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 'portrait';
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return 'landscape';
      default:
        return 'unknown';
    }
  };

  useEffect(() => {
    const updateOrientation = async () => {
      const current = await ScreenOrientation.getOrientationAsync();
      setOrientation(determineOrientation(current));
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(evt => {
      const newOrientation = determineOrientation(evt.orientationInfo.orientation);
      setOrientation(newOrientation);
    });

    updateOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
}

export default useOrientation;