import * as React from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  EventSubscriptionVendor,
} from 'react-native';

/**
 * Pluck Orientation module out and type it.
 */
const Orientation =
  NativeModules.RNSensibleOrientation as EventSubscriptionVendor & {
    isAvailable: boolean;
    setUpdateInterval: (interval: number) => void;
  };

/**
 * Generate event emitter from it
 */
const OrientationEventEmitter = new NativeEventEmitter(Orientation);

// Orientation data available?
export const isOrientationAvailable = Orientation.isAvailable;

// Helper to set orientation update interval
export const setOrientationUpdateInterval = (interval: number) =>
  Orientation.setUpdateInterval(interval);

/**
 * Hook for using orientation
 */
export const useOrientation = (
  handler: OrientationHandler,
  { pause }: { pause?: boolean } = {}
) => {
  React.useEffect(() => {
    if (pause) {
      return;
    }

    OrientationEventEmitter.addListener('onData', handler);
    // Orientation.startUpdates().catch(() => {});

    return () => {
      OrientationEventEmitter.removeListener('onData', handler);
      // Orientation.stopUpdates().catch(() => {});
    };
  }, [handler, pause]);
};

export type OrientationData = {
  qx: number;
  qy: number;
  qz: number;
  qw: number;
  pitch: number;
  roll: number;
  yaw: number;
};
export type OrientationHandler = (data: OrientationData) => void;
